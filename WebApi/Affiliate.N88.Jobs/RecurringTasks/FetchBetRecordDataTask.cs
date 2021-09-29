using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Models;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Affiliate.N88.Utitlities;
using Fanex.Logging;
using Hangfire;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchBetRecordDataTask : IFetchDataTask, IFetchDataByTimeRange
    {
        [DisableConcurrentExecution(60)]
        [AutomaticRetry(OnAttemptsExceeded = AttemptsExceededAction.Delete, Attempts = 1)]
        Task FetchLastMonthAsync();

        [DisableConcurrentExecution(60)]
        [AutomaticRetry(OnAttemptsExceeded = AttemptsExceededAction.Delete, Attempts = 1)]
        Task FetchFromAdjusmentDayAsync(int day);
    }
    public class FetchBetRecordDataTask : FetchDataForMultipleRepositoryTaskBase<TransBetRecordInfo>, IFetchBetRecordDataTask
    {
        private const int API_SERVER_TIME_OFFSET = 0;
        private const int PAGE_SIZE = 2000;

        private readonly ILicenseeApi _licenseeApi;
        private readonly ILogger _logger;
        private readonly ITrackerService _timeTrackerService;

        public FetchBetRecordDataTask(ILicenseeApi licenseeApi,
            IThirdPartyImportRepository _thirdPartyRepo,
            ILogger logger,
            ITrackerService timeTrackerService,
            IOptionsSnapshot<FetchServiceSetting> configuration)
            : base(_thirdPartyRepo, configuration.Get(Constants.ServiceConfigName.PULL_BET_RECORD_SETTING))
        {
            _licenseeApi = licenseeApi;
            _logger = logger;
            _timeTrackerService = timeTrackerService;
        }

        public override async Task FetchDataAsync()
        {
            try
            {
                var fromDate = await GetLastTimeFetchDateAsync();
                var toDate = GetAdjustmentApiServerDate();
                await FetchDataAndTrackTimeAsync(fromDate, toDate);
            }
            catch (Exception ex)
            {
                await _logger.ErrorAsync($"Exception when fetch BetRecord data: {ex.ToString()}", ex);
            }
        }

        public async Task FetchDataAsync(DateTime fromDate, DateTime toDate)
        {
            var intervalTime = GetApiMaxTimeRange();
            var timeRanges = DateTimeHelper.GetProportionTimeRange(fromDate, toDate, intervalTime);
            foreach (var range in timeRanges)
            {
                try
                {
                    await FetchAndInsertDataByPageAsync(range.FromDate, range.ToDate);
                }
                catch
                {
                    _logger.Error($"Excetion when fetch BetRecord from {range.FromDate} to {range.ToDate}");
                    throw;
                }
            }
        }

        public async Task FetchLastMonthAsync()
        {
            try
            {
                var now = DateTime.Now;
                var dayLastMonth = now.AddMonths(-1);
                var firstDayLastMonth = new DateTime(dayLastMonth.Year, dayLastMonth.Month, 1);
                var firstDayThisMonth = new DateTime(now.Year, now.Month, 1);
                await FetchDataAsync(firstDayLastMonth, firstDayThisMonth);
            }
            catch (Exception ex)
            {
                _logger.Error($"Exception when fetch BetRecord data: {ex.ToString()}");
            }
        }

        public async Task FetchFromAdjusmentDayAsync(int day)
        {
            try
            {
                var lastFetchDate = await GetLastTimeFetchDateAsync();
                var fromDate = lastFetchDate.AddDays(-day);
                var toDate = GetAdjustmentApiServerDate();
                await FetchDataAsync(fromDate, toDate);
            }
            catch (Exception ex)
            {
                _logger.Error($"Exception when fetch BetRecord data: {ex.ToString()}");
            }
        }

        private async Task FetchDataAndTrackTimeAsync(DateTime fromDate, DateTime toDate)
        {
            var intervalTime = GetApiMaxTimeRange();
            var timeRanges = DateTimeHelper.GetProportionTimeRange(fromDate, toDate, intervalTime);
            foreach (var range in timeRanges)
            {
                try
                {
                    await FetchAndInsertDataByPageAsync(range.FromDate, range.ToDate);
                    await _timeTrackerService.SaveTimeAsync(TableName, range.ToDate);
                }
                catch 
                {
                    _logger.Error($"Excetion when fetch BetRecord from {range.FromDate} to {range.ToDate}");
                    throw;
                }
            }
        }

        private async Task FetchAndInsertDataByPageAsync(DateTime fromDate, DateTime toDate)
        {
            int pageIndex = 0;
            while (true)
            {
                var data = await _licenseeApi.GetBetRecordAsync(fromDate, toDate, pageIndex, PAGE_SIZE);
                if (data == null || !data.Any())
                {
                    return;
                }

                await ImportDataToMultipleRepoAsync(data);
                pageIndex++;

                if (data.Count() < PAGE_SIZE)
                {
                    return;
                }
            }
        }


        private TimeSpan GetApiMaxTimeRange()
        {
            return TimeSpan.FromMinutes(Settings.MaxTimeRange);
        }

        private async Task<DateTime> GetLastTimeFetchDateAsync()
        {
            var isUseDefaultDate = false;
            DateTime lastFetchDate = new DateTime();
            try
            {
                lastFetchDate = await _timeTrackerService.GetTimeAsync(TableName);
            }
            catch (FileNotFoundException)
            {
                isUseDefaultDate = true;
            }
            catch (XmlException)
            {
                isUseDefaultDate = true;
            }

            if (isUseDefaultDate)
            {
                lastFetchDate = Settings.DefaultPullDate;
            }

            return lastFetchDate;
        }

        private DateTime GetAdjustmentApiServerDate()
        {
            var date = DateTimeOffset.Now.ToOffset(TimeSpan.FromHours(API_SERVER_TIME_OFFSET));
            var adjustmentMin = Settings.AdjustmentValue;
            var adjustDate = date.AddMinutes(adjustmentMin);
            return adjustDate.DateTime;
        }

        protected override IEnumerable<string> GetSupportedRepoPrefix()
            => Settings.SupportedPrefix;

        protected override string BuildXml(IEnumerable<TransBetRecordInfo> data)
            => XmlHelper.BuildXml(data, "transaction", "trans");

    }
}

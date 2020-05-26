using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Models;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Affiliate.N88.Utitlities;
using Fanex.Logging;
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
        Task FetchLastMonth();

        Task FetchFromAdjusmentDay(int day);
    }
    public class FetchBetRecordDataTask : FetchDataForMultipleRepositoryTaskBase<BetRecordInfo>, IFetchBetRecordDataTask
    {
        private const int API_SERVER_TIME_OFFSET = 0;

        private readonly ILicenseeApi _licenseeApi;
        private readonly ILogger _logger;
        private readonly ITimeTrackerService _timeTrackerService;

        public FetchBetRecordDataTask(ILicenseeApi licenseeApi,
            IThirdPartyImportRepository _thirdPartyRepo,
            ILogger logger,
            ITimeTrackerService timeTrackerService,
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

        public async Task FetchLastMonth()
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

        public async Task FetchFromAdjusmentDay(int day)
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

        public async Task FetchDataAsync(DateTime fromDate, DateTime toDate)
        {
            var intervalTime = GetApiMaxTimeRange();
            var timeRanges = DateTimeHelper.GetProportionTimeRange(fromDate, toDate, intervalTime);
            foreach (var range in timeRanges)
            {
                try
                {
                    await FetchAndInsertDataAsync(range.FromDate, range.ToDate);
                }
                catch (Exception ex)
                {
                    _logger.Error($"Excetion when fetch BetRecord from {range.FromDate} to {range.ToDate}");
                    throw ex;
                }
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
                    await FetchAndInsertDataAsync(range.FromDate, range.ToDate);
                    await _timeTrackerService.SaveTimeAsync(TableName, range.ToDate);
                }
                catch (Exception ex)
                {
                    _logger.Error($"Excetion when fetch BetRecord from {range.FromDate} to {range.ToDate}");
                    throw ex;
                }
            }
        }

        private async Task FetchAndInsertDataAsync(DateTime fromDate, DateTime toDate)
        {
            var data = await _licenseeApi.GetBetRecordAsync(fromDate, toDate);
            if (data == null || data.Count() == 0)
            {
                return;
            }

            await ImportDataToMultipleRepoAsync(data);
        }


        private TimeSpan GetApiMaxTimeRange()
        {
           return TimeSpan.FromMinutes(Settings.MaxTimeRange);
        }

        private async Task<DateTime> GetLastTimeFetchDateAsync()
        {
            var isUseDefaultDate = false;
            var lastFetchDate = new DateTime();
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
            var adjustmentMin = Settings.AdjustmentTime;
            var adjustDate = date.AddMinutes(adjustmentMin);
            return adjustDate.DateTime;
        }

        protected override IEnumerable<string> GetSupportedRepoPrefix() 
            => Settings.SupportedPrefix;

        protected override string BuildXml(IEnumerable<BetRecordInfo> data)
            => XmlHelper.BuildXml(data, "transaction", "trans");
        
    }
}

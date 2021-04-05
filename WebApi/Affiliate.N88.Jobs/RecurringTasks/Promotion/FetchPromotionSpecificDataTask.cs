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
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks.Promotion
{
    public interface IFetchPromotionSpecificDataTask : IFetchDataTask
    {
        Task FetchDataDailyTask();
    }

    public class FetchPromotionSpecificDataTask : FetchDataForMultipleRepositoryTaskBase<PromotionSpecificModel>, IFetchPromotionSpecificDataTask
    {
        private IPromotionApi Api { get; }
        private ILogger Logger { get; }
        private ITrackerService TrackerService { get; }

        private const int API_SERVER_TIME_OFFSET = 0;

        public FetchPromotionSpecificDataTask(IPromotionApi licenseeApi,
            IThirdPartyImportRepository _thirdPartyRepo,
            ILogger logger,
            ITrackerService timeTrackerService,
            IOptionsSnapshot<FetchServiceSetting> configuration)
            : base(_thirdPartyRepo, configuration.Get(Constants.ServiceConfigName.PULL_PROMOTIONSPECIFIC_SETTING))
        {
            Api = licenseeApi;
            Logger = logger;
            TrackerService = timeTrackerService;
        }

        public override async Task FetchDataAsync()
        {
            try
            {
                var fromDate = await TrackerService.GetTimeAsync(TableName);
                var toDate = GetAdjustmentTime();
                await FetchDataAndTrackTimeAsync(fromDate, toDate);
            }
            catch (Exception ex)
            {

                await Logger.ErrorAsync($"Error when fetch customer data {ex.Message}", ex);
            }
        }

        public async Task FetchDataDailyTask()
        {
            try
            {
                var fromDate = GetAdjustmentApiServerDate(new TimeSpan(-1, 0, 0, 0));
                var toDate = GetAdjustmentTime();
                var intervalTime = GetApiMaxTimeRange();
                var timeRanges = DateTimeHelper.GetProportionTimeRange(fromDate, toDate, intervalTime);
                foreach (var range in timeRanges)
                {
                    try
                    {
                        await FetchAndInsertDataAsync(range.FromDate, range.ToDate);
                    }
                    catch
                    {
                        Logger.Error($"Excetion when fetch BetRecord from {range.FromDate} to {range.ToDate}");
                        throw;
                    }
                }
            }
            catch (Exception ex)
            {

                await Logger.ErrorAsync($"Error when fetch customer data {ex.Message}", ex);
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
                    await TrackerService.SaveTimeAsync(TableName, range.ToDate);
                }
                catch
                {
                    Logger.Error($"Excetion when fetch BetRecord from {range.FromDate} to {range.ToDate}");
                    throw;
                }
            }
        }

        private async Task FetchAndInsertDataAsync(DateTime fromDate, DateTime toDate)
        {
            var datas = await Api.GetPromtionSpecificsAsync(fromDate, toDate);
            await ImportDataToMultipleRepoAsync(datas);
        }

        private DateTime GetAdjustmentTime() => GetAdjustmentApiServerDate(new TimeSpan(0, Settings.AdjustmentValue, 0));

        protected override string BuildXml(IEnumerable<PromotionSpecificModel> data)
            => XmlHelper.BuildXml(data, "root", "row");

        protected override IEnumerable<string> GetSupportedRepoPrefix()
            => Settings.SupportedPrefix;

        private TimeSpan GetApiMaxTimeRange() => TimeSpan.FromMinutes(Settings.MaxTimeRange);

        private DateTime GetAdjustmentApiServerDate(TimeSpan ajustmentTime)
        {
            var date = DateTimeOffset.Now.ToOffset(TimeSpan.FromHours(API_SERVER_TIME_OFFSET));
            var adjustDate = date.Add(ajustmentTime);
            return adjustDate.DateTime;
        }

    }
}

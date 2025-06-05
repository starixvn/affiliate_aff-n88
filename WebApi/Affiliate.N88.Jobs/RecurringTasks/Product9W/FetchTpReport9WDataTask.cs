using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Constants;
using Affiliate.N88.Jobs.RecurringTasks.Interfaces;
using Affiliate.N88.Models;
using Affiliate.N88.Params;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Fanex.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks.Product9W
{
    public interface IFetchTpReport9WDataTask : IFetchDataTask
    {
    }

    public class FetchTpReport9WDataTask : FetchDataByBatchForMultiRepoTaskBase<TpReport9W, SQTrackerInfo>, IFetchTpReport9WDataTask
    {
        private readonly IProduct9WApi _licenseeApi;
        private readonly ILogger _logger;

        public FetchTpReport9WDataTask(IProduct9WApi licenseeApi,
             IThirdPartyImportRepository _thirdPartyRepo,
             ILogger logger,
             ITrackerService timeTrackerService,
             IOptionsSnapshot<FetchServiceSetting> configuration)
            : base(_thirdPartyRepo, configuration.Get(ServiceConfigName.PULL_TPREPORT_9W_SETTING), timeTrackerService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _licenseeApi = licenseeApi ?? throw new ArgumentNullException(nameof(licenseeApi));
        }

        protected override async Task<IEnumerable<TpReport9W>> GetDataAsync(SQTrackerInfo trackValue, int batchCount)
        {
            var toDate = DateTime.Now;

            return await _licenseeApi.GetTpReportAsync(new BatchCountParam
            {
                SQ = trackValue.SQ,
                FromDate = trackValue.UpdateTime,
                ToDate = toDate,
                BatchCount = batchCount
            });
        }

        protected override SQTrackerInfo GetInsertTrackingValue(IEnumerable<TpReport9W> data)
        {
            return new SQTrackerInfo
            {
                SQ = data.Max(_ => _.SQ),
                UpdateTime = data.Max(_ => _.UpdateTime.Value),
            };
        }

        protected override async Task<SQTrackerInfo> GetLastTrackingValueAsync()
        {
            var tracker = await _timeTrackerService.GetTrackerAsync(TableName, t => t.CalledTime);
            var sqTrackerInfo = JsonConvert.DeserializeObject<SQTrackerInfo>(tracker.KeyValue);
            sqTrackerInfo.UpdateTime = sqTrackerInfo.UpdateTime.AddMinutes(Settings.AdjustmentValue);

            return sqTrackerInfo;
        }
    }
}

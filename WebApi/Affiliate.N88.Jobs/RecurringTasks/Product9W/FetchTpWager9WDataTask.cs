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
    public interface IFetchTpWager9WDataTask : IFetchDataTask
    {
    }

    public class FetchTpWager9WDataTask : FetchDataByBatchForMultiRepoTaskBase<TpWager9W, CreateTimeTrackerInfo>, IFetchTpWager9WDataTask
    {
        private readonly IProduct9WApi _licenseeApi;
        private readonly ILogger _logger;

        public FetchTpWager9WDataTask(IProduct9WApi licenseeApi,
             IThirdPartyImportRepository _thirdPartyRepo,
             ILogger logger,
             ITrackerService timeTrackerService,
             IOptionsSnapshot<FetchServiceSetting> configuration)
            : base(_thirdPartyRepo, configuration.Get(ServiceConfigName.PULL_TPWAGER_9W_SETTING), timeTrackerService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _licenseeApi = licenseeApi ?? throw new ArgumentNullException(nameof(licenseeApi));
        }

        protected override async Task<IEnumerable<TpWager9W>> GetDataAsync(CreateTimeTrackerInfo trackValue, int batchCount)
        {
            var toDate = DateTime.Now;
            return await _licenseeApi.GetTpWagerAsync(new BatchCountParam
            {
                CreateTime = trackValue.CreateTime,
                FromDate = trackValue.UpdateTime,
                ToDate = toDate,
                BatchCount = batchCount
            });
        }

        protected override CreateTimeTrackerInfo GetInsertTrackingValue(IEnumerable<TpWager9W> data)
        {
            return new CreateTimeTrackerInfo
            {
                CreateTime = data.Max(_ => _.CreateTime.Value),
                UpdateTime = data.Max(_ => _.UpdateTime.Value),
            };
        }

        protected override async Task<CreateTimeTrackerInfo> GetLastTrackingValueAsync()
        {
            var tracker = await _timeTrackerService.GetTrackerAsync(TableName, t => t.CalledTime);
            var createTimeTrackerInfo = JsonConvert.DeserializeObject<CreateTimeTrackerInfo>(tracker.KeyValue);
            createTimeTrackerInfo.UpdateTime = createTimeTrackerInfo.UpdateTime.AddMinutes(Settings.AdjustmentValue);

            return createTimeTrackerInfo;
        }
    }
}

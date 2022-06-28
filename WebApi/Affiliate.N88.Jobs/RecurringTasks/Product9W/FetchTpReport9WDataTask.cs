using Affiliate.N88.Comparer;
using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Constants;
using Affiliate.N88.Models;
using Affiliate.N88.Params;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Fanex.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks.Product9W
{
    public interface IFetchTpReport9WDataTask : IFetchDataTask
    {
    }

    public class FetchTpReport9WDataTask : FetchDataByBatchForMultiRepoTaskBase<TpReport9W>, IFetchTpReport9WDataTask
    {
        private readonly IProduct9WApi _licenseeApi;
        private readonly ILogger _logger;

        public FetchTpReport9WDataTask(IProduct9WApi licenseeApi,
             IThirdPartyImportRepository _thirdPartyRepo,
             ILogger logger,
             ITrackerService timeTrackerService,
             IOptionsSnapshot<FetchServiceSetting> configuration)
            : base(_thirdPartyRepo, configuration.Get(Constants.ServiceConfigName.PULL_TPREPORT_9W_SETTING), timeTrackerService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _licenseeApi = licenseeApi ?? throw new ArgumentNullException(nameof(licenseeApi));
        }

        protected override async Task<IEnumerable<TpReport9W>> GetDataAsync(string trackValue, int batchCount)
        {
            var fromDate = DateTime.Parse(trackValue);
            var toDate = DateTime.Now;
            return await _licenseeApi.GetTpReportAsync(new BaseParam {
                FromDate = fromDate,
                ToDate  = toDate,
                PageIndex = 0,
                PageSize = batchCount
            });
        }

        protected override string GetInsertTrackingValue(IEnumerable<TpReport9W> data)
            => data.Max(d => d.UpdateTime).Value.ToString(Format.DateTimeFormat);

        protected override async Task<string> GetLastTrackingValueAsync()
        {
            var tracker = await _timeTrackerService.GetTrackerAsync(TableName, t => t.KeyValue, new StringToDateTimeComparer());
            var date = string.IsNullOrWhiteSpace(tracker.KeyValue) 
                ? throw new ArgumentException($"Not valid DateTime Tracker Value {tracker.KeyValue}") 
                : DateTime.Parse(tracker.KeyValue);
            var adjustDate = GetAdjustmentDate(date);
            return adjustDate.ToString(Format.DateTimeFormat);
        }

        private DateTime GetAdjustmentDate(DateTime date)
            => date.AddMinutes(Settings.AdjustmentValue);
    }
}

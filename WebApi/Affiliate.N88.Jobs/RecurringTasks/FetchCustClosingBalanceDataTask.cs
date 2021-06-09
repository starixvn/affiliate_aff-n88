using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Models;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Fanex.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchCustClosingBalanceDataTask : IFetchDataTask { }
    public class FetchCustClosingBalanceDataTask : FetchDataByBatchForMultiRepoTaskBase<CustClosingBalanceModel>, IFetchCustClosingBalanceDataTask
    {
        private readonly ILicenseeApi _licenseeApi;
        private readonly ILogger _logger;

        protected override int PagingSize => 2000;

        private const string DateTimeFormat = "yyyy-MM-ddTHH:mm:ss.fff";

        public FetchCustClosingBalanceDataTask(ILicenseeApi licenseeApi,
            IThirdPartyImportRepository _thirdPartyRepo,
            ILogger logger,
            ITrackerService timeTrackerService,
            IOptionsSnapshot<FetchServiceSetting> configuration)
            : base(_thirdPartyRepo, configuration.Get(Constants.ServiceConfigName.PULL_CUST_CLOSING_BALANCE_SETTING), timeTrackerService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _licenseeApi = licenseeApi ?? throw new ArgumentNullException(nameof(licenseeApi));
        }

        protected override Task<IEnumerable<CustClosingBalanceModel>> GetDataAsync(string trackValue, int batchCount)
        {
            var date = Convert.ToDateTime(trackValue);
            return _licenseeApi.GetCustClosingBalance(date, batchCount);
        }

        protected override string GetInsertTrackingValue(IEnumerable<CustClosingBalanceModel> data)
            => data.Max(d => d.Time).ToString(DateTimeFormat);

        protected override async Task<string> GetLastTrackingValueAsync()
        {
            var tracker = await _timeTrackerService.GetTrackerAsync(TableName, t => t.CalledTime);
            var date = string.IsNullOrWhiteSpace(tracker.KeyValue) ? new DateTime() : Convert.ToDateTime(tracker.KeyValue);
            var queryId = GetAdjustmentId(date);
            return queryId.ToString(DateTimeFormat);
        }

        private DateTime GetAdjustmentId(DateTime date)
            => date == new DateTime() ? date : date.AddMinutes(Settings.AdjustmentValue);
    }
}

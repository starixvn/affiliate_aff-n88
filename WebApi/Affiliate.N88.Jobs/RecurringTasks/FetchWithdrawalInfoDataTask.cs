using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Models;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchWithdrawalInfoDataTask : IFetchDataTask { }

    public class FetchWithdrawalInfoDataTask : FetchDataByBatchForMultiRepoTaskBase<Withdrawal>, IFetchWithdrawalInfoDataTask
    {
        private ILicenseeApi Api { get; }

        public FetchWithdrawalInfoDataTask(IThirdPartyImportRepository thirdPartyImportRepository, 
            ITrackerService trackerService,
            ILicenseeApi licenseeApi,
            IOptionsSnapshot<FetchServiceSetting> configuration) 
            : base(thirdPartyImportRepository, configuration.Get(Constants.ServiceConfigName.PULL_WITHDRAWAL_INFO), trackerService)
        {
            Api = licenseeApi;
        }

        protected override Task<IEnumerable<Withdrawal>> GetDataAsync(string trackValue, int batchCount)
        {
            var id = Convert.ToInt32(trackValue);
            return Api.GetWithdrawalInfo(id, batchCount);
        }

        protected override string GetInsertTrackingValue(IEnumerable<Withdrawal> data)
            => data.Max(d => d.WithdrawalId).ToString();

        protected override async Task<string> GetLastTrackingValueAsync()
        {
            var tracker = await _timeTrackerService.GetTrackerAsync(TableName, t => t.CalledTime);
            var id = string.IsNullOrWhiteSpace(tracker.KeyValue) ? 0 : int.Parse(tracker.KeyValue);
            var queryId = GetAdjustmentId(id);
            return queryId.ToString();
        }

        private int GetAdjustmentId(int id)
            => id - Settings.AdjustmentValue < 0 ? 0 : id - Settings.AdjustmentValue;

    }
}

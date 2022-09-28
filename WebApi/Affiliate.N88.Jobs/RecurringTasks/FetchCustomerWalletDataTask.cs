using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Constants;
using Affiliate.N88.Models;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Affiliate.N88.Utitlities;
using Fanex.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchCustomerWalletDataTask : IFetchDataTask { }

    public class FetchCustomerWalletDataTask : FetchDataForMultipleRepositoryTaskBase<CustWalletInfo>, IFetchCustomerWalletDataTask
    {
        private readonly ITrackerService _trackerService;
        private readonly ILicenseeApi _liceseeApi;
        private readonly ILogger _logger;

        public FetchCustomerWalletDataTask(IThirdPartyImportRepository thirdPartyImportRepository
            , ILicenseeApi licenseeApi
            , ILogger logger
            , ITrackerService trackerService
            , IOptionsSnapshot<FetchServiceSetting> setting)
            : base(thirdPartyImportRepository, setting.Get(ServiceConfigName.PULL_CUST_WALLET_SETTING))
        {
            _trackerService = trackerService;
            _liceseeApi = licenseeApi;
            _logger = logger;
        }

        public override async Task FetchDataAsync()
        {
            try
            {
                var fromDate = await _trackerService.GetTimeAsync(TableName);
                await FetchDataAsync(fromDate);
            }
            catch (Exception ex)
            {
                await _logger.ErrorAsync($"Error when fetch {TableName} data {ex.Message}", ex);
            }
        }

        public async Task FetchDataAsync(DateTime fromDate)
        {
            var toDate = GetAdjustmentTime();
            var data = await _liceseeApi.GetCustomerWalletAsync(fromDate);
            await ImportDataToMultipleRepoAsync(data);
            await _trackerService.SaveTimeAsync(TableName, toDate);
        }

        private DateTime GetAdjustmentTime()
            => DateTime.Now.AddMinutes(Settings.AdjustmentValue);

        protected override string BuildXml(IEnumerable<CustWalletInfo> data)
            => XmlHelper.BuildXml(data, "root", "row");

        protected override IEnumerable<string> GetSupportedRepoPrefix()
            => Settings.SupportedPrefix;
    }
}

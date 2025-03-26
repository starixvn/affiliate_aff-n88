using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Constants;
using Affiliate.N88.Jobs.RecurringTasks.Interfaces;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Fanex.Logging;
using Microsoft.Extensions.Options;

namespace Affiliate.N88.Jobs.RecurringTasks.Deposit
{
    public interface IFetchRealDepositInfoDataTask : IFetchDataTask { }

    public class FetchRealDepositInfoDataTask : BaseDepositInfoDataTask, IFetchRealDepositInfoDataTask
    {
        protected override bool IsNeedRealData => true;

        public FetchRealDepositInfoDataTask(IThirdPartyImportRepository thirdPartyImportRepository
            , ILicenseeApi licenseeApi
            , ILogger logger
            , ITrackerService trackerService
            , IOptionsSnapshot<FetchServiceSetting> setting)
            : base(thirdPartyImportRepository, licenseeApi, logger, trackerService, setting.Get(ServiceConfigName.PULL_REAL_DEPOSIT_INFO_SETTING))
        { }
    }
}

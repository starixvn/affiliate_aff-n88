using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Constants;
using Affiliate.N88.Jobs.RecurringTasks.Deposit;
using Affiliate.N88.Jobs.RecurringTasks.Interfaces;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Fanex.Logging;
using Microsoft.Extensions.Options;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchDepositInfoDataTask : IFetchDataTask { }

    public class FetchDepositInfoDataTask : BaseDepositInfoDataTask, IFetchDepositInfoDataTask
    {
        public FetchDepositInfoDataTask(IThirdPartyImportRepository thirdPartyImportRepository
            , ILicenseeApi licenseeApi
            , ILogger logger
            , ITrackerService trackerService
            , IOptionsSnapshot<FetchServiceSetting> setting)
            : base(thirdPartyImportRepository, licenseeApi, logger, trackerService, setting.Get(ServiceConfigName.PULL_DEPOSIT_INFO_SETTING))
        { }
    }
}

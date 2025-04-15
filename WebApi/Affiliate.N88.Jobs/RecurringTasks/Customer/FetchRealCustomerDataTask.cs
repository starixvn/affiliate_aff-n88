using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Constants;
using Affiliate.N88.Jobs.RecurringTasks.Interfaces;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Fanex.Logging;
using Microsoft.Extensions.Options;

namespace Affiliate.N88.Jobs.RecurringTasks.Customer
{
    public interface IFetchRealCustomerDataTask : IFetchDataTask { }

    public class FetchRealCustomerDataTask : BaseCustomerDataTask, IFetchRealCustomerDataTask
    {
        protected override bool IsNeedRealData => true;

        public FetchRealCustomerDataTask(IThirdPartyImportRepository thirdPartyImportRepository
            , ILicenseeApi licenseeApi
            , ILogger logger
            , ITrackerService timeTrackerService
            , IOptionsSnapshot<FetchServiceSetting> setting)
            : base(thirdPartyImportRepository, licenseeApi, logger, timeTrackerService, setting.Get(ServiceConfigName.PULL_REAL_CUSTOMER_SETTING))
        { }
    }
}

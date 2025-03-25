using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Constants;
using Affiliate.N88.Jobs.RecurringTasks.Interfaces;
using Affiliate.N88.Repository;
using Fanex.Logging;
using Microsoft.Extensions.Options;

namespace Affiliate.N88.Jobs.RecurringTasks.AffCustomer
{
    public interface IFetchRealAffCustomerDataTask : IFetchDataTask { }

    public sealed class FetchRealAffCustomerDataTask : BaseAffCustomerDataTask, IFetchRealAffCustomerDataTask
    {
        protected override bool IsNeedRealData => true;

        public FetchRealAffCustomerDataTask(ILicenseeApi licenseeApi
            , IAffMemberRepository affMemberRepository
            , ILogger logger
            , IOptions<LicenseeSiteSetting> config
            , IOptionsSnapshot<FetchServiceSetting> configuration)
            : base(licenseeApi, affMemberRepository, logger, config.Value, configuration.Get(ServiceConfigName.PULL_REAL_AFF_CUSTOMER_SETTING))
        {
        }
    }
}

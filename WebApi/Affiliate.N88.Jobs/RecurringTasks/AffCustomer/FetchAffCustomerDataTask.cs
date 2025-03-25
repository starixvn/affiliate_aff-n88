using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Constants;
using Affiliate.N88.Jobs.RecurringTasks.AffCustomer;
using Affiliate.N88.Jobs.RecurringTasks.Interfaces;
using Affiliate.N88.Repository;
using Fanex.Logging;
using Hangfire;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchAffCustomerDataTask : IFetchDataTask
    {
        [DisableConcurrentExecution(60)]
        [AutomaticRetry(OnAttemptsExceeded = AttemptsExceededAction.Fail, Attempts = 1)]
        Task FetchDataByDateRangeTask();
    }

    public sealed class FetchAffCustomerDataTask : BaseAffCustomerDataTask, IFetchAffCustomerDataTask
    {
        private const int DATE_RANGE = 1440;

        public FetchAffCustomerDataTask(ILicenseeApi licenseeApi
            , IAffMemberRepository affMemberRepository
            , ILogger logger
            , IOptions<LicenseeSiteSetting> config
            , IOptionsSnapshot<FetchServiceSetting> configuration)
        : base(licenseeApi, affMemberRepository, logger, config.Value, configuration.Get(ServiceConfigName.PULL_AFF_CUSTOMER_SETTING))
        { }

        public async Task FetchDataByDateRangeTask()
        {
            if (SupportedSites == null
                || !SupportedSites.Any())
            {
                return;
            }

            var maxTimeRange = TimeSpan.FromMinutes(DATE_RANGE);

            await FetchDataAsync(maxTimeRange);
        }
    }
}
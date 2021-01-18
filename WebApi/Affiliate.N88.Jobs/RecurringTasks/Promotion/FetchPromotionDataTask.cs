using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Models;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Fanex.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks.Promotion
{
    public interface IFetchPromotionDataTask
    {
    }

    public class FetchPromotionDataTask : FetchDataForMultipleRepositoryTaskBase<PromotionModel>, IFetchPromotionDataTask
    {
        private readonly ILicenseeApi _licenseeApi;
        private readonly ILogger _logger;

        public FetchPromotionDataTask(ILicenseeApi licenseeApi,
            IThirdPartyImportRepository _thirdPartyRepo,
            ILogger logger,
            ITrackerService timeTrackerService,
            IOptionsSnapshot<FetchServiceSetting> configuration)
            : base(_thirdPartyRepo, configuration.Get(Constants.ServiceConfigName.PULL_PROMOTION_SETTING), timeTrackerService)
        {

        }

        public override Task FetchDataAsync()
        {
            throw new NotImplementedException();
        }

        protected override string BuildXml(IEnumerable<PromotionModel> data)
        {
            throw new NotImplementedException();
        }

        protected override IEnumerable<string> GetSupportedRepoPrefix()
        {
            throw new NotImplementedException();
        }
    }
}

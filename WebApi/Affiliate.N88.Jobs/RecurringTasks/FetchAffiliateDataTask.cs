using System.Threading.Tasks;
using Affiliate.N88.Jobs.Apis;
using Fanex.Logging;
using Newtonsoft.Json;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchAffiliateDataTask
    {
        Task FetchAffiliateData();
    }

    public class FetchAffiliateDataTask : IFetchAffiliateDataTask
    {
        private readonly ILicenseeApi licenseeApi;
        private readonly ILogger logger;

        public FetchAffiliateDataTask(ILicenseeApi licenseeApi, ILogger logger)
        {
            this.licenseeApi = licenseeApi;
            this.logger = logger;
        }

        public async Task FetchAffiliateData()
        {
            var affiliates = await licenseeApi.GetAffiliates();

            await logger.InfoAsync(JsonConvert.SerializeObject(affiliates));
        }
    }
}
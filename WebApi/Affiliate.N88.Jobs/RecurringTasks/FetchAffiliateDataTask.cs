using System;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchAffiliateDataTask
    {
        Task FetchAffiliateData();
    }

    public class FetchAffiliateDataTask : IFetchAffiliateDataTask
    {
        public Task FetchAffiliateData()
        {
            throw new NotImplementedException();
        }
    }
}
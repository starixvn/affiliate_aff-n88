using Affiliate.N88.SpParams.Commands;
using Affiliate.N88.SpParams.Criteria;
using System;
using System.Threading.Tasks;

namespace Affiliate.N88.Repository
{
    public interface ITimeTrackerRepository
    {
        Task<DateTime> GetLastedTimeAsync(GetLastedImportTimeCriteria timeInfo);

        Task ImportTimeTrackerAsync(InsertImportTimeTrackerCommand timeInfo);

    }
}

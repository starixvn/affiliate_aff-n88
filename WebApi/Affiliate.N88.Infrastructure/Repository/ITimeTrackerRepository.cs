using Affiliate.N88.Models;
using Affiliate.N88.SpParams.Commands;
using Affiliate.N88.SpParams.Criteria;
using System.Threading.Tasks;

namespace Affiliate.N88.Repository
{
    public interface ITrackerRepository
    {
        Task<TrackerInfo> GetLastedTrackerAsync(GetLastedImportTimeCriteria timeInfo);

        Task ImportTimeTrackerAsync(InsertImportTrackerCommand timeInfo);

    }
}

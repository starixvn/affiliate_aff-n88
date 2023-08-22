

using System.Threading.Tasks;
using Affiliate.N88.SpParams.Commands;
using Affiliate.N88.SpParams;
using Affiliate.N88.DTOs;
using System.Collections.Generic;

namespace Affiliate.N88.Repository
{
    public interface IDataTrackerRepository
    {
        Task UpdateDataTrackerAsync(UpdateDataTrackerCommand command);

        Task<IEnumerable<DataTrackerItem>> FetchDataTracker(DataTrackerCriteria criteria);
    }
}

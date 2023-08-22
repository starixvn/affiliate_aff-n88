

using Affiliate.N88.Core;
using Affiliate.N88.DTOs;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Affiliate.N88.Services
{
    public interface IDataTrackerService
    {
        Task<IEnumerable<DataTrackerItem>> FetchTrackerAsync(IEnumerable<IPrefixProvider> prefixProviders , IEnumerable<int> dataTypes, IEnumerable<int> statuses);

        Task UpdateTrackerStatusAsync(DataTrackerItem item, int status);
    }
}

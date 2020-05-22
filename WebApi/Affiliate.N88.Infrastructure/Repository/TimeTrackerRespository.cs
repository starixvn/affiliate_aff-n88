using Affiliate.N88.SpParams.Commands;
using Affiliate.N88.SpParams.Criteria;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.Repository
{
    public class TimeTrackerRespository : ITimeTrackerRepository
    {
        private readonly IDynamicRepository _repo;

        public TimeTrackerRespository(IDynamicRepository repo)
        {
            _repo = repo ?? throw new ArgumentNullException(nameof(repo));
        }
        public async Task<DateTime> GetLastedTimeAsync(GetLastedImportTimeCriteria timeInfo)       
            => await _repo.GetAsync<DateTime>(timeInfo);
        

        public async Task ImportTimeTrackerAsync(InsertImportTimeTrackerCommand timeInfo)
            => await _repo.ExecuteAsync(timeInfo);        
    }
}

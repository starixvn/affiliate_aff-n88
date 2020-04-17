using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.Services
{
    public interface ITimeTrackerService
    {
        Task SaveTimeAsync(string category, DateTime date);

        Task<DateTime> GetTimeAsync(string category);
    }
}

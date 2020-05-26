using System;
using System.Threading.Tasks;

namespace Affiliate.N88.Services
{
    public interface ITimeTrackerService
    {
        Task SaveTimeAsync(string source, DateTime date);

        Task<DateTime> GetTimeAsync(string source);
    }
}

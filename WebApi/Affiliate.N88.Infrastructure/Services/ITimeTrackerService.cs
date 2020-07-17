using Affiliate.N88.Models;
using System;
using System.Threading.Tasks;

namespace Affiliate.N88.Services
{
    public interface ITrackerService
    {
        Task SaveTimeAsync(string source, DateTime date);

        Task<DateTime> GetTimeAsync(string source);

        Task<TrackerInfo> GetTrackerAsync<TKey>(string source, Func<TrackerInfo, TKey> minKeySelector);

        Task SaveTrackerAsync(string source, TrackerInfo tracker);
    }
}

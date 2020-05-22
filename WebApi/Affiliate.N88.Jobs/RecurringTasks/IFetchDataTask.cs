using System;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchDataTask
    {
        Task FetchDataAsync();
    }

    public interface IFetchDataByTimeRange
    {
        Task FetchDataAsync(DateTime fromDate, DateTime toDate);
    }
}

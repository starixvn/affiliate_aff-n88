using Hangfire;
using System;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchDataTask
    {
        [DisableConcurrentExecution(60)]
        [AutomaticRetry(OnAttemptsExceeded = AttemptsExceededAction.Delete, Attempts = 1)]
        Task FetchDataAsync();
    }

    public interface IFetchDataByTimeRange
    {
        Task FetchDataAsync(DateTime fromDate, DateTime toDate);
    }
}

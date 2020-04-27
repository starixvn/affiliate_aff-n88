using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchDataTask
    {
        Task FetchDataAsync();
    }
}

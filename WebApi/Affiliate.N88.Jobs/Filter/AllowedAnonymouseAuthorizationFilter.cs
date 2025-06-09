using Hangfire.Dashboard;

namespace Affiliate.N88.Jobs.Filter
{
    public class AllowedAnonymouseAuthorizationFilter : IDashboardAuthorizationFilter
    {
        public bool Authorize(DashboardContext context)
        {
            return true;
        }
    }
}

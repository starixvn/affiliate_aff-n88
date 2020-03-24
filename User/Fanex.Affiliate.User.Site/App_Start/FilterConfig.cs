using System.Configuration;
using System.Web.Mvc;
using Fanex.Affiliate.User.Core.Filters;

namespace Fanex.Affiliate.User.Site
{
    public static class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            var env = ConfigurationManager.AppSettings["Environment"];
            if (env != "LOCAL")
            {
                filters.Add(new GlobalErrorHandlerAttribute());
            }
            filters.Add(new JsonHandlerAttribute());
        }
    }
}

namespace Fanex.Affiliate.User.Site
{
    using System.Configuration;
    using System.Web.Mvc;
    using Core.Filters;

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
            filters.Add(new IpRestrictionFilterAttribute());
        }
    }
}

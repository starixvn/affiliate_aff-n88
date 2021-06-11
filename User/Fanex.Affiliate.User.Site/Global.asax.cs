using System;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Routing;
using Fanex.Data;
using Fanex.Data.OldConnectionStringProvider;
using Fanex.Affiliate.User.Site.App_Start;

namespace Fanex.Affiliate.User.Site
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            IoCConfig.Register();
            AreaRegistration.RegisterAllAreas();

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);

            RouteConfig.RegisterRoutes(RouteTable.Routes);
            MvcHandler.DisableMvcResponseHeader = true;
            AntiForgeryConfig.RequireSsl = false;
            AntiForgeryConfig.CookieName = "__CSRFAFFSYS";

            DbSettingProviderManager
              .StartNewSession()
              .Use(new OldConnectionStringProvider())
              .UseDefaultDbSettingProvider(
                resourcePath: @"~\App_Data\SpConfig\SpName.xml",
                enableWatching: true)
              .Run();

            LoggingConfig.RegisterSentry();
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            if (sender is HttpApplication application && application.Context != null)
            {
                application.Context.Response.Headers.Remove("Server");
            }
        }

    }
}
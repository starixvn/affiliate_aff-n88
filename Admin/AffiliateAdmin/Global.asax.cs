using System;
using System.IO;
using System.Web;
using System.Web.Mvc;
using Fanex.Affiliate.Admin.Core.Configurations;
using Fanex.Affiliate.Admin.Core.Utilities;
using Fanex.Caching;
using Fanex.Data;
using Fanex.Data.OldConnectionStringProvider;
using ONEbook.UM;
using ONEbook.UM.Configurations;
using ONEbook.UM.Helpers;
using ONEbook.UM.NETFramework;
using ONEbook.UM.Transport;

namespace AffiliateAdmin
{
    public class Global : System.Web.HttpApplication
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Major Code Smell", "S1144:Unused private types or members should be removed", Justification = "<Pending>")]
        void Application_Start(object sender, EventArgs e)
        {
            MvcHandler.DisableMvcResponseHeader = true;

            IoCConfig.Register();

            SslConfig.RegisterHttpSecurityProtocol();

            UMConfig.RegisterGlobalFilters(GlobalFilters.Filters);

            DbSettingProviderManager
                  .StartNewSession()
                  .Use(new OldConnectionStringProvider())
                  .UseDefaultDbSettingProvider(
                    resourcePath: Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"App_Data\SpConfig\SpName.xml"),
                    enableWatching: true)
                  .Run();

            AreaRegistration.RegisterAllAreas();
            LoggingConfig.RegisterSentry();
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Major Code Smell", "S1144:Unused private types or members should be removed", Justification = "<Pending>")]
        void Application_End(object sender, EventArgs e)
        {
            //  Code that runs on application shutdown
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Major Code Smell", "S1144:Unused private types or members should be removed", Justification = "<Pending>")]
        void Application_Error(object sender, EventArgs e)
        {
            // Code that runs when an unhandled error occurs
            Exception ex = Server.GetLastError().GetBaseException();

            if (ex is HttpException)
            {
                return;
            }

            LogHelper.WriteError(ex);
        }
    }
}
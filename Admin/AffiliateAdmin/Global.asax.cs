using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using Fanex.Affiliate.Admin.Core.Configurations;
using Fanex.Affiliate.Admin.Core.Utilities;

namespace AffiliateAdmin
{
    public class Global : System.Web.HttpApplication
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Major Code Smell", "S1144:Unused private types or members should be removed", Justification = "<Pending>")]
        void Application_Start(object sender, EventArgs e)
        {
            MvcHandler.DisableMvcResponseHeader = true;

            IoCConfig.Register();

            Fanex.Data.Configuration.DbSettingProviderManager.Current.Start();

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
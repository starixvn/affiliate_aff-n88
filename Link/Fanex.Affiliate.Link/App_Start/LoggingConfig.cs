using System;
using System.Collections.Generic;
using System.Configuration;
using Fanex.Logging;
using Fanex.Logging.Sentry;
using Sentry;

namespace Fanex.Affiliate.Link
{
    public static class LoggingConfig
    {
        public static void RegisterSentry()
        {
            var appSetting = ConfigurationManager.AppSettings;
            var env = appSetting.Get("Environment");
            var backEndDsn = appSetting.Get("SentryBackEndDsn");
            var frontEndDsn = appSetting.Get("SentryFrontEndDsn");
            var category = appSetting.Get("LoggingCategory");
            var isRegisterSentry = string.Equals(appSetting.Get("IsRegisterSentry"), "true", System.StringComparison.CurrentCultureIgnoreCase);

            if (isRegisterSentry && !string.IsNullOrEmpty(backEndDsn) && !string.IsNullOrEmpty(frontEndDsn))
            {
                LogManager.SetDefaultLogCategory(category).Use(new List<ILogEngine>
                {
                    new SentryLogging(new SentryEngineOptions
                    {
                        Dsn = new Dsn(backEndDsn),
                        FrontEndDsn = new Dsn(frontEndDsn),
                        Environment = env
                    })
                });
            }
        }
    }
}
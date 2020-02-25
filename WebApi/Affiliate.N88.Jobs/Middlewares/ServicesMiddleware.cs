using System;
using System.Net.Http;
using Affiliate.N88.Helpers;
using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Fanex.Data;
using Fanex.Data.Repository;
using Fanex.Data.SqlServer;
using Fanex.Logging;
using Fanex.Logging.Sentry.RavenClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Refit;
using SharpRaven;

namespace Affiliate.N88.Jobs.Middlewares
{
    public static class ServicesMiddleware
    {
        private static AppSettings appSettings;

        public static void RegisterServices(this IServiceCollection services, IConfiguration configuration)
        {
            appSettings = new AppSettings();
            configuration.GetSection("AppSettings").Bind(appSettings);

            services.AddSingleton<IDynamicRepository, DynamicRepository>();
            services.AddSingleton(RestService.For<ILicenseeApi>(
                new HttpClient(new AuthenticatedHttpClientHandler("U6BUFHtVcq5SPQcTl7tHLBG/LF6d5YVRKHrCHD9M+Vw=")) 
                { 
                    BaseAddress = new Uri(appSettings.LicenseeDataAPI)
                }));

            InitLogging(services);
            InitFanexData(configuration);
        }

        public static void InitLogging(IServiceCollection services)
        {
            LogManager
                    .SetDefaultLogCategory("Affiliate.N88.DataApi")
                    .Use(new SentryLogging(new SentryEngineOptions
                    {
                        Dsn = new Dsn(appSettings.SentryDsn)
                    }));

            services.AddSingleton(Logger.Log);
        }

        public static void InitFanexData(IConfiguration configuration)
        {
            DbSettingProviderManager
                .StartNewSession()
                .WithSqlServer(resourcePath: appSettings.SpPath)
                .Run();
        }
    }
}
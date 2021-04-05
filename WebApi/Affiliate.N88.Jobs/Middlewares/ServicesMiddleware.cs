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
using System;
using System.Net;
using System.Net.Http;

namespace Affiliate.N88.Jobs.Middlewares
{
    public static class ServicesMiddleware
    {
        private static AppSettings appSettings;

        public static void RegisterServices(this IServiceCollection services, IConfiguration configuration, AppSettings appSettings)
        {
            ServicesMiddleware.appSettings = appSettings;
            services.AddSingleton<IDynamicRepository, DynamicRepository>();
            services.AddSingleton(RestService.For<ILicenseeApi>(
                new HttpClient(
                    new AuthenticatedHttpClientHandler(appSettings.AuthenticationKey)
                    {
                        Proxy = appSettings.ProxySetting != null && appSettings.ProxySetting.IsUseProxy
                            ? new WebProxy(new Uri(appSettings.ProxySetting.ProxyUrl))
                            : null
                    })
                {
                    BaseAddress = new Uri(appSettings.LicenseeDataAPI),
                }));

            services.AddSingleton(RestService.For<IPromotionApi>(
                new HttpClient(
                    new AuthenticatedHttpClientHandler(appSettings.AuthenticationKey)
                    {
                        Proxy = appSettings.ProxySetting != null && appSettings.ProxySetting.IsUseProxy
                            ? new WebProxy(new Uri(appSettings.ProxySetting.ProxyUrl))
                            : null
                    })
                {
                    BaseAddress = new Uri(appSettings.LicenseeDataAPI),
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
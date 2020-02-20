using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Fanex.Data.Repository;
using Fanex.Logging;
using Fanex.Logging.Sentry;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Refit;
using Sentry;

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
            services.AddSingleton(RestService.For<ILicenseeApi>(appSettings.LicenseeDataAPI));

            InitLogging(services);
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
    }
}
using System.Configuration;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;
using Fanex.Data;
using Fanex.Data.MySql;
using Fanex.Data.Repository;
using Fanex.Logging;
using Fanex.Logging.Sentry.RavenClient;
using SharpRaven;
using SimpleInjector;
using SimpleInjector.Integration.Web;
using SimpleInjector.Integration.Web.Mvc;
using SimpleInjector.Integration.WebApi;

namespace Affiliate.N88.WebApi.App_Start
{
    public static class DependencyConfig
    {
        public static void Init()
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new WebRequestLifestyle();

            // Register your types, for instance:
            container.Register<IDynamicRepository, DynamicRepository>(Lifestyle.Singleton);

            // This is an extension method from the integration package.
            container.RegisterMvcControllers(Assembly.GetExecutingAssembly());

            // This is an extension method from the integration package as well.
            container.RegisterMvcIntegratedFilterProvider();

            container.Verify();

            DependencyResolver.SetResolver(new SimpleInjectorDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(container);
            InitLogging();
            InitFanexData();
        }

        public static void InitLogging()
        {
            LogManager
                    .SetDefaultLogCategory("Affiliate.N88.DataApi")
                    .Use(new SentryLogging(new SentryEngineOptions
                    {
                        Dsn = new Dsn(ConfigurationManager.AppSettings["SentryDsn"])
                    }));
        }

        public static void InitFanexData()
        {
            DbSettingProviderManager
                .StartNewSession()
                .UseDefaultConnectionStringProvider()
                // It comes with a default connection string provider, which works well with MySql connections,
                // as well as a default DbSetting provider
                .WithMySql(resourcePath: ConfigurationManager.AppSettings["StoredProcedurePath"])
                .Run();
        }
    }
}
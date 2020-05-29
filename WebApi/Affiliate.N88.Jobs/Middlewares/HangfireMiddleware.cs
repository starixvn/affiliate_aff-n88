using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.RecurringTasks;
using Affiliate.N88.Jobs.Services;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Hangfire;
using Hangfire.Dashboard;
using Hangfire.MemoryStorage;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.IO;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.Middlewares
{
    public static class HangfireMiddleware
    {
        public static void RegisterHangfire(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions();
            services.AddHangfire(config =>
            {
                config.UseMemoryStorage();
            });

            var appSettings = new AppSettings();
            configuration.GetSection("AppSettings").Bind(appSettings);

            var directory = System.AppDomain.CurrentDomain.BaseDirectory;
            var saveConfigPath = Path.Combine(directory, appSettings.SaveConfigPath);

            //FetchCustomerDataTask
            services.AddScoped<IMemberImportRepository, MemberImportRepository>();
            services.AddScoped<IFetchAffCustomerDataTask, FetchAffCustomerDataTask>();
            services.Configure<LicenseeSiteSetting>(configuration.GetSection("AppSettings:LicenseeSetting"));

            //TimeTrackerService
            services.AddScoped<ITimeTrackerRepository, TimeTrackerRespository>();
            services.AddScoped<ITimeTrackerService, TimeTrackerService>();
            services.Configure<TimeTrackerSetting>(configuration.GetSection("AppSettings:TimeTrackerSetting"));

            //FetchBetRecordDataTask
            services.AddScoped<IThirdPartyImportRepository, ThirdPartyImportRepository>();
            services.AddScoped<IFetchBetRecordDataTask, FetchBetRecordDataTask>();
            services.Configure<FetchServiceSetting>(
                Constants.ServiceConfigName.PULL_BET_RECORD_SETTING,
                configuration.GetSection("AppSettings:PullBetRecordSetting"));

            //FetchCustomerDataTask
            services.AddScoped<IFetchCustomerDataTask, FetchCustomerDataTask>()
                .Configure<FetchServiceSetting>(
                    Constants.ServiceConfigName.PULL_CUSTOMER_SETTING,
                    configuration.GetSection("AppSettings:PullCustomerSetting"));

            //FetchServerInfoDataTask
            services.AddScoped<IFetchServerInfoDataTask, FetchServerInfoDataTask>()
                .Configure<FetchServiceSetting>(
                    Constants.ServiceConfigName.PULL_SERVER_INFO_SETTING,
                    configuration.GetSection("AppSettings:PullServerInfoSetting"));

            //FetchTpGameTypeDataTask
            services.AddScoped<IFetchGameTypeDataTask, FetchGameTypeDataTask>()
                .Configure<FetchServiceSetting>(
                    Constants.ServiceConfigName.PULL_GAME_TYPE_SETTING,
                    configuration.GetSection("AppSettings:PullGameTypeSetting"));
        }

        public static void UseHangfire(this IApplicationBuilder app, AppSettings appSettings)
        {
            app.UseHangfireDashboard("/hangfire", new DashboardOptions
            {
                Authorization = new[] { new AllowedAnonymouseAuthorizationFilter() }
            });
            app.UseHangfireServer();

            if (appSettings.IsRunFetchTask)
            {
                RegisterTask<IFetchAffCustomerDataTask>(typeof(IFetchAffCustomerDataTask).Name, appSettings.PullCustomerInfoCron, job => job.FetchDataAsync());

                RegisterTask<IFetchBetRecordDataTask>($"{typeof(IFetchBetRecordDataTask).Name}", appSettings.PullBetRecordSetting.PullInfoCron, job => job.FetchDataAsync());
                RegisterTask<IFetchBetRecordDataTask>($"{typeof(IFetchBetRecordDataTask).Name}-Daily", Cron.Daily(12), job => job.FetchFromAdjusmentDayAsync(3));
                RegisterTask<IFetchBetRecordDataTask>($"{typeof(IFetchBetRecordDataTask).Name}-Monthly", Cron.Monthly(4, 12, 0), job => job.FetchLastMonthAsync());

                RegisterTask<IFetchCustomerDataTask>($"{typeof(IFetchCustomerDataTask).Name}", appSettings.PullCustomerSetting.PullInfoCron, job => job.FetchDataAsync());
                RegisterTask<IFetchCustomerDataTask>($"{typeof(IFetchCustomerDataTask).Name}-Daily", Cron.Daily(5), job => job.FetchDataDailyTask());

                RegisterTask<IFetchServerInfoDataTask>($"{typeof(IFetchServerInfoDataTask).Name}", appSettings.PullServerInfoSetting.PullInfoCron, job => job.FetchDataAsync());

                RegisterTask<IFetchGameTypeDataTask>($"{typeof(IFetchGameTypeDataTask).Name}", appSettings.PullGameTypeSetting.PullInfoCron, job => job.FetchDataAsync());
            }
        }

        private static void RegisterTask<T>(string serviceId, string cronExpression, Expression<Func<T, Task>> methodCall)
        {
            if (!string.IsNullOrWhiteSpace(cronExpression))
            {
                RecurringJob.AddOrUpdate(
                            serviceId,
                            methodCall,
                            cronExpression);
            }
        }
    }

    public class AllowedAnonymouseAuthorizationFilter : IDashboardAuthorizationFilter
    {
        public bool Authorize(DashboardContext context)
        {
            return true;
        }
    }
}
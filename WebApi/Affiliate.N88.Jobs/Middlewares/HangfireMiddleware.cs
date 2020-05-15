using System;
using System.IO;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.RecurringTasks;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Hangfire;
using Hangfire.Common;
using Hangfire.Dashboard;
using Hangfire.MemoryStorage;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
            services.AddScoped<IFetchCustomerDataTask, FetchCustomerDataTask>();
            services.Configure<LicenseeSiteSetting>(configuration.GetSection("AppSettings:LicenseeSetting"));
            
            //FetchBetRecordDataTask
            services.AddScoped<IThirdPartyImportRepository, ThirdPartyImportRepository>();
            services.AddScoped<IFetchBetRecordDataTask, FetchBetRecordDataTask>();
            services.AddScoped<ITimeTrackerService>(provider => new FileTimeTrackerService(saveConfigPath));
            services.Configure<FetchServiceSetting>(Constants.ServiceConfigName.PULL_BET_RECORD_SETTING, configuration.GetSection("AppSettings:PullBetRecordSetting"));
            
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
                RegisterTask<IFetchCustomerDataTask>(typeof(IFetchCustomerDataTask).Name ,appSettings.PullCustomerInfoCron, job => job.FetchDataAsync());

                RegisterTask<IFetchBetRecordDataTask>($"{typeof(IFetchBetRecordDataTask).Name}", appSettings.PullBetRecordSetting.PullInfoCron, job => job.FetchDataAsync());
                RegisterTask<IFetchBetRecordDataTask>($"{typeof(IFetchBetRecordDataTask).Name}-Daily", "0 0 */1 * *", job => job.FetchFromAdjusmentDay(3));
                RegisterTask<IFetchBetRecordDataTask>($"{typeof(IFetchBetRecordDataTask).Name}-Monthly", Cron.Monthly(4), job => job.FetchLastMonth());
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
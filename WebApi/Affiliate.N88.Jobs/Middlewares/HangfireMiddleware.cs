using System;
using System.IO;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.RecurringTasks;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Hangfire;
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
            var saveConfigPath = Path.Combine(Directory.GetCurrentDirectory(), appSettings.SaveConfigPath);

            //FetchCustomerDataTask
            services.AddScoped<IMemberImportRepository, MemberImportRepository>();
            services.AddScoped<IFetchCustomerDataTask, FetchCustomerDataTask>();
            services.Configure<LicenseeSiteSetting>(configuration.GetSection("AppSettings:LicenseeSetting"));
            
            //FetchBetRecordDataTask
            services.AddScoped<IThirdPartyImportRepository, ThirdPartyImportRepository>();
            services.AddScoped<IFetchBetRecordDataTask, FetchBetRecordDataTask>();
            services.AddScoped<ITimeTrackerService>(provider => new FileTimeTrackerService(saveConfigPath));
            
        }

        public static void UseHangfire(this IApplicationBuilder app, AppSettings appSettings)
        {
            app.UseHangfireDashboard("/hangfire", new DashboardOptions
            {
                Authorization = new[] { new AllowedAnonymouseAuthorizationFilter() }
            });
            app.UseHangfireServer();

            RegisterTask<IFetchCustomerDataTask>(appSettings.PullCustomerInfoCron, job => job.FetchDataAsync());
            RegisterTask<IFetchBetRecordDataTask>(appSettings.PullBetRecordSetting.PullInfoCron, job => job.FetchDataAsync());
        }

        private static void RegisterTask<T>(string cronExpression, Expression<Func<T, Task>> methodCall)
        {
            if (!string.IsNullOrWhiteSpace(cronExpression))
            {
                var info = (MethodCallExpression)methodCall.Body;

                RecurringJob.AddOrUpdate(
                            typeof(T).Name,
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
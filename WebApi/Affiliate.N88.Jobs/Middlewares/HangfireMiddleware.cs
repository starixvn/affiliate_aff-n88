using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.RecurringTasks;
using Affiliate.N88.Repository;
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

            services.AddScoped<IFetchAffiliateDataTask, FetchAffiliateDataTask>();
            services.AddScoped<IMemberImportRepository, MemberImportRepository>();
            services.AddScoped<IFetchCustomerDataTask, FetchCustomerDataTask>();
            services.Configure<LicenseeSiteSetting>(configuration.GetSection("AppSettings:LicenseeSetting"));
        }

        public static void UseHangfire(this IApplicationBuilder app)
        {
            app.UseHangfireDashboard("/hangfire", new DashboardOptions
            {
                Authorization = new[] { new AllowedAnonymouseAuthorizationFilter() }
            });
            app.UseHangfireServer();

            RegisterTask<IFetchAffiliateDataTask>("0 1 * * *", job => job.FetchAffiliateData());
            RegisterTask<IFetchCustomerDataTask>("0 1 * * *", job => job.FetchCustomerDataAsync());
        }

        private static void RegisterTask<T>(string cronExpression, Expression<Func<T, Task>> methodCall)
        {
            if (!string.IsNullOrWhiteSpace(cronExpression))
            {
                var info = (MethodCallExpression)methodCall.Body;

                RecurringJob.AddOrUpdate(
                            info.Method.Name,
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
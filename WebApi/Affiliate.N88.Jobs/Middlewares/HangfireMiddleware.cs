using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Affiliate.N88.Jobs.RecurringTasks;
using Hangfire;
using Hangfire.MemoryStorage;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Affiliate.N88.Jobs.Middlewares
{
    public static class HangfireMiddleware
    {
        public static void RegisterHangfire(this IServiceCollection services)
        {
            services.AddHangfire(config =>
            {
                config.UseMemoryStorage();
            });

            services.AddScoped<IFetchAffiliateDataTask, FetchAffiliateDataTask>();
        }

        public static void UseHangfire(this IApplicationBuilder app)
        {
            app.UseHangfireDashboard();
            app.UseHangfireServer();

            RegisterTask<IFetchAffiliateDataTask>("0 1 * * *", job => job.FetchAffiliateData());
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
}
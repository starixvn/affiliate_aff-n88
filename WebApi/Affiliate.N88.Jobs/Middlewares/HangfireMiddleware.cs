using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Constants;
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

            //FetchCustomerDataTask
            services.AddScoped<IMemberImportRepository, MemberImportRepository>();
            services.AddScoped<IFetchAffCustomerDataTask, FetchAffCustomerDataTask>();
            services.Configure<LicenseeSiteSetting>(configuration.GetSection("AppSettings:LicenseeSetting"));

            //TimeTrackerService
            services.AddScoped<ITrackerRepository, TrackerRespository>();
            services.AddScoped<ITrackerService, TimeTrackerService>();
            services.Configure<TimeTrackerSetting>(configuration.GetSection("AppSettings:TimeTrackerSetting"));

            //FetchBetRecordDataTask
            services.AddScoped<IThirdPartyImportRepository, ThirdPartyImportRepository>();
            services.AddScoped<IFetchBetRecordDataTask, FetchBetRecordDataTask>();
            services.Configure<FetchServiceSetting>(
                ServiceConfigName.PULL_BET_RECORD_SETTING,
                configuration.GetSection($"AppSettings:{ServiceConfigName.PULL_BET_RECORD_SETTING}"));

            //FetchCustomerDataTask
            services.AddScoped<IFetchCustomerDataTask, FetchCustomerDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_CUSTOMER_SETTING,
                    configuration.GetSection($"AppSettings:{ServiceConfigName.PULL_CUSTOMER_SETTING}"));

            //FetchServerInfoDataTask
            services.AddScoped<IFetchServerInfoDataTask, FetchServerInfoDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_SERVER_INFO_SETTING,
                    configuration.GetSection($"AppSettings:{ServiceConfigName.PULL_SERVER_INFO_SETTING}"));

            //FetchTpGameTypeDataTask
            services.AddScoped<IFetchGameTypeDataTask, FetchGameTypeDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_GAME_TYPE_SETTING,
                    configuration.GetSection($"AppSettings:{ServiceConfigName.PULL_GAME_TYPE_SETTING}"));

            //FetchTpTransferInfoDataTask
            services.AddScoped<IFetchTpTransferInfoDataTask, FetchTpTransferInfoDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_TPTRANSFER_INFO_SETTING,
                    configuration.GetSection($"AppSettings:{ServiceConfigName.PULL_TPTRANSFER_INFO_SETTING}"));

            //FetchDepositInfoDataTask
            services.AddScoped<IFetchDepositInfoDataTask, FetchDepositInfoDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_DEPOSIT_INFO_SETTING, 
                    configuration.GetSection($"AppSettings:{ServiceConfigName.PULL_DEPOSIT_INFO_SETTING}"));

            //FetchBonusInfoDataTask
            services.AddScoped<IFetchBonusInfoDataTask, FetchBonusInfoDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_BONUS_INFO_SETTING,
                    configuration.GetSection($"AppSettings:{ServiceConfigName.PULL_BONUS_INFO_SETTING}"));

            //FetchCustRegInfoDataTask
            services.AddScoped<IFetchCustRegInfoDataTask, FetchCustRegInfoDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_CUST_REG_INFO_SETTING,
                    configuration.GetSection($"AppSettings:{ServiceConfigName.PULL_CUST_REG_INFO_SETTING}"));
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

                RegisterTask<IFetchTpTransferInfoDataTask>($"{typeof(IFetchTpTransferInfoDataTask).Name}", appSettings.PullTpTransferInfoSetting.PullInfoCron, job => job.FetchDataAsync());

                RegisterTask<IFetchDepositInfoDataTask>($"{typeof(IFetchDepositInfoDataTask).Name}", appSettings.PullDepositInfoSetting.PullInfoCron, job => job.FetchDataAsync());

                RegisterTask<IFetchCustRegInfoDataTask>($"{typeof(IFetchCustRegInfoDataTask).Name}", appSettings.PullCustRegInfoSetting.PullInfoCron, job => job.FetchDataAsync());

                RegisterTask<IFetchBonusInfoDataTask>($"{typeof(IFetchBonusInfoDataTask).Name}", appSettings.PullCustRegInfoSetting.PullInfoCron, job => job.FetchDataAsync());
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
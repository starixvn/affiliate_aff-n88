using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Constants;
using Affiliate.N88.Jobs.RecurringTasks;
using Affiliate.N88.Jobs.RecurringTasks.Promotion;
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
        private const string APPSETTING_ROOT = "AppSettings";

        public static void RegisterHangfire(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions();
            services.AddHangfire(config =>
            {
                config.UseMemoryStorage();
            });

            var appSettings = new AppSettings();
            configuration.GetSection(APPSETTING_ROOT).Bind(appSettings);

            //FetchCustomerDataTask
            services.AddScoped<IMemberImportRepository, MemberImportRepository>();
            services.AddScoped<IFetchAffCustomerDataTask, FetchAffCustomerDataTask>();
            services.Configure<LicenseeSiteSetting>(configuration.GetSection($"{APPSETTING_ROOT}:LicenseeSetting"));

            //TimeTrackerService
            services.AddScoped<ITrackerRepository, TrackerRespository>();
            services.AddScoped<ITrackerService, TimeTrackerService>();
            services.Configure<TimeTrackerSetting>(configuration.GetSection($"{APPSETTING_ROOT}:TimeTrackerSetting"));

            //FetchBetRecordDataTask
            services.AddScoped<IThirdPartyImportRepository, ThirdPartyImportRepository>();
            services.AddScoped<IFetchBetRecordDataTask, FetchBetRecordDataTask>();
            services.Configure<FetchServiceSetting>(
                ServiceConfigName.PULL_BET_RECORD_SETTING,
                configuration.GetSection($"{APPSETTING_ROOT}:{ServiceConfigName.PULL_BET_RECORD_SETTING}"));

            //FetchCustomerDataTask
            services.AddScoped<IFetchCustomerDataTask, FetchCustomerDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_CUSTOMER_SETTING,
                    configuration.GetSection($"{APPSETTING_ROOT}:{ServiceConfigName.PULL_CUSTOMER_SETTING}"));

            //FetchServerInfoDataTask
            services.AddScoped<IFetchServerInfoDataTask, FetchServerInfoDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_SERVER_INFO_SETTING,
                    configuration.GetSection($"{APPSETTING_ROOT}:{ServiceConfigName.PULL_SERVER_INFO_SETTING}"));

            //FetchTpGameTypeDataTask
            services.AddScoped<IFetchGameTypeDataTask, FetchGameTypeDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_GAME_TYPE_SETTING,
                    configuration.GetSection($"{APPSETTING_ROOT}:{ServiceConfigName.PULL_GAME_TYPE_SETTING}"));

            //FetchTpTransferInfoDataTask
            services.AddScoped<IFetchTpTransferInfoDataTask, FetchTpTransferInfoDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_TPTRANSFER_INFO_SETTING,
                    configuration.GetSection($"{APPSETTING_ROOT}:{ServiceConfigName.PULL_TPTRANSFER_INFO_SETTING}"));

            //FetchDepositInfoDataTask
            services.AddScoped<IFetchDepositInfoDataTask, FetchDepositInfoDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_DEPOSIT_INFO_SETTING,
                    configuration.GetSection($"{APPSETTING_ROOT}:{ServiceConfigName.PULL_DEPOSIT_INFO_SETTING}"));

            //FetchBonusInfoDataTask
            services.AddScoped<IFetchBonusInfoDataTask, FetchBonusInfoDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_BONUS_INFO_SETTING,
                    configuration.GetSection($"{APPSETTING_ROOT}:{ServiceConfigName.PULL_BONUS_INFO_SETTING}"));

            //FetchCustRegInfoDataTask
            services.AddScoped<IFetchCustRegInfoDataTask, FetchCustRegInfoDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_CUST_REG_INFO_SETTING,
                    configuration.GetSection($"{APPSETTING_ROOT}:{ServiceConfigName.PULL_CUST_REG_INFO_SETTING}"));

            //FetchWithdrawalInfoDataTask
            services.AddScoped<IFetchWithdrawalInfoDataTask, FetchWithdrawalInfoDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_WITHDRAWAL_INFO,
                    configuration.GetSection($"{APPSETTING_ROOT}:{ServiceConfigName.PULL_WITHDRAWAL_INFO}")
                );

            //FetchPromotionDataTask
            services.AddScoped<IFetchPromotionDataTask, FetchPromotionDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_PROMOTION_SETTING,
                    configuration.GetSection($"{APPSETTING_ROOT}:{ServiceConfigName.PULL_PROMOTION_SETTING}")
                );

            //FetchPromotionDataTask
            services.AddScoped<IFetchPromotionSpecificDataTask, FetchPromotionSpecificDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_PROMOTIONSPECIFIC_SETTING,
                    configuration.GetSection($"{APPSETTING_ROOT}:{ServiceConfigName.PULL_PROMOTIONSPECIFIC_SETTING}")
                );

            //FetchRebateMLogDataTask
            services.AddScoped<IFetchRebateMLogDataTask, FetchRebateMLogDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_REBATEMLOG_SETTING,
                    configuration.GetSection($"{APPSETTING_ROOT}:{ServiceConfigName.PULL_REBATEMLOG_SETTING}")
                );

            //FetchCustBonusRollOver
            services.AddScoped<IFetchCustBonusRolloverDataTask, FetchCustBonusRolloverDataTask>()
                .Configure<FetchServiceSetting>(
                    ServiceConfigName.PULL_CUST_BONUS_ROLLOVER_SETTING,
                    configuration.GetSection($"{APPSETTING_ROOT}:{ServiceConfigName.PULL_CUST_BONUS_ROLLOVER_SETTING}")
                );
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
                RegisterTask<IFetchBetRecordDataTask>($"{typeof(IFetchBetRecordDataTask).Name}-Daily", Cron.Daily(5), job => job.FetchFromAdjusmentDayAsync(3));
                RegisterTask<IFetchBetRecordDataTask>($"{typeof(IFetchBetRecordDataTask).Name}-Monthly", Cron.Monthly(4, 12, 0), job => job.FetchLastMonthAsync());

                RegisterTask<IFetchCustomerDataTask>($"{typeof(IFetchCustomerDataTask).Name}", appSettings.PullCustomerSetting.PullInfoCron, job => job.FetchDataAsync());
                RegisterTask<IFetchCustomerDataTask>($"{typeof(IFetchCustomerDataTask).Name}-Daily", Cron.Daily(5), job => job.FetchDataDailyTask());

                RegisterTask<IFetchServerInfoDataTask>($"{typeof(IFetchServerInfoDataTask).Name}", appSettings.PullServerInfoSetting.PullInfoCron, job => job.FetchDataAsync());

                RegisterTask<IFetchGameTypeDataTask>($"{typeof(IFetchGameTypeDataTask).Name}", appSettings.PullGameTypeSetting.PullInfoCron, job => job.FetchDataAsync());

                RegisterTask<IFetchTpTransferInfoDataTask>($"{typeof(IFetchTpTransferInfoDataTask).Name}", appSettings.PullTpTransferInfoSetting.PullInfoCron, job => job.FetchDataAsync());

                RegisterTask<IFetchDepositInfoDataTask>($"{typeof(IFetchDepositInfoDataTask).Name}", appSettings.PullDepositInfoSetting.PullInfoCron, job => job.FetchDataAsync());

                RegisterTask<IFetchCustRegInfoDataTask>($"{typeof(IFetchCustRegInfoDataTask).Name}", appSettings.PullCustRegInfoSetting.PullInfoCron, job => job.FetchDataAsync());

                RegisterTask<IFetchBonusInfoDataTask>($"{typeof(IFetchBonusInfoDataTask).Name}", appSettings.PullBonusInfoSetting.PullInfoCron, job => job.FetchDataAsync());

                RegisterTask<IFetchWithdrawalInfoDataTask>($"{typeof(IFetchWithdrawalInfoDataTask).Name}", appSettings.PullWithdrawalInfoSetting.PullInfoCron, job => job.FetchDataAsync());

                RegisterTask<IFetchPromotionDataTask>($"{typeof(IFetchPromotionDataTask).Name}", appSettings.PullPromotionSetting.PullInfoCron, job => job.FetchDataAsync());
                RegisterTask<IFetchPromotionDataTask>($"{typeof(IFetchPromotionDataTask).Name}-Daily", Cron.Daily(5), job => job.FetchDataDailyTask());

                RegisterTask<IFetchPromotionSpecificDataTask>($"{typeof(IFetchPromotionSpecificDataTask).Name}", appSettings.PullPromotionSpecificSetting.PullInfoCron, job => job.FetchDataAsync());
                RegisterTask<IFetchPromotionSpecificDataTask>($"{typeof(IFetchPromotionSpecificDataTask).Name}-Daily", Cron.Daily(5), job => job.FetchDataDailyTask());

                RegisterTask<IFetchRebateMLogDataTask>($"{typeof(IFetchRebateMLogDataTask).Name}", appSettings.PullRebateMLogSetting.PullInfoCron, job => job.FetchDataAsync());

                RegisterTask<IFetchCustBonusRolloverDataTask>($"{typeof(IFetchCustBonusRolloverDataTask).Name}", appSettings.PullCustBonusRolloverSetting.PullInfoCron, job => job.FetchDataAsync());
            }
        }

        private static void RegisterTask<T>(string serviceId, string cronExpression, Expression<Func<T, Task>> methodCall)
        {
            if (!string.IsNullOrWhiteSpace(cronExpression))
            {
                RecurringJob.AddOrUpdate<T>(
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
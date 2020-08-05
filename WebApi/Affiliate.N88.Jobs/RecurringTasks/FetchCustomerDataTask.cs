using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Constants;
using Affiliate.N88.Models;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Affiliate.N88.Utitlities;
using Fanex.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchCustomerDataTask : IFetchDataTask
    {
        Task FetchDataDailyTask();

        Task FetchDataAsync(DateTime fromDate);
    }
    public sealed class FetchCustomerDataTask : FetchDataForMultipleRepositoryTaskBase<CustomerInfo>, IFetchCustomerDataTask
    {
        private readonly ITrackerService _timeTrackerService;
        private readonly ILicenseeApi _liceseeApi;
        private readonly ILogger _logger;

        public FetchCustomerDataTask(IThirdPartyImportRepository thirdPartyImportRepository
            , ILicenseeApi licenseeApi
            , ILogger logger
            , ITrackerService timeTrackerService
            , IOptionsSnapshot<FetchServiceSetting> setting)
            : base(thirdPartyImportRepository, setting.Get(ServiceConfigName.PULL_CUSTOMER_SETTING))
        {
            _timeTrackerService = timeTrackerService ?? throw new ArgumentNullException(nameof(timeTrackerService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _liceseeApi = licenseeApi ?? throw new ArgumentNullException(nameof(licenseeApi));
        }

        public override async Task FetchDataAsync()
        {
            try
            {
                var fromDate = await _timeTrackerService.GetTimeAsync(TableName);
                await FetchDataAsync(fromDate);
            }
            catch (Exception ex)
            {
                await _logger.ErrorAsync($"Error when fetch customer data {ex.Message}", ex);
            }
        }

        public async Task FetchDataAsync(DateTime fromDate)
        {
            var toDate = GetAdjustmentTime();
            var data = await _liceseeApi.GetCustomersAsync(fromDate);
            await ImportDataToMultipleRepoAsync(data);
            await _timeTrackerService.SaveTimeAsync(TableName, toDate);
        }

        public async Task FetchDataDailyTask()
        {
            try
            {
                var adjustmentDay = DateTime.Now.AddDays(-1);
                var yesterday = new DateTime(adjustmentDay.Year, adjustmentDay.Month, adjustmentDay.Day, 0, 0, 0);
                var data = await _liceseeApi.GetCustomersAsync(yesterday);
                await ImportDataToMultipleRepoAsync(data);
            }
            catch (Exception ex)
            {
                await _logger.ErrorAsync($"Error when fetch customer data daily - {ex.Message}", ex);
            }
        }

        private DateTime GetAdjustmentTime()
            => DateTime.Now.AddMinutes(Settings.AdjustmentValue);

        protected override string BuildXml(IEnumerable<CustomerInfo> data)
            => XmlHelper.BuildXml(data, "root", "row");

        protected override IEnumerable<string> GetSupportedRepoPrefix()
            => Settings.SupportedPrefix;
    }
}

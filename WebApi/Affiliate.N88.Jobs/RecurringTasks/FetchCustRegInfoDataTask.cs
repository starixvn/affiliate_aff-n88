using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Models;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Affiliate.N88.Utitlities;
using Fanex.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchCustRegInfoDataTask : IFetchDataTask { }

    public class FetchCustRegInfoDataTask : FetchDataForMultipleRepositoryTaskBase<CustRegModel>, IFetchCustRegInfoDataTask
    {
        private readonly ITrackerService _timeTrackerService;
        private readonly ILicenseeApi _liceseeApi;
        private readonly ILogger _logger;

        public FetchCustRegInfoDataTask(ILicenseeApi licenseeApi,
            IThirdPartyImportRepository _thirdPartyRepo,
            ILogger logger,
            ITrackerService timeTrackerService,
            IOptionsSnapshot<FetchServiceSetting> configuration) 
            : base(_thirdPartyRepo, configuration.Get(Constants.ServiceConfigName.PULL_CUST_REG_INFO_SETTING))
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

        private async Task FetchDataAsync(DateTime fromDate)
        {
            //Convert to number in format YYYYMMDD for argument use in UNIX_TIMESTAMP function 
            var unixTime = Convert.ToInt64(fromDate.ToString("yyyyMMdd"));
            var data = await _liceseeApi.GetCustomerRegInfo(unixTime);
            await ImportDataToMultipleRepoAsync(data);
            var toDate = GetAdjustmentTime(data.Max(d => d.RegTime));
            if (data.Any() && toDate != default(DateTimeOffset))
            {
                await _timeTrackerService.SaveTimeAsync(TableName, toDate.UtcDateTime);
            }
        }

        private DateTimeOffset GetAdjustmentTime(DateTimeOffset date)
            => date.AddDays(Settings.AdjustmentValue);

        protected override string BuildXml(IEnumerable<CustRegModel> data)
            => XmlHelper.BuildXml(data, "root", "row");

        protected override IEnumerable<string> GetSupportedRepoPrefix()
            => Settings.SupportedPrefix;
    }
}

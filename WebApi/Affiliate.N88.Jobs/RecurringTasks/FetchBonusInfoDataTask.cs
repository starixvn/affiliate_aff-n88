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
    public interface IFetchBonusInfoDataTask : IFetchDataTask { }
    public class FetchBonusInfoDataTask : FetchDataForMultipleRepositoryTaskBase<Bonus>, IFetchBonusInfoDataTask
    {
        private const int MAX_ROW_COUNT = 2000;

        private readonly ITrackerService _timeTrackerService;
        private readonly ILicenseeApi _licenseeApi;
        private readonly ILogger _logger;

        public FetchBonusInfoDataTask(ILicenseeApi licenseeApi,
            IThirdPartyImportRepository _thirdPartyRepo,
            ILogger logger,
            ITrackerService timeTrackerService,
            IOptionsSnapshot<FetchServiceSetting> configuration)
            : base(_thirdPartyRepo, configuration.Get(Constants.ServiceConfigName.PULL_BONUS_INFO_SETTING))
        {
            _timeTrackerService = timeTrackerService ?? throw new ArgumentNullException(nameof(timeTrackerService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _licenseeApi = licenseeApi ?? throw new ArgumentNullException(nameof(licenseeApi));
        }

        public override async Task FetchDataAsync()
        {
            var tracker = await _timeTrackerService.GetTrackerAsync(TableName, t => t.CalledTime);
            var id = string.IsNullOrWhiteSpace(tracker.KeyValue) ? 0 : int.Parse(tracker.KeyValue);
            var queryId = GetAdjustmentId(id);
            var data = await _licenseeApi.GetBonusInfo(queryId, MAX_ROW_COUNT);

            await ImportDataAsync(data);
        }

        private async Task ImportDataAsync(IEnumerable<Bonus> data)
        {
            var importData = data;
            while (importData != null && importData.Any())
            {
                await ImportDataToMultipleRepoAsync(importData);
                var maxId = importData.Max(d => d.BonusId);
                await _timeTrackerService.SaveTrackerAsync(TableName,
                    new TrackerInfo
                    {
                        CalledTime = DateTime.Now,
                        KeyValue = maxId.ToString()
                    });

                if (importData.Count() == MAX_ROW_COUNT)
                {
                    importData = await _licenseeApi.GetBonusInfo(maxId, MAX_ROW_COUNT);
                }
                else
                {
                    break;
                }
            }
        }

        private int GetAdjustmentId(int id)
            => id - Settings.AdjustmentValue < 0 ? 0 : id - Settings.AdjustmentValue;

        protected override string BuildXml(IEnumerable<Bonus> data)
             => XmlHelper.BuildXml(data, "root", "row");

        protected override IEnumerable<string> GetSupportedRepoPrefix()
            => Settings.SupportedPrefix;
    }
}

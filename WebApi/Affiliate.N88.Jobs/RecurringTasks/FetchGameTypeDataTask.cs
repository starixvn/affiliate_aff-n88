using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Constants;
using Affiliate.N88.Models;
using Affiliate.N88.Repository;
using Affiliate.N88.Utitlities;
using Fanex.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchGameTypeDataTask : IFetchDataTask { }

    public class FetchGameTypeDataTask : FetchDataForMultipleRepositoryTaskBase<TpGameTypeInfo>, IFetchGameTypeDataTask
    {
        private readonly ILicenseeApi _licenseeApi;
        private readonly ILogger _logger;

        public FetchGameTypeDataTask(IThirdPartyImportRepository thirdPartyImportRepository
            , ILicenseeApi licenseeApi
            , ILogger logger
            , IOptionsSnapshot<FetchServiceSetting> setting)
            : base(thirdPartyImportRepository, setting.Get(ServiceConfigName.PULL_GAME_TYPE_SETTING))
        {
            _licenseeApi = licenseeApi ?? throw new ArgumentNullException(nameof(licenseeApi));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async override Task FetchDataAsync()
        {
            try
            {
                var data = await _licenseeApi.GetGameTypeAsync();
                await ImportDataToMultipleRepoAsync(data);
            }
            catch (Exception ex)
            {
                await _logger.ErrorAsync($"Error when fetch game type data - {ex.Message}", ex);
            }
        }

        protected override string BuildXml(IEnumerable<TpGameTypeInfo> data)
            => XmlHelper.BuildXml(data, "root", "row");

        protected override IEnumerable<string> GetSupportedRepoPrefix()
            => Settings.SupportedPrefix;
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Affiliate.N88.ApiModels;
using Affiliate.N88.Core;
using Affiliate.N88.DTO;
using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Repository;
using Fanex.Logging;
using Microsoft.Extensions.Options;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchCustomerDataTask
    {
        Task FetchCustomerDataAsync();

        Task FetchCustomerDataAsync(DateTime regTime);
    }

    public sealed class FetchCustomerDataTask : IFetchCustomerDataTask
    {
        private readonly IMemberImportRepository _importerRepository;
        private readonly ILicenseeApi _licenseeApi;
        private readonly ILogger _logger;
        private readonly IOptions<LicenseeSiteSetting> _config;

        private IEnumerable<string> SupportedSites => _config.Value?.SupportedSites;

        public FetchCustomerDataTask(ILicenseeApi licenseeApi
            , IMemberImportRepository memberImportRepository
            , ILogger logger
            , IOptions<LicenseeSiteSetting> config)
        {
            _importerRepository = memberImportRepository;
            _licenseeApi = licenseeApi;
            _logger = logger;
            _config = config;
        }

        public async Task FetchCustomerDataAsync()
        {
            try
            {
                if (SupportedSites == null
                    || !SupportedSites.Any())
                {
                    return;
                }

                var date = await GetMinLastedTimeAsync();
                await FetchCustomerDataAsync(date);
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
            }
        }

        public async Task FetchCustomerDataAsync(DateTime regTime)
        {
            var customerData = await _licenseeApi.GetCustomerAsync(regTime);

            if (customerData == null
                || !customerData.Any())
            {
                await _logger.InfoAsync($"No Data on date {regTime}");

                return;
            }

            var insertMemberCommands = await GetImportingData(customerData);
            foreach (var command in insertMemberCommands)
            {

                if (SupportedSites.Any(supportSiteCode => string.CompareOrdinal(supportSiteCode, command.SettingPrefix) == 0))
                {
                    await InsertMembers(regTime, command);
                }
                else
                {
                    await _logger.InfoAsync($"No Import Setting for Prefix: {command.SettingPrefix} Site: {command.SiteName}, Imported Data {regTime}");
                }
            }
        }

        private async Task InsertMembers(DateTime regTime, InsertMemberInfoCommand command)
        {
            try
            {
                await _importerRepository.ImportMemberAsync(command);
                await _logger.InfoAsync($"Prefix: {command.SettingPrefix} Site: {command.SiteName}, Imported Data {regTime} by SP {command.GetSettingKey()}: {command.XmlData}");
            }
            catch (Exception ex)
            {
                await _logger.ErrorAsync($"Prefix: {command.SettingPrefix} Site: {command.SiteName} {ex.Message} \n {command.XmlData}", ex);
            }
        }

        private async Task<IEnumerable<InsertMemberInfoCommand>> GetImportingData(IEnumerable<CustomerModel> customerData)
        {
            var commandList = new List<InsertMemberInfoCommand>();
            var groupCustomers = customerData.GroupBy(c => c.SiteName);

            foreach (var group in groupCustomers)
            {
                var importData = await GenerateImportedDataBySiteName(group.Key, group.ToList());

                commandList.Add(importData);
            }

            return commandList;
        }

        private async Task<InsertMemberInfoCommand> GenerateImportedDataBySiteName(string siteName, List<CustomerModel> customers)
        {
            var prefixSettingCode = await GetSettingCodePrefix(siteName);
            var xml = BuildXml(customers);

            return new InsertMemberInfoCommand(new PrefixProvider(prefixSettingCode))
            {
                SettingPrefix = prefixSettingCode,
                SiteName = siteName,
                XmlData = xml
            };
        }

        private string BuildXml(List<CustomerModel> customers)
        {
            var customerXml = string.Join(
                    string.Empty,
                    customers.Select(customer =>
                    {
                        var builder = new StringBuilder();
                        builder.AppendJoin(" ","< row"
                            , $"CustId=\"{customer?.CustId}\""
                            , $"UserName=\"{customer?.UserName}\""
                            , $"CurrencyId=\"{customer?.CurrencyId}\""
                            , $"ActStatus=\"{customer?.ActStatus}\""
                            , $"AffId=\"{customer?.AffId}\""
                            , $"RegTime=\"{customer?.RegTime}\""
                            , $"FirstDepositDate=\"{customer?.FirstDepositDate}"
                            , $"Status=\"{customer?.Status}"
                            , "row />");
                        return builder.ToString();
                    }));

            return $"<root>{customerXml}</root>";
        }

        private async Task<DateTime> GetMinLastedTimeAsync()
        {
            var dates = new List<DateTime>();
            foreach (var site in SupportedSites)
            {
                try
                {
                    var lastedDate = await GetLastedImportDate(site);
                    dates.Add(lastedDate);
                }
                catch (Exception ex)
                {
                    _logger.Error(ex.Message, ex);
                }
            }

            if (!dates.Any())
            {
                throw new InvalidOperationException($"Can't find lasted importing member date");
            }

            dates.Sort();
            return dates.First();
        }

        private async Task<DateTime> GetLastedImportDate(string settingPrefixCode)
        {
            var prefixProvider = new PrefixProvider(settingPrefixCode);

            return await _importerRepository.GetLastedMemberImportedTimeAsync(new MemberImportedTimeInfo(prefixProvider));
        }

        private async Task<string> GetSiteName(string settingPrefixCode)
        {
            var prefixProvider = new PrefixProvider(settingPrefixCode);

            return await _importerRepository.GetSiteNameAsync(new SiteNameInfo(prefixProvider));
        }

        private async Task<string> GetSettingCodePrefix(string site)
        {
            var configMapping = _config.Value?.LicenseeSiteMapping ?? new List<LicenseeSiteMapping>();

            foreach (var mappingItem in configMapping)
            {
                var siteNameMapping = await GetSiteName(mappingItem.SettingCodePrefix);

                if(string.Compare(siteNameMapping, site, true) == 0)
                {
                    return mappingItem.SettingCodePrefix;
                }
            }

            return site;
        }
    }
}
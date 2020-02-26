using System;
using System.Collections.Generic;
using System.Linq;
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

            var members = GetImportingData(customerData);
            foreach (var groupMember in members)
            {
                var siteName = groupMember.Item1;
                var member = groupMember.Item2;
                try
                {
                    //TODO : Need recheck import right database (check sitename)
                    await _importerRepository.ImportMemberAsync(member);
                    await _logger.InfoAsync($"Site: {siteName}, Imported Data {regTime} by SP {member.GetSettingKey()}: {member.XmlData}");
                }
                catch (Exception ex)
                {
                    await _logger.ErrorAsync($"Site: {siteName} {ex.Message} \n {member.XmlData}", ex);
                }
            }
        }

        //Todo - need clean code
        private IEnumerable<(string, InsertMemberInfoCommand)> GetImportingData(IEnumerable<CustomerModel> customerData)
        {
            var groupCustomer = customerData
                .GroupBy(c => c.SiteName)
                .Select(g => (g.Key, GenerateImpotedDataBySiteName(g.Key, g.ToList())));

            return groupCustomer;
        }

        private InsertMemberInfoCommand GenerateImpotedDataBySiteName(string siteName, List<CustomerModel> customers)
        {
            var prefixSettingCode = GetSettingCodePrefix(siteName);
            var xml = BuildXml(customers);
            var member = new InsertMemberInfoCommand(new PrefixProvider(prefixSettingCode))
            {
                XmlData = xml
            };
            return member;
        }

        private string BuildXml(List<CustomerModel> customers)
        {
            var customerXml = string.Join(
                    string.Empty,
                    customers.Select(customer =>
                    {
                        var agentIds = customer?.AllAgentId?.Replace("[", string.Empty).Replace("]", string.Empty);

                        return $"<row CustId=\"{customer?.CustId}\" UserName=\"{customer?.UserName}\" AgentId=\"{customer?.AgentId}\" AllAgentId=\"{agentIds}\" />";
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

        private async Task<DateTime> GetLastedImportDate(string site)
        {
            var settingPrefixCode = GetSettingCodePrefix(site);

            var prefixProvider = new PrefixProvider(settingPrefixCode);
            return await _importerRepository.GetLastedMemberImportedTimeAsync(new MemberImportedTimeInfo(prefixProvider));
        }

        private string GetSettingCodePrefix(string siteName)
        {
            var configMapping = _config.Value?.LicenseeSiteMapping ?? new List<LicenseeSiteMapping>();
            var prefixSettingCode = configMapping.FirstOrDefault(c => c.SiteName == siteName)?.SettingCodePrefix ?? siteName;
            return prefixSettingCode;
        }
    }
}
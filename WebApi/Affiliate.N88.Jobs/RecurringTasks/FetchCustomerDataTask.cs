using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Affiliate.N88.ApiModels;
using Affiliate.N88.DTO;
using Affiliate.N88.Licensee;
using Affiliate.N88.Repository;
using Affiliate.N88.Jobs.Apis;
using Fanex.Logging;
using Microsoft.Extensions.DependencyInjection;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchCustomerDataTask
    {
        Task FetchCustomerData();

        Task FetchCustomerData(DateTime regTime);
    }

    public sealed class FetchCustomerDataTask : IFetchCustomerDataTask
    {
        private readonly IMemberImportRepository _importerRepository;
        private readonly ILicenseeApi _licenseeApi;
        private readonly ILogger _logger;

        public FetchCustomerDataTask(ILicenseeApi licenseeApi, IMemberImportRepository memberImportRepository, ILogger logger)
        {
            _importerRepository = memberImportRepository;
            _licenseeApi = licenseeApi;
            _logger = logger;
        }

        //Todo
        //Need have time tracker for fetch user.
        public async Task FetchCustomerData()
        {
            try
            {
                var time = new DateTime(2019, 12, 1);
                await FetchCustomerData(time);
            }
            catch (Exception ex)
            {
                _logger.Critical(ex.Message);
                throw ex;
            }
        }

        public async Task FetchCustomerData(DateTime regTime)
        {
            var customerData = await _licenseeApi.GetCustomerAsync(regTime);

            if (customerData == null
                || !customerData.Any())
            {
                return;
            }

            var members = GetImporterData(customerData);
            foreach (var member in members)
            {
                await _importerRepository.ImportMember(member);
            }
        }

        //Todo - need clean code
        private IEnumerable<MemberInfo> GetImporterData(IEnumerable<CustomerModel> customerData)
        {
            var groupCustomer = customerData.GroupBy(c => c.SiteId)
                .Select(g => GenerateMemberInfo(g.Key, g.ToList()));
            return groupCustomer;
        }

        private MemberInfo GenerateMemberInfo(int key, List<CustomerModel> customers)
        {
            MemberInfo member = null;
            var xml = BuildXml(customers);
            switch (key)
            {
                default:
                    member = new MemberInfo<N8BLicensee>
                    {
                        SiteId = key,
                        XmlData = xml
                    };
                    break;
            }
            return member;
        }

        private string BuildXml(List<CustomerModel> customers)
        {
            var customerXml = string.Join(
                    string.Empty,
                    customers.Select(customer =>
                    {
                        var agentIds = customer?.AllAgentId?.Replace("[", string.Empty).Replace("]", string.Empty);

                        return $"<row CustId=\"{customer?.CustId}\" Username=\"{customer?.UserName}\" AgentId=\"{customer?.AgentId}\" AllAgentId=\"{agentIds}\" />";
                    }));

                return $"<root>{customerXml}</root>";
        }
    }

    public static class FetchCustomerExtension
    {
        public static IServiceCollection AddFetchCustomerService(this IServiceCollection services)
        {
            services.AddScoped<IMemberImportRepository, MemberImportRepository>();
            services.AddScoped<IFetchCustomerDataTask, FetchCustomerDataTask>();
            return services;
        }
    }
}
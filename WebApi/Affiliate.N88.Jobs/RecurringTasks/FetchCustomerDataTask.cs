using Affiliate.N88.Infrastructure.ApiModels;
using Affiliate.N88.Infrastructure.DTO;
using Affiliate.N88.Infrastructure.Licensee;
using Affiliate.N88.Infrastructure.Repository;
using Affiliate.N88.Jobs.Apis;
using Fanex.Logging;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchCustomerDataTask
    {
        Task FetchCustomerData();
        Task FetchCustomerData(DateTime regTime);
    }
    public sealed class FetchCustomerDataTask: IFetchCustomerDataTask
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
                    member = new MemberInfo<N8GLicensee>
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
            var xml = new XDocument(new XElement("root"));
            foreach (var customer in customers)
            {
                if (customer == null)
                    continue;

                ReformatCustomer(customer);
                var attributes = customer.GetType()
                    .GetProperties()
                    .Select(p => new XAttribute(p.Name, p.GetValue(customer, null)));
                var row = new XElement("row", attributes);
                xml.Root.Add(row);
            }
            return xml.ToString();
        }

        private void ReformatCustomer(CustomerModel customer)
        {
            var ids = customer.AllAgentId;
            customer.AllAgentId = String.IsNullOrEmpty(ids) ? String.Empty : ids.Substring(1, ids.Length - 2);
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

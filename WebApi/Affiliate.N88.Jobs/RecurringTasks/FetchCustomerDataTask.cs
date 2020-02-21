using Affiliate.N88.Infrastructure.DTO;
using Affiliate.N88.Infrastructure.Repository;
using Affiliate.N88.Jobs.Apis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetCustomerDataTask
    {
        Task FetchCustomerData();
        Task FetchCustomerData(DateTime regTime);
    }
    public sealed class FetchCustomerDataTask: IFetCustomerDataTask
    {
        private readonly IMemberImportRepository _importerRepository;
        private readonly ILicenseeApi _licenseeApi;
        public FetchCustomerDataTask(ILicenseeApi licenseeApi, IMemberImportRepository memberImportRepository)
        {
            _importerRepository = memberImportRepository;
            _licenseeApi = licenseeApi;
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

        //public Task FetchCustomerData()
        //{

        //}

        //private IEnumerable<MemberInfo> GetImporterData(IEnumerable<Customer> customerData)
        //{

        //}
    }
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Affiliate.N88.Infrastructure.ApiModels;
using Affiliate.N88.Infrastructure.DTO;
using Refit;

namespace Affiliate.N88.Jobs.Apis
{
    public interface ILicenseeApi
    {
        [Get("/test/TestMySql")]
        Task<IEnumerable<AffiliateInfo>> GetAffiliates();
        [Get("/customer/getCustomers")]
        Task<IEnumerable<CustomerModel>> GetCustomerAsync(DateTime fromDate);
    }
}
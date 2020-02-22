using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Affiliate.N88.ApiModels;
using Affiliate.N88.DTO;
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
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Affiliate.N88.Models;
using Refit;

namespace Affiliate.N88.Jobs.Apis
{
    public interface ILicenseeApi
    {
        [Get("/customer/getCustomers")]
        Task<IEnumerable<CustomerModel>> GetCustomerAsync(DateTime fromDate);

        [Get("/BetReport/GetBetRecord")]
        Task<IEnumerable<BetRecordInfo>> GetBetRecordAsync(DateTime fromDate, DateTime toDate);
    }
}
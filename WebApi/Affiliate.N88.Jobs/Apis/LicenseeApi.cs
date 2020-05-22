using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Affiliate.N88.Models;
using Hangfire.MemoryStorage.Database;
using Refit;

namespace Affiliate.N88.Jobs.Apis
{
    public interface ILicenseeApi
    {
        [Get("/customer/GetAffCustomers")]
        Task<IEnumerable<AffCustomerModel>> GetAffCustomerAsync(DateTime fromDate);

        [Get("/customer/GetCustomers")]
        Task<IEnumerable<CustomerInfo>> GetCustomersAsync(DateTime fromDate);

        [Get("/BetReport/GetBetRecord")]
        Task<IEnumerable<BetRecordInfo>> GetBetRecordAsync(DateTime fromDate, DateTime toDate);

        [Get("/setting/GetServerInfo")]
        Task<IEnumerable<ServerInfo>> GetServerInfoAsync();

        [Get("/setting/GetTpGameType")]
        Task<IEnumerable<TpGameTypeInfo>> GetGameTypeAsync();
    }
}
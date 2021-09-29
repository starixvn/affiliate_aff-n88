using Affiliate.N88.Models;
using Refit;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.Apis
{
    public interface ILicenseeApi
    {
        [Get("/Home/Index")]
        Task<string> CheckConnection();

        [Get("/customer/GetAffCustomers")]
        Task<IEnumerable<AffCustomerModel>> GetAffCustomerAsync(DateTime fromDate);

        [Get("/customer/GetCustomers")]
        Task<IEnumerable<CustomerInfo>> GetCustomersAsync(DateTime fromDate);

        [Get("/BetReport/GetBetRecord")]
        Task<IEnumerable<TransBetRecordInfo>> GetBetRecordAsync(DateTime fromDate, DateTime toDate, int pageIndex, int pageSize);

        [Get("/setting/GetServerInfo")]
        Task<IEnumerable<ServerInfo>> GetServerInfoAsync();

        [Get("/setting/GetTpGameType")]
        Task<IEnumerable<TpGameTypeInfo>> GetGameTypeAsync();

        [Get("/customer/GetCustWallets")]
        Task<IEnumerable<CustWalletInfo>> GetCustomerWalletAsync(DateTime fromDate);

        [Get("/BetReport/GetTpTransferInfo")]
        Task<IEnumerable<TpTransferInfo>> GetTpTransferInfo(int id, int totalRow);

        [Get("/betreport/GetDepositInfo")]
        Task<IEnumerable<DepositInfo>> GetDepositInfo(int id, int totalRow);

        [Get("/Customer/GetCustomerRegInfo")]
        Task<IEnumerable<CustRegModel>> GetCustomerRegInfo(long unixTime);

        [Get("/BetReport/GetBonusInfo")]
        Task<IEnumerable<Bonus>> GetBonusInfo(int id, int batchCount);

        [Get("/BetReport/GetWithdrawalInfo")]
        Task<IEnumerable<Withdrawal>> GetWithdrawalInfo(int id, int batchCount);

        [Get("/Customer/GetCustBonusRollovers")]
        Task<IEnumerable<CustBonusRolloverModel>> GetCustBonusRolloversAsync(int id, int batchCount);

        [Get("/LogReport/GetRebateMLogs")]
        Task<IEnumerable<RebateMLogModel>> GetRebateMLogs(DateTime fromDate, DateTime toDate);

        [Get("/customer/GetCustClosingBalance")]
        Task<IEnumerable<CustClosingBalanceModel>> GetCustClosingBalance(DateTime lastGetTime, int pageIndex, int pageSize);
    }
}
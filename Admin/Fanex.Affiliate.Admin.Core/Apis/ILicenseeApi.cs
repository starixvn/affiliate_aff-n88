using Fanex.Affiliate.Admin.Core.DTO.Api;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.Admin.Core.Apis
{
    public interface ILicenseeApi
    {
        [Get("/api/customer/GetLoginCustomerInfo")]
        Task<MemberSiteCustomerInfo> GetCustomerInfoAsync(string userName, int siteId);

        [Get("/api/customer/UpdateCustomerWallet")]
        Task<decimal> UpdatePaymentRequestAsync(PaymentRequestInfo paymentInfo);
    }
}

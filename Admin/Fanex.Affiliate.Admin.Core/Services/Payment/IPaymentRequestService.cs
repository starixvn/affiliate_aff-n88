using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Email;
using Fanex.Affiliate.Admin.Core.DTO.Payment;
using Fanex.Affiliate.Admin.Core.MetaModels.Payment;
using System.Collections.Generic;

namespace Fanex.Affiliate.Admin.Core.Services.Payment
{
    public interface IPaymentRequestService
    {
        EntityResult<PaymentRequest> GetPaymentRequestList(PaymentRequestParam param);

        (IEnumerable<PaymentMethodInfo> paymentMethods, decimal minAmount) GetPaymentMethod();

        PaymentRequestDetail GetPaymentRequestDetail(long transId);

        ResultInfo UpdatePaymentRequest(PaymentRequestUpdateParam param, PaymentRequestUpdateEmail emailParam);
    }
}

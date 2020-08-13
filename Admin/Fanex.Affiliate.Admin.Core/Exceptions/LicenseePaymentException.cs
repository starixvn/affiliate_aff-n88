using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Api;
using Newtonsoft.Json;
using System;
using System.Runtime.Serialization;

namespace Fanex.Affiliate.Admin.Core.Exceptions
{
    [Serializable]
    public class LicenseePaymentException : Exception
    {
        public LicenseePaymentException(PaymentRequestInfo paymentInfo, ResultInfo resultInfo)
            :base ($"Error in lincensee api:\n" +
                $"Param: {JsonConvert.SerializeObject(paymentInfo)}\n" +
                $"Error: {resultInfo.Code} - {resultInfo.Message}")
        { }

        public LicenseePaymentException(PaymentRequestInfo paymentInfo, Exception innerExceptin)
            : base($"Error in lincensee api:\nParam: {JsonConvert.SerializeObject(paymentInfo)}", innerExceptin)
        { }

        protected LicenseePaymentException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}

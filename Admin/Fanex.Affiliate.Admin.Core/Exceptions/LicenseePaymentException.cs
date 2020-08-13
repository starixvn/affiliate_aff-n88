using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Api;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Helpers;

namespace Fanex.Affiliate.Admin.Core.Exceptions
{
    #pragma warning disable S3925 // "ISerializable" should be implemented correctly
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
    }
}

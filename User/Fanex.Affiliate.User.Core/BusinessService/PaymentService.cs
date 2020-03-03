using System;
using System.Collections.Generic;
using System.Linq;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.Enum;
using Fanex.Affiliate.User.Core.MetalModels.Email;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.Repository.UserPanel;
using Fanex.Affiliate.User.Core.Resources;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public class PaymentService : IPaymentService
    {
        private const int BeginDay = 8;
        private const int EndDay = 15;

        private readonly IAccountRepository _accountRepository;
        private readonly IPaymentRepository _paymentRepository;
        private readonly IEmailService _emailService;

        public PaymentService(
            IAccountRepository accountRepository,
            IPaymentRepository paymentRepository,
            IEmailService emailService)
        {
            _accountRepository = accountRepository;
            _paymentRepository = paymentRepository;
            _emailService = emailService;
        }

        public IEnumerable<Payment> GetPaymentList(PaymentParam paymentParam)
        {
            return _paymentRepository.GetPaymentList(paymentParam);
        }



        public ResultInfo CancelPaymentRequest(PaymentCancelParam cancelParam, PaymentEmailParam emailParam)
        {
            cancelParam.Status = "Cancelled";

            var resultInfo = _paymentRepository.CancelPaymentRequest(cancelParam);

            if (resultInfo.IsOk)
            {
                resultInfo.Message = Lang.CancelPayoutSucc;

                var userInfo = _accountRepository.GetUserInfoById(cancelParam.AffId, cancelParam.IsInternal);

                if (userInfo != null)
                {
                    emailParam.User = userInfo;
                    emailParam.PaymentType = PaymentRequestType.Cancel;
                    emailParam.MailTo = userInfo.Email;
                }

                SendEmail(emailParam);
            }

            return resultInfo;
        }

        public ResultInfo CreatePaymentRequest(PaymentCreationParam paymentCreationParam, PaymentEmailParam emailParam)
        {
            var resultInfo = ValidatePaymentRequest(paymentCreationParam);

            if (resultInfo.IsOk)
            {
                var param = new PaymentRequestInfo
                {
                    AffId = paymentCreationParam.AffId,
                    Language = paymentCreationParam.Language,
                    IpAddress = paymentCreationParam.Ip,
                    Amount = paymentCreationParam.Amount,
                    ErrCode = paymentCreationParam.ErrCode,
                    ErrMsg = paymentCreationParam.ErrMsg
                };

                resultInfo = _paymentRepository.CreatePaymentRequest(param);

                if (resultInfo.IsOk)
                {
                    paymentCreationParam.TransId = param.TransId;
                    resultInfo.Message = Lang.RequestPayoutSucc;

                    AssignEmailParam(emailParam, paymentCreationParam, PaymentRequestType.Create);
                    SendEmail(emailParam);
                }
            }

            return resultInfo;
        }

        public bool IsInDateRange()
        {
            var currentDay = DateTime.Now.Day;
            return (currentDay >= BeginDay && currentDay <= EndDay);
        }

        private ResultInfo ValidatePaymentRequest(PaymentCreationParam paymentCreationParam)
        {
            var resultInfo = new ResultInfo { IsOk = false };

            if (!IsInDateRange() && !paymentCreationParam.IsLocalTest)
            {
                resultInfo.Message = Lang.PayoutTime;
            }
            else if (!IsValidAmount(paymentCreationParam))
            {
                resultInfo.Message = Error.PaymentAmountInvalid;
            }
            else
            {
                resultInfo.IsOk = true;
            }

            return resultInfo;
        }

        private static bool IsValidAmount(PaymentCreationParam paymentCreationParam)
        {
            return paymentCreationParam.Amount > 0 &&
                paymentCreationParam.Amount >= paymentCreationParam.MinAmount &&
                paymentCreationParam.Amount <= paymentCreationParam.BalBroughtForward;
        }

        private void AssignEmailParam(PaymentEmailParam emailParam, PaymentCreationParam paymentCreationParam, PaymentRequestType paymentType)
        {
            var userInfo = _accountRepository.GetUserInfoById(paymentCreationParam.AffId, paymentCreationParam.IsInternal);

            if (userInfo != null)
            {
                emailParam.User = userInfo;
                emailParam.PaymentType = paymentType;
                emailParam.MailTo = userInfo.Email;
                emailParam.TransId = paymentCreationParam.TransId;
                emailParam.Amount = paymentCreationParam.Amount;
                emailParam.RequestDate = paymentCreationParam.TransDate ?? DateTime.Now;
            }
        }

        private void SendEmail(PaymentEmailParam emailParam)
        {
            if (!string.IsNullOrEmpty(emailParam.MailTo))
            {
                _emailService.SendPaymentEmail(emailParam);
            }
        }

        public IDictionary<string, string> GetPaymentMethods()
        {
            var paymentMethods = _paymentRepository.GetPaymentMethods()
                .PaymentMethods
                .ToDictionary(m => m.PaymentId, m => m.PaymentName);
            return paymentMethods;
        }

        public decimal GetMinAmountPaymentMoney()
        {
            return _paymentRepository.GetPaymentMethods().MinAmount;
        }
    }
}

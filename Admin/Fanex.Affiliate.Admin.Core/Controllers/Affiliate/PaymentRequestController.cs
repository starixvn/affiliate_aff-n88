using Fanex.Affiliate.Admin.Core.Attributes;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Email;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Affiliate.Admin.Core.MetaModels;
using Fanex.Affiliate.Admin.Core.MetaModels.Payment;
using Fanex.Affiliate.Admin.Core.Repository;
using Fanex.Affiliate.Admin.Core.Resources;
using Fanex.Affiliate.Admin.Core.Services.Common;
using Fanex.Affiliate.Admin.Core.Services.Payment;
using Fanex.Affiliate.Admin.Core.Utilities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Fanex.Affiliate.Admin.Core.Controllers.Affiliate
{
    [FunctionAuthorize(FunctionName = Function.Payment)]
    public class PaymentRequestController : BaseController
    {
        private readonly IPaymentService _paymentRequestService;
        private readonly IAuthRepository _authRepo;

        public PaymentRequestController(
            ISessionService sessionService,
            IPaymentService paymentRequestService,
            IAuthRepository authRepository) : base(sessionService)
        {
            _paymentRequestService = paymentRequestService;
            _authRepo = authRepository;
        }

        public ActionResult Index(PaymentRequestParamFromHome param)
        {
            var subMenu = new List<SubMenu>
            {
                new SubMenu { Name = Lang.AffiliateInfo, Url = Url.Content("~/Portal/Affiliate") },
                new SubMenu { Name = Lang.PaymentRequest, Url = Url.Content("~/Portal/PaymentRequest"), IsActive = true },
                new SubMenu { Name = Lang.CommGroup, Url = Url.Content("~/Portal/RevenueGroup") }
            };

            param.SubMenuList = subMenu;

            return View("~/Areas/Portal/Views/Affiliate/PaymentRequest.cshtml", param);
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetPaymentRequestList(PaymentRequestParam param)
        {
            if (ModelState.IsValid)
            {
                return new JsonNetResult
                {
                    Data = _paymentRequestService.GetPaymentRequestList(param)
                };
            }

            return new JsonNetResult();
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetPaymentRequestDetail(long transId)
        {
            if (transId >= Validation.MinId)
            {
                return new JsonNetResult
                {
                    Data = _paymentRequestService.GetPaymentRequestDetail(transId)
                };
            }

            return new JsonNetResult();
        }

        [FunctionAuthorize(FunctionName = Function.Payment, IsHost = true)]
        [HttpPost]
        [ValidateAntiForgeryHeader]
        public async Task<ActionResult> UpdatePaymentRequest(PaymentRequestUpdateParam param)
        {
            if (ModelState.IsValid)
            {
                var permissionParam = new CheckPermissionParam
                {
                    CustId = SessionService.UserId,
                    FuncName = Function.Payment
                };

                var result = _authRepo.CheckPermission(permissionParam);
                if (!result.IsSuccessful)
                {
                    return new JsonNetResult { Data = result };
                }

                var paymentRequestUpdateParam = new PaymentRequestUpdateParam
                {
                    UserId = SessionService.UserId,
                    Ip = Request.UserHostAddress,
                    TransId = param.TransId,
                    IsApproved = param.IsApproved,
                    AdminDesc = Server.HtmlEncode(param.AdminDesc),
                    AffDesc = Server.HtmlEncode(param.AffDesc),
                };

                var emailParam = new PaymentRequestUpdateEmail
                {
                    RootUrl = SiteDomainHelper.GetRootUrl(this),
                };

                return new JsonNetResult
                {
                    Data = await _paymentRequestService.HandlePaymentRequest(paymentRequestUpdateParam, emailParam)
                };
            }

            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = "Transaction not exists!"
                }
            };
        }
    }
}

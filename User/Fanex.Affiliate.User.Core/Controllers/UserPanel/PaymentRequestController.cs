namespace Fanex.Affiliate.User.Core.Controllers
{
    using Constants;
    using DTO;
    using Extensions;
    using Fanex.Affiliate.User.Core.BusinessService;
    using Fanex.Affiliate.User.Core.CoreService;
    using Filters;
    using MetalModels.Email;
    using MetalModels.UserPanel;
    using Resources;
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Utilities;
    using ViewModels.UserPanel;

    [CustomAuthorize]
    public class PaymentRequestController : BaseController
    {
        private readonly IPaymentService _paymentService;
        private readonly IAppSetting _appSetting;
        public PaymentRequestController(ISessionService sessionService,
            IAppSetting appSetting,
            ILanguageService languageService,
            IPaymentService paymentService) : base(sessionService, languageService)
        {
            _paymentService = paymentService;
            _appSetting = appSetting;
        }
        [HttpGet]
        [AjaxOnly]
        public ActionResult Index()
        {
            var viewPath = PathHelper.GetViewPath("UserPanel/PaymentRequest", "Index", _appSetting.SiteName);
            return View(viewPath, GetViewModel(DateTime.Now.Year));
        }

        [HttpPost]
        [AjaxOnly]
        public ActionResult GetPaymentListByYear(int year)
        {
            var viewModel = year >= 2009 && year <= DateTime.Now.Year ? GetViewModel(year) : GetViewModel(DateTime.Now.Year);

            var viewPath = PathHelper.GetViewPath("UserPanel/PaymentRequest/PaymentPartial", "_PaymentList", _appSetting.SiteName);
            return PartialView(viewPath, viewModel);
        }
        [HttpGet]
        [AjaxOnly]
        public ActionResult PaymentRequestPartial()
        {
            var viewPath = PathHelper.GetViewPath("UserPanel/PaymentRequest/PaymentPartial", "_Main", _appSetting.SiteName);
            return PartialView(viewPath, GetViewModel(DateTime.Now.Year));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> CreatePaymentRequest(PaymentCreationParam paymentCreationParam)
        {
            var resultInfo = new ResultInfo { IsOk = true };

            if (SessionService.IsUnauthorized)
            {
                resultInfo.IsOk = false;
                resultInfo.Message = Lang.ErrAuthorized;
            }

            if (resultInfo.IsOk)
            {
                paymentCreationParam.AffId = SessionService.UserSession.AffId;
                paymentCreationParam.Language = SessionService.CurrentLanguage;
                paymentCreationParam.Ip = Request.GetClientIP();
                paymentCreationParam.IsInternal = SessionService.IsInternal;
                paymentCreationParam.IsLocalTest = !_appSetting.IsProduction;
                paymentCreationParam.TransDate = paymentCreationParam.TransDate ?? DateTime.Now;

                var emailParam = new PaymentEmailParam
                {
                    MailContact = _appSetting.GetMailContactByLanguageCode(SessionService.UserSession.PreferredLanguage),
                    DefaultCurrency = _appSetting.DefaultCurrency,
                    RootDomain = SiteDomainHelper.GetRootUrl(this, _appSetting)
                };

                resultInfo = await _paymentService.CreatePaymentRequest(paymentCreationParam, emailParam);

                if (resultInfo.IsOk)
                {
                    resultInfo.Message = $"{Lang.RequestPayoutSucc}<br>{Lang.AConfirmationEmail}<br>{Lang.ForAnyReason.Replace("{0}", Url.Content("~/ContactUs"))}";
                }
            }

            return Json(resultInfo);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CancelPaymentRequest(PaymentCancelParam cancelParam)
        {
            var resultInfo = new ResultInfo { IsOk = false };

            if (SessionService.IsUnauthorized)
            {
                resultInfo.Message = Lang.ErrAuthorized;
            }
            else
            {
                cancelParam.AffId = SessionService.UserSession.AffId;
                cancelParam.Language = SessionService.CurrentLanguage;
                cancelParam.Ip = Request.GetClientIP();

                var emailParam = new PaymentEmailParam
                {
                    MailContact = _appSetting.GetMailContactByLanguageCode(SessionService.UserSession.PreferredLanguage),
                    DefaultCurrency = _appSetting.DefaultCurrency,
                    RootDomain = SiteDomainHelper.GetRootUrl(this, _appSetting),
                    Amount = cancelParam.Amount,
                    RequestDate = cancelParam.RequestDate,
                    TransId = cancelParam.TransId
                };

                resultInfo = _paymentService.CancelPaymentRequest(cancelParam, emailParam);

                if (resultInfo.IsOk)
                {
                    resultInfo.Message = $"{Lang.CancelPayoutSucc}<br>{Lang.AConfirmationEmail}<br>{Lang.ForAnyReason.Replace("{0}", Url.Content("~/ContactUs"))}";
                }
            }

            return Json(resultInfo);
        }

        private PaymentViewModel GetViewModel(int year)
        {
            var paymentParam = new PaymentParam
            {
                AffId = SessionService.UserSession.AffId,
                IsInternal = SessionService.IsInternal,
                Year = year
            };
            var paymentList = _paymentService.GetPaymentList(paymentParam);

            var viewModel = new PaymentViewModel
            {
                PaymentList = paymentList,
                BalBroughtForward = paymentParam.BalBroughtForward,
                MinAmount = paymentParam.MinAmount,
                PreferredPayment = paymentParam.PreferredPayment,
                PendingPayment = paymentList.FirstOrDefault(p => p.Status.MatchWith(PaymentStatus.Processing)),
                IsMarketingAccount = SessionService.UserSession.IsMarketingAccount,
                IsValidDate = true
            };

            return viewModel;
        }

    }
}
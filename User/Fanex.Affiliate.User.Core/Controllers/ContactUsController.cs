namespace Fanex.Affiliate.User.Core.Controllers
{
    using System.Linq;
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using DTO;
    using Fanex.Affiliate.User.Core.ViewModels;
    using MetalModels;
    using MetalModels.Email;
    using Resources;
    using Utilities;


    public class ContactUsController : BaseLayoutController
    {
        private readonly IContactService _contactService;
        private readonly ICaptchaService _captchaService;

        public ContactUsController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService,
            IContactService contactService,
            ICaptchaService captchaService) : base(appSetting, sessionService, languageService)
        {
            _contactService = contactService;
            _captchaService = captchaService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var model = new ContactUsViewModel
            {
                MailContact = AppSetting.GetMailContactByLanguageCode(SessionService.CurrentLanguage)
            };
            AssignBaseLayoutViewModel(model);

            return View($"~/Views/ContactUs/Index.cshtml", model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(ContactUsParam param)
        {
            var result = new ResultInfo { IsOk = false };

            if (SessionService != null && SessionService.IsInternal)
            {
                result.Message = Lang.ErrAuthorized;
            }
            else if (!_captchaService.IsValid(param.Captcha, SessionService.SignUpCaptchaCode, Request.UserHostAddress))
            {
                result.Message = Lang.ValidationCode;
            }
            else if (ModelState.IsValid)
            {
                var isLoggedIn = SessionService.UserSession != null;
                var language = isLoggedIn ? SessionService.UserSession.PreferredLanguage : SessionService.CurrentLanguage;
                param.SubjectRaw = param.Subject;
                param.Sender = Server.HtmlEncode(param.Sender);
                param.Email = Server.HtmlEncode(param.Email);
                param.Affiliate = Server.HtmlEncode(param.Affiliate);
                param.Subject = Server.HtmlEncode(param.Subject);
                param.Content = Server.HtmlEncode(param.Content);
                param.Creator = isLoggedIn ? SessionService.UserSession.AffId : -1;
                param.Ip = Request.UserHostAddress;
                param.SessionId = Session.SessionID;
                param.Browser = Request.Browser.Browser;
                param.SiteFriendlyName = AppSetting.SiteFriendlyName;

                var emailParam = new EmailBaseParam
                {
                    User = new UserInfo { PreferredLanguage = language },
                    MailTo = AppSetting.GetMailContactByLanguageCode(language),
                    MailCc = AppSetting.MailCc
                };

                result = _contactService.SendRequest(param, emailParam);
            }
            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                result.Message = string.Join("<br>", errors);
            }

            return Json(result);
        }
    }
}
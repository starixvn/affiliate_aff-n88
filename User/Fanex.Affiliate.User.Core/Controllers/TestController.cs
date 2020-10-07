namespace Fanex.Affiliate.User.Core.Controllers
{
    using System;
    using System.Web.Mvc;
    using BusinessService;
    using Constants;
    using CoreService;
    using DTO;
    using Enum;
    using Fanex.Affiliate.User.Core.MetalModels;
    using Filters;
    using MetalModels.Email;
    using ONEbook.UM.Filters;
    using Utilities;
    using ViewModels;

    [CheckUMFilter]
    [CustomAuthorize]
    public class TestController : BaseController
    {
        private readonly IMailProcessor _mailProcessor;
        private readonly ILanguageService _languageService;
        private readonly IAppSetting _appSetting;

        private readonly string _mailContact;
        private readonly string _userName;
        private readonly string _siteFriendlyName;

        public TestController(ISessionService sessionService,
            ILanguageService languageService, IAppSetting appSetting) : base(sessionService, languageService)
        {
            _mailProcessor = new MailProcessor();
            _languageService = languageService;
            _appSetting = appSetting;
            _siteFriendlyName = appSetting.SiteFriendlyName;
            _mailContact = appSetting.GetMailContactByLanguageCode(sessionService.UserSession?.PreferredLanguage ?? sessionService.CurrentLanguage);
            _userName = sessionService.UserSession?.UserName ?? "NovaAff0000";
        }

        [HttpGet]
        public ActionResult Index()
        {
            if (!IsValidUser())
            {
                return HttpNotFound();
            }

            return View();
        }

        [HttpGet]
        public ActionResult Preview(TestCriteria criteria)
        {
            if (!IsValidUser())
            {
                return HttpNotFound();
            }

            try
            {
                _languageService.SetCulture(criteria.Language);
                ViewBag.Data = GetEmailContent(criteria);
                _languageService.SetCulture("en-US");
            }
            catch (Exception ex)
            {
                ViewBag.Data = ex.Message + "\n" + ex.StackTrace;
            }

            return View();
        }

        [HttpPost]
        public ActionResult SendEmail(TestCriteria criteria)
        {
            if (!IsValidUser())
            {
                return HttpNotFound();
            }

            var success = true;
            var message = string.Empty;

            try
            {
                var content = GetEmailContent(criteria);
                var Subject = $"Affilite {_siteFriendlyName} testing";

                _mailProcessor.Send(content, criteria.EmailAddress, Subject);
            }
            catch (Exception ex)
            {
                success = false;
                message = ex.Message + "\n" + ex.StackTrace;
            }

            var result = new
            {
                Success = success,
                Message = message
            };

            return Json(result);
        }

        private string GetEmailContent(TestCriteria criteria)
        {
            var content = GetEmailTextContent(criteria);

            return criteria.Format == "txt" ? content : GetEmailHtmlContent(content, criteria.Language);
        }

        private string GetEmailTextContent(TestCriteria criteria)
        {
            var language = EmailService.MappingLanguage(criteria.Language);
            var function = criteria.Function;

            var viewPath = string.Format(TemplateString.EmailTemplatePath, function, language);
            var physicalPath = Server.MapPath(viewPath);
            var model = GetModelByFunction(function);

            return model == null ? string.Empty : _mailProcessor.BuildTemplateContent(physicalPath, model);
        }

        private string GetEmailHtmlContent(string content, string language)
        {
            var domain = SiteDomainHelper.GetRootUrl(this);

            var viewModel = new EmailTemplateViewModel
            {
                RootUrl = domain,
                ImageRootUrl = string.Format(TemplateString.EmailImageRootPath, domain),
                Language = EmailService.MappingLanguage(language),
                Content = content,
                Title = "This is title"
            };
            var viewPath = Server.MapPath("~/Views/Shared/Email/CommonLayout.cshtml");

            return _mailProcessor.BuildTemplateContent(viewPath, viewModel);
        }

        private object GetModelByFunction(string functionName)
        {
            switch (functionName)
            {
                case "ContactUs":
                    return GetContactUsModel();

                case "Csd":
                    return GetCSDModel();

                case "RecoverPassword":
                    return GetForgetPasswordModel();

                case "PaymentCancel":
                    return GetPaymentModel(PaymentRequestType.Cancel);

                case "PaymentRequest":
                    return GetPaymentModel(PaymentRequestType.Create);

                case "NewPassword":
                    return GetRecoverPasswordModel();

                case "Signup":
                    return GetSignupModel();

                case "VerificationAccount":
                    return GetVerificationAccountModel();

                default:
                    return null;
            }
        }

        private object GetContactUsModel()
        {
            return new ContactUsParam
            {
                Sender = "Sender",
                Affiliate = _userName,
                SiteFriendlyName = _siteFriendlyName,
                Email = "abc@nova.com",
                Content = SiteDomainHelper.GetRootUrl(this),
            };
        }

        private object GetCSDModel()
        {
            return new NoticeEmailParam
            {
                UserName = _userName,
                FirstName = "Firs Name",
                LastName = "Last Name",
                SiteFriendlyName = _siteFriendlyName,
                SiteUrl = "abc.com.vn",
                MoreSiteUrls = "xyz.com.vn",
                MailContact = _mailContact
            };
        }

        private object GetForgetPasswordModel()
        {
            return new RecoverPasswordEmailParam
            {
                User = GetUserInfo(),
                MailContact = _mailContact,
                SiteFriendlyName = _siteFriendlyName,
                Code = "12345",
                RootDomain = SiteDomainHelper.GetRootUrl(this),
                MailTo = _mailContact
            };
        }

        private object GetPaymentModel(PaymentRequestType type)
        {
            const long TranId = 1L;
            const decimal Amount = 989;

            return new PaymentEmailParam
            {
                User = GetUserInfo(),
                MailContact = _mailContact,
                SiteFriendlyName = _siteFriendlyName,
                DefaultCurrency = _appSetting.DefaultCurrency,
                TransId = TranId,
                RequestDate = DateTime.Now.Date,
                Amount = Amount,
                RootDomain = SiteDomainHelper.GetRootUrl(this),
                MailTo = _mailContact,
                PaymentType = type
            };
        }

        private object GetRecoverPasswordModel()
        {
            return new NewPasswordEmailParam
            {
                User = GetUserInfo(),
                MailContact = _mailContact,
                SiteFriendlyName = _siteFriendlyName,
                NewPassword = "1234aa",
                RootDomain = SiteDomainHelper.GetRootUrl(this),
                MailTo = _mailContact,
            };
        }

        private object GetSignupModel()
        {
            return new EmailBaseParam
            {
                User = GetUserInfo(),
                MailContact = _mailContact,
                SiteFriendlyName = _siteFriendlyName,
            };
        }

        private object GetVerificationAccountModel()
        {
            return new VerificationAccountEmailParam
            {
                User = GetUserInfo(),
                MailContact = _mailContact,
                SiteFriendlyName = _siteFriendlyName,
                RootDomain = SiteDomainHelper.GetRootUrl(this),
                Code = "123456",
                Ip = "127.0.0.1"
            };
        }

        private UserInfo GetUserInfo()
        {
            return new UserInfo
            {
                AffId = 1,
                FirstName = "Fisrt name",
                UserName = _userName,
                Email = "abc@nova.com",
                LastName = "Last name",
                MailOption = false,
                PreferredLanguage = "en-US"
            };
        }

        private bool IsValidUser()
        {
            return _appSetting.IsLocal || SessionService.IsInternal;
        }
    }

    public class TestCriteria
    {
        public string Language { get; set; }

        public string Function { get; set; }

        public string Format { get; set; }

        public string EmailAddress { get; set; }
    }
}
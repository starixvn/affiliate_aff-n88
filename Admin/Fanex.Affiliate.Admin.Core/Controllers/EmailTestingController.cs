using System;
using System.Linq;
using System.Web.Mvc;
using Fanex.Affiliate.Admin.Core.Attributes;
using Fanex.Affiliate.Admin.Core.Configurations;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO.Email;
using Fanex.Affiliate.Admin.Core.Services;
using Fanex.Affiliate.Admin.Core.Services.Common;
using Fanex.Affiliate.Admin.Core.Utilities;
using Fanex.Affiliate.Admin.Core.ViewModels;

namespace Fanex.Affiliate.Admin.Core.Controllers
{
    [FunctionAuthorize(FunctionName = Function.UserControl)]
    public class EmailTestingController : BaseController
    {
        private const int _transId = 123;
        private const int _amount = 100;
        private const string _firstName = "First Name";

        private readonly IMailProcessor _mailProcessor;

        private readonly IAppSetting _appSetting;

        private readonly ILanguageService _languageService;

        public EmailTestingController(
            ISessionService sessionService,
            IMailProcessor mailProcessor,
            IAppSetting appSetting,
            ILanguageService languageService
            ) : base(sessionService)
        {
            _mailProcessor = mailProcessor;
            _appSetting = appSetting;
            _languageService = languageService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Preview(string language, string function, string format)
        {
            string result;
            try
            {
                _languageService.SetCulture(language);
                result = GetEmailContent(language, function, format);
                _languageService.SetCulture("en-US");
            }
            catch (Exception ex)
            {
                result = ex.Message + "\n" + ex.StackTrace;
            }

            return View(model: result);
        }

        [HttpPost]
        public ActionResult SendEmail(string language, string function, string format, string emailAddress)
        {
            var success = true;
            var message = string.Empty;

            try
            {
                _languageService.SetCulture(language);
                var content = GetEmailContent(language, function, format);
                var shortedLanguageCode = GetShortedLanguageCode(language);

                var appMailId = _appSetting.GetAppMailIdByShortedLanguageCode(shortedLanguageCode);
                var subject = $"Affilite {AppSetting.Instance.SiteFriendlyName} testing";

                _mailProcessor.Send(content, emailAddress, subject, string.Empty, string.Empty, Convert.ToInt32(appMailId));
                _languageService.SetCulture("en-US");
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

        private string GetEmailContent(string language, string function, string format)
        {
            var content = GetEmailTextContent(function, language);

            return format == "txt" ? content : GetEmailHtmlContent(content, language);
        }

        private string GetEmailTextContent(string function, string language)
        {
            var viewPath = string.Format(TemplateString.EmailTemplatePath, function, language);
            var physicalPath = Server.MapPath(viewPath);
            var model = GetModelByFunction(function, language);

            return model == null ? string.Empty : _mailProcessor.BuildTemplateContent(physicalPath, model);
        }

        private string GetEmailHtmlContent(string content, string language)
        {
            var domain = SiteDomainHelper.GetRootUrl(this);

            var viewModel = new EmailTemplateViewModel
            {
                RootUrl = domain,
                UserSiteUrl = "https://ha.nexdev.net:7634/N88User",
                ImageRootUrl = string.Format(TemplateString.EmailImageRootPath, domain),
                Language = language,
                Content = content,
                Title = "This is title"
            };
            var viewPath = Server.MapPath("~/Areas/Portal/Views/Shared/Email/CommonLayout.cshtml");

            return _mailProcessor.BuildTemplateContent(viewPath, viewModel);
        }

        private object GetModelByFunction(string functionName, string languageCode)
        {
            var shortedLanguageCode = GetShortedLanguageCode(languageCode);

            var mailContact = _appSetting.GetMailContactByShortedLanguageCode(shortedLanguageCode);

            switch (functionName)
            {
                case "AffiliateApproved":
                    return new EmailBase
                    {
                        MailContact = mailContact,
                        SiteFriendlyName = _appSetting.SiteFriendlyName
                    };
                case "AffiliateInformation":
                    return new AffInformationEmail
                    {
                        MailContact = mailContact,
                        SiteFriendlyName = _appSetting.SiteFriendlyName,
                        UserSiteUrl = SiteDomainHelper.GetUserSiteUrl(AffType.Asian),
                        FirstName = _firstName,
                        UserName = "NOVA00000",
                        Password = "qwrfsdg"
                    };
                case "WithdrawalGuidance":
                    return new WithdrawalEmail
                    {
                        MailContact = mailContact,
                        SiteFriendlyName = _appSetting.SiteFriendlyName,
                        FirstName = _firstName
                    };
                case "PaymentRequest/Approved":
                    return new PaymentRequestUpdateEmail
                    {
                        MailContact = mailContact,
                        SiteFriendlyName = _appSetting.SiteFriendlyName,
                        DefaultCurrency = _appSetting.DefaultCurrency,
                        FirstName = _firstName,
                        TransId = _transId,
                        TransDate = DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss"),
                        Amount = _amount
                    };
                case "PaymentRequest/Rejected":
                    return new PaymentRequestUpdateEmail
                    {
                        MailContact = mailContact,
                        SiteFriendlyName = _appSetting.SiteFriendlyName,
                        DefaultCurrency = _appSetting.DefaultCurrency,
                        FirstName = _firstName,
                        TransId = _transId,
                        TransDate = DateTime.Now.ToString("MM/dd/yyyy hh:mm:ss"),
                        Amount = _amount
                    };
                default:
                    return null;
            }
        }

        private string GetShortedLanguageCode(string languageCode)
        {
            var shortedLanguageCode = _languageService.GetLanguageList()
                .FirstOrDefault(l => string.Equals(l.LanguageCode, languageCode, StringComparison.OrdinalIgnoreCase))?.ShortedLanguageCode ?? _appSetting.DefaultShortedLanguageCode;

            return shortedLanguageCode.ToUpperInvariant();
        }
    }
}

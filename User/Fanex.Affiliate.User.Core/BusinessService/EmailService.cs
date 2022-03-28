using System;
using System.Web;
using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.Enum;
using Fanex.Affiliate.User.Core.MetalModels;
using Fanex.Affiliate.User.Core.MetalModels.Email;
using Fanex.Affiliate.User.Core.Resources;
using Fanex.Affiliate.User.Core.Utilities;
using Fanex.Affiliate.User.Core.ViewModels;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public class EmailService : IEmailService
    {
        private readonly IMailProcessor _mailProcessor;
        private readonly ILanguageService _languageService;
        private readonly IAppSetting _appSetting;

        public EmailService(IMailProcessor mailProcessor, ILanguageService languageService, IAppSetting appSetting)
        {
            _mailProcessor = mailProcessor;
            _languageService = languageService;
            _appSetting = appSetting;
        }

        private string SetLanguage(string language)
        {
            var currentLanguage = _languageService.GetCurrentLanguage();

            _languageService.SetCulture(language);

            return currentLanguage;
        }

        private void ResetLanguage(string language)
        {
            _languageService.SetCulture(language);
        }

        private int GetAppMailIdByLanguageCode(string languageCode)
        {
            return Convert.ToInt32(_appSetting.GetAppMailIdByLanguageCode(languageCode));
        }

        public void SendRecoverPasswordEmail(RecoverPasswordEmailParam emailParam)
        {
            var preferredLanguage = emailParam.User.PreferredLanguage;
            var prevLanguage = SetLanguage(preferredLanguage);
            var appMailId = GetAppMailIdByLanguageCode(preferredLanguage);

            const string TemplateName = "RecoverPassword";
            emailParam.SiteFriendlyName = _appSetting.SiteFriendlyName;
            var emailContent = GetEmailTextContent(TemplateName, preferredLanguage, emailParam);
            if (!emailParam.User.MailOption)
            {
                emailContent = GetEmailHtmlContent(emailContent, Lang.EmailTitlePasswordRecovery, preferredLanguage, emailParam.RootDomain);
            }

            _mailProcessor.Send(emailContent, emailParam.MailTo, Lang.SubjectForgetPass, emailParam.MailBcc, emailParam.MailCc, appMailId);

            ResetLanguage(prevLanguage);
        }

        public void SendNewPasswordEmail(NewPasswordEmailParam emailParam)
        {
            var preferredLanguage = emailParam.User.PreferredLanguage;
            var prevLanguage = SetLanguage(preferredLanguage);
            var appMailId = GetAppMailIdByLanguageCode(preferredLanguage);

            const string TemplateName = "NewPassword";
            emailParam.SiteFriendlyName = _appSetting.SiteFriendlyName;
            var emailContent = GetEmailTextContent(TemplateName, preferredLanguage, emailParam);
            if (!emailParam.User.MailOption)
            {
                emailContent = GetEmailHtmlContent(emailContent, Lang.EmailTitleNewPassword, preferredLanguage, emailParam.RootDomain);
            }

            _mailProcessor.Send(emailContent, emailParam.MailTo, Lang.SubjectNewPass, emailParam.MailBcc, emailParam.MailCc, appMailId);

            ResetLanguage(prevLanguage);
        }

        public void SendPaymentEmail(PaymentEmailParam emailParam)
        {
            var preferredLanguage = emailParam.User.PreferredLanguage;
            var prevLanguage = SetLanguage(preferredLanguage);
            var appMailId = GetAppMailIdByLanguageCode(preferredLanguage);
            var isCancel = emailParam.PaymentType == PaymentRequestType.Cancel;

            var templateName = isCancel ? "PaymentCancel" : "PaymentRequest";
            var subject = isCancel ? string.Format(Lang.PaymentRequestCancelSubject, emailParam.TransId) : string.Format(Lang.PaymentRequestSubject, emailParam.TransId);
            emailParam.SiteFriendlyName = _appSetting.SiteFriendlyName;
            var emailContent = GetEmailTextContent(templateName, preferredLanguage, emailParam);

            if (!emailParam.User.MailOption)
            {
                emailContent = GetEmailHtmlContent(emailContent, isCancel ? Lang.EmailTitlePaymentCancel : Lang.EmailTitlePayment, preferredLanguage, emailParam.RootDomain);
            }

            _mailProcessor.Send(emailContent, emailParam.MailTo, subject, emailParam.MailBcc, emailParam.MailCc, appMailId);

            ResetLanguage(prevLanguage);
        }

        public void SendNoticeEmailToCsd(NoticeEmailParam emailParam)
        {
            var preferredLanguage = emailParam.User.PreferredLanguage;
            var prevLanguage = SetLanguage(SystemLanguage.EnglishLanguageCode);
            var appMailId = GetAppMailIdByLanguageCode(preferredLanguage);

            const string TemplateName = "Csd";
            emailParam.SiteFriendlyName = _appSetting.SiteFriendlyName;
            var emailContent = GetEmailTextContent(TemplateName, SystemLanguage.EnglishLanguageCode, emailParam);

            var subject = string.Format(Lang.CsdSubject, emailParam.UserName);
            _mailProcessor.Send(emailContent, emailParam.MailTo, subject, emailParam.MailBcc, emailParam.MailCc, appMailId);

            ResetLanguage(prevLanguage);
        }

        public void SendContactUsEmail(EmailBaseParam emailParam, ContactUsParam model)
        {
            const string TemplateName = "ContactUs";
            var appMailId = GetAppMailIdByLanguageCode(emailParam.User.PreferredLanguage);
            var emailContent = GetEmailTextContent(TemplateName, SystemLanguage.EnglishLanguageCode, model);

            var subject = $"{model.SiteFriendlyName} Affiliates - Contact Us - {model.SubjectRaw}";
            _mailProcessor.Send(emailContent, emailParam.MailTo, subject, emailParam.MailBcc, emailParam.MailCc, appMailId);
        }

        public void SendVerificationEmail(VerificationAccountEmailParam emailParam)
        {
            var preferredLanguage = emailParam.User.PreferredLanguage;
            var prevLanguage = SetLanguage(preferredLanguage);
            var appMailId = GetAppMailIdByLanguageCode(preferredLanguage);

            const string TemplateName = "VerificationAccount";
            var emailContent = GetEmailTextContent(TemplateName, preferredLanguage, emailParam);
            if (!emailParam.User.MailOption)
            {
                emailContent = GetEmailHtmlContent(emailContent, Lang.EmailTittleVerificationAccount, preferredLanguage, emailParam.RootDomain);
            }

            _mailProcessor.Send(emailContent, emailParam.MailTo, Lang.SubjectVerificationAccount, emailParam.MailBcc, emailParam.MailCc, appMailId);

            ResetLanguage(prevLanguage);
        }

        private string GetEmailTextContent(string templateName, string prefrerredLanguage, object model)
        {
            var viewPath = string.Format(TemplateString.EmailTemplatePath, templateName, prefrerredLanguage);
            var physicalPath = HttpContext.Current.Server.MapPath(viewPath);

            var encodedContent = _mailProcessor.BuildTemplateContent(physicalPath, model);
            var decodedContent = HttpUtility.HtmlDecode(encodedContent);
            return decodedContent;
        }

        private string GetEmailHtmlContent(string content, string title, string language, string domain)
        {
            var viewModel = new EmailTemplateViewModel
            {
                RootUrl = domain,
                ImageRootUrl = string.Format(TemplateString.EmailImageRootPath, domain),
                Language = language,
                Content = content,
                Title = title
            };
            var viewPath = HttpContext.Current.Server.MapPath("~/Views/Shared/Email/CommonLayout.cshtml");

            var encodedContent = _mailProcessor.BuildTemplateContent(viewPath, viewModel);
            var decodedContent = HttpUtility.HtmlDecode(encodedContent);
            return decodedContent;
        }
    }
}
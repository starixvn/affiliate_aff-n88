using System;
using System.Linq;
using System.Web;
using Fanex.Affiliate.Admin.Core.Configurations;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO.Email;
using Fanex.Affiliate.Admin.Core.Resources;
using Fanex.Affiliate.Admin.Core.Utilities;
using Fanex.Affiliate.Admin.Core.ViewModels;

namespace Fanex.Affiliate.Admin.Core.Services
{
    public class EmailService : IEmailService
    {
        private readonly IMailProcessor _mailProcessor;

        private readonly IAppSetting _appSetting;

        private readonly ILanguageService _languageService;

        public EmailService(IMailProcessor mailProcessor, IAppSetting appSetting, ILanguageService languageService)
        {
            _mailProcessor = mailProcessor;
            _appSetting = appSetting;
            _languageService = languageService;
        }

        public void SendApprovedEmail(AffInformationEmail emailParam)
        {
            _languageService.SetCulture(MappingLanguage(emailParam.Language));
            SendApprovedAffEmail(emailParam);
            SendAffInforEmail(emailParam);
            SendWithdrawalGuidanceEmail(emailParam);
            _languageService.SetCulture(_appSetting.DefaultLanguageCode);
        }

        private void SendApprovedAffEmail(AffInformationEmail emailParam)
        {
            const string TemplateName = "AffiliateApproved";
            var model = new EmailBase
            {
                MailContact = GetMailContactByLanguageCode(emailParam.Language),
                SiteFriendlyName = _appSetting.SiteFriendlyName
            };

            var content = GetEmailTextContent(TemplateName, emailParam.Language, model);

            var contentToSend = emailParam.IsHtml ?
                GetEmailHtmlContent(content, Lang.EmailTitleAffApproved, emailParam.Language, emailParam.RootUrl) :
                content;

            _mailProcessor.Send(contentToSend, emailParam.MailTo, Lang.EmailSubjectAffApproved, _appSetting.BccMail, _appSetting.CcMail);
        }

        private void SendAffInforEmail(AffInformationEmail emailParam)
        {
            const string TemplateName = "AffiliateInformation";
            var model = new AffInformationEmail
            {
                MailContact = GetMailContactByLanguageCode(emailParam.Language),
                SiteFriendlyName = _appSetting.SiteFriendlyName,
                UserSiteUrl = SiteDomainHelper.GetUserSiteUrl(2),
                FirstName = emailParam.FirstName,
                UserName = emailParam.UserName,
                Password = emailParam.Password,
                AffCode = emailParam.AffCode
            };

            var content = GetEmailTextContent(TemplateName, emailParam.Language, model);

            var contentToSend = emailParam.IsHtml ?
                GetEmailHtmlContent(content, Lang.EmailTitleAffInfor, emailParam.Language, emailParam.RootUrl) :
                content;

            _mailProcessor.Send(contentToSend, emailParam.MailTo, Lang.EmailSubjectAffInfor, _appSetting.BccMail, _appSetting.CcMail);
        }

        private void SendWithdrawalGuidanceEmail(AffInformationEmail emailParam)
        {
            const string TemplateName = "WithdrawalGuidance";
            var model = new WithdrawalEmail
            {
                MailContact = GetMailContactByLanguageCode(emailParam.Language),
                SiteFriendlyName = _appSetting.SiteFriendlyName,
                FirstName = emailParam.FirstName
            };

            var content = GetEmailTextContent(TemplateName, emailParam.Language, model);

            var contentToSend = emailParam.IsHtml ?
                GetEmailHtmlContent(content, Lang.EmailTitleWithdrawalGuidance, emailParam.Language, emailParam.RootUrl) :
                content;

            _mailProcessor.Send(contentToSend, emailParam.MailTo, Lang.EmailSubjectWithdrawalGuidance, _appSetting.BccMail, _appSetting.CcMail);
        }

        private string GetEmailTextContent(string templateName, string prefrerredLanguage, object model)
        {
            var viewPath = string.Format(TemplateString.EmailTemplatePath, templateName, MappingLanguage(prefrerredLanguage));
            var physicalPath = HttpContext.Current.Server.MapPath(viewPath);

            return _mailProcessor.BuildTemplateContent(physicalPath, model);
        }

        private string GetEmailHtmlContent(string content, string title, string language, string domain)
        {
            var viewModel = new EmailTemplateViewModel
            {
                RootUrl = domain,
                UserSiteUrl = _appSetting.AsianAffSiteUrl,
                ImageRootUrl = string.Format(TemplateString.EmailImageRootPath, domain),
                Language = MappingLanguage(language),
                Content = content,
                Title = title
            };
            var viewPath = HttpContext.Current.Server.MapPath("~/Areas/Portal/Views/Shared/Email/CommonLayout.cshtml");

            return _mailProcessor.BuildTemplateContent(viewPath, viewModel);
        }

        public void SendPaymentRequestUpdateEmail(PaymentRequestUpdateEmail emailParam)
        {
            _languageService.SetCulture(MappingLanguage(emailParam.Language));
            emailParam.MailContact = GetMailContactByLanguageCode(emailParam.Language);
            emailParam.SiteFriendlyName = _appSetting.SiteFriendlyName;
            emailParam.DefaultCurrency = _appSetting.DefaultCurrency;

            var TemplateName = emailParam.IsApproved ? "PaymentRequest/Approved" : "PaymentRequest/Rejected";

            var content = GetEmailTextContent(TemplateName, emailParam.Language, emailParam);
            var subject = emailParam.IsApproved ?
                string.Format(Lang.EmailSubjectPaymentRequestApproved, emailParam.TransId) :
                string.Format(Lang.EmailSubjectPaymentRequestRejected, emailParam.TransId);
            var title = emailParam.IsApproved ? Lang.EmailTitlePaymentRequestApproved : Lang.EmailTitlePaymentRequestRejected;

            var contentToSend = emailParam.IsHtml ?
                GetEmailHtmlContent(content, title, emailParam.Language, emailParam.RootUrl) :
                content;

            _mailProcessor.Send(contentToSend, emailParam.MailTo, subject, _appSetting.BccMail, _appSetting.CcMail);
            _languageService.SetCulture(_appSetting.DefaultLanguageCode);
        }

        public void SendDisapprovedEmail(AffInformationEmail emailParam)
        {
            _languageService.SetCulture(MappingLanguage(emailParam.Language));
            SendDisapprovedAffiliateEmail(emailParam);
            _languageService.SetCulture(_appSetting.DefaultLanguageCode);
        }

        private void SendDisapprovedAffiliateEmail(AffInformationEmail emailParam)
        {
            const string TemplateName = "AffiliateDisapproved";
            var model = new AffInformationEmail
            {
                MailContact = GetMailContactByLanguageCode(emailParam.Language),
                SiteFriendlyName = _appSetting.SiteFriendlyName,
                FirstName = emailParam.FirstName
            };

            var content = GetEmailTextContent(TemplateName, emailParam.Language, model);

            var contentToSend = emailParam.IsHtml ?
                GetEmailHtmlContent(content, Lang.EmailTitleAffDisapproved, emailParam.Language, emailParam.RootUrl) :
                content;

            _mailProcessor.Send(contentToSend, emailParam.MailTo, Lang.EmailSubjectAffDisapproved, _appSetting.BccMail, _appSetting.CcMail);
        }

        private static string MappingLanguage(string language)
        {
            if (language == "vi-VN")
            {
                return language;
            }

            return "en-US";
        }

        private string GetMailContactByLanguageCode(string languageCode)
        {
            var shortedLanguageCode = _languageService.GetLanguageList()
                .FirstOrDefault(l => string.Equals(l.LanguageCode, languageCode, StringComparison.OrdinalIgnoreCase))?.ShortedLanguageCode ?? _appSetting.DefaultShortedLanguageCode;

            return _appSetting.GetMailContactByShortedLanguageCode(shortedLanguageCode.ToUpperInvariant());
        }
    }
}

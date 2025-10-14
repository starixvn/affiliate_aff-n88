namespace Fanex.Affiliate.User.Core.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using DTO;
    using Fanex.Affiliate.User.Core.MetalModels;
    using Fanex.Affiliate.User.Core.MetalModels.Email;
    using Fanex.Affiliate.User.Core.Repository;
    using Fanex.Affiliate.User.Core.Resources;
    using Fanex.Affiliate.User.Core.ViewModels;
    using Utilities;

    public class ContactUsController : BaseController
    {
        private readonly IAppSetting _appSetting;
        private readonly IContactUsRepository _contactUsRepository;
        private readonly IEmailService _emailService;

        public ContactUsController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService,
            IContactUsRepository contactUsRepository,
            IEmailService emailService) : base(sessionService, languageService)
        {
            _appSetting = appSetting;
            _contactUsRepository = contactUsRepository;
            _emailService = emailService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var contactChannels = _contactUsRepository.GetContactChannels();
            var currentLanguage = SessionService.CurrentLanguage;

            var currentChannel = contactChannels.FirstOrDefault(c =>
                c.MarketID?.Equals(currentLanguage, StringComparison.OrdinalIgnoreCase) == true)
                ?? contactChannels.FirstOrDefault();

            var model = new ContactUsViewModel
            {
                Email = currentChannel?.Email,
                Telegram = currentChannel?.Telegram,
                Whatsapp = currentChannel?.Whatsapp,
                Zalo = currentChannel?.Zalo,
                ContactForm = new ContactUsParam()
            };

            return View("~/Views/ContactUs/Index.cshtml", model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(ContactUsViewModel model)
        {
            var result = new ResultInfo { IsOk = false };

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                result.Message = string.Join("<br>", errors);
                return Json(result);
            }

            try
            {
                var emailParam = new ContactUsEmailParam
                {
                    FirstName = Server.HtmlEncode(model.ContactForm.FirstName),
                    LastName = Server.HtmlEncode(model.ContactForm.LastName),
                    Sender = Server.HtmlEncode(model.ContactForm.Email),
                    Subject = Server.HtmlEncode(model.ContactForm.Subject),
                    Message = Server.HtmlEncode(model.ContactForm.Message),
                    SubmittedDateTime = DateTime.Now,
                    Receiver = model.ContactForm.ReceiverEmail,
                    Language = SessionService.CurrentLanguage
                };

                _emailService.SendContactUsEmail(emailParam);

                result.IsOk = true;
                result.Message = Lang.SendMessageSuccess;
            }
            catch (Exception ex)
            {
                LogHelper.WriteError($"Contact Us send mail failed - {ex.Message}");
                result.Message = Lang.SomethingWentWrong;
            }

            return Json(result);
        }
    }
}
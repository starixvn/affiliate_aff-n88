namespace Fanex.Affiliate.User.Core.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using DTO;
    using Fanex.Affiliate.User.Core.MetalModels;
    using Fanex.Affiliate.User.Core.MetalModels.Email;
    using Fanex.Affiliate.User.Core.Repository;
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

            var model = new ContactUsViewModel
            {
                ContactChannels = contactChannels
            };

            return View("~/Views/ContactUs/Index.cshtml", model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Index(ContactUsParam param)
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
                var contactChannels = _contactUsRepository.GetContactChannels();
                var currentLanguage = SessionService.CurrentLanguage;

                var currentChannel = contactChannels.FirstOrDefault(c =>
                    c.MarketID?.Equals(currentLanguage, StringComparison.OrdinalIgnoreCase) == true)
                    ?? contactChannels.FirstOrDefault();

                var supportEmail = currentChannel?.Email ?? _appSetting.GetMailContactByLanguageCode(currentLanguage);

                var emailParam = new ContactUsEmailParam
                {
                    FirstName = Server.HtmlEncode(param.FirstName),
                    LastName = Server.HtmlEncode(param.LastName),
                    Sender = Server.HtmlEncode(param.Email),
                    Subject = Server.HtmlEncode(param.Subject),
                    Message = Server.HtmlEncode(param.Message),
                    SubmittedDateTime = DateTime.Now,
                    Receiver = supportEmail,
                    RootDomain = SiteDomainHelper.GetRootUrl(this, _appSetting)
                };

                _emailService.SendContactUsEmail(emailParam);

                result.IsOk = true;
                result.Message = "Thank you for contacting us. We will get back to you shortly.";
            }
            catch (Exception ex)
            {
                result.Message = "An error occurred while sending your message. Please try again later.";
            }

            return Json(result);
        }
    }
}
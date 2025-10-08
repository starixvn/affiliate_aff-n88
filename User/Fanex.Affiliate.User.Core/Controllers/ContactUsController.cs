namespace Fanex.Affiliate.User.Core.Controllers
{
    using System.Web.Mvc;
    using BusinessService;
    using Constants;
    using CoreService;
    using Extensions;
    using Utilities;
    using ViewModels;

    public class ContactUsController : BaseController
    {
        private readonly IAppSetting _appSetting;

        public ContactUsController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService,
            IIpLocationService ipLocationService) : base(sessionService, languageService, ipLocationService)
        {
            _appSetting = appSetting;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var mailContact = _appSetting.GetMailContactByLanguageCode(SessionService.CurrentLanguage);
            var shouldShowZalo = ShouldContactApp(SystemLanguage.VietnameseLanguageCode);
            var shouldShowViber = SessionService.UserSession.TargetCountryCode == SystemLanguage.PhilippinesCountryCode;
            
            var model = new ContactUsViewModel
            {
                MailContact = mailContact,
                ShouldShowZalo = shouldShowZalo,
                ShouldShowViber = shouldShowViber
            };

            return View($"~/Views/ContactUs/{_appSetting.SiteName}/Index.cshtml", model);
        }

        private bool ShouldContactApp(string languageCode)
        {
            if (SessionService.CurrentLanguage.MatchWith(languageCode))
            {
                return true;
            }
            
            if (SessionService.UserSession?.PreferredLanguage.MatchWith(languageCode) == true)
            {
                return true;
            }

            return false;
        }
    }
}
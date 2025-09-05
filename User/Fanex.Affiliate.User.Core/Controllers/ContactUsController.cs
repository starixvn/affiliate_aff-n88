namespace Fanex.Affiliate.User.Core.Controllers
{
    using BusinessService;
    using CoreService;
    using Fanex.Affiliate.User.Core.Constants;
    using Fanex.Affiliate.User.Core.Extensions;
    using Fanex.Affiliate.User.Core.ViewModels;
    using System.Web.Mvc;
    using Utilities;

    public class ContactUsController : BaseController
    {
        private readonly IAppSetting _appSetting;

        public ContactUsController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService) : base(sessionService, languageService)
        {
            _appSetting = appSetting;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var mailContact = _appSetting.GetMailContactByLanguageCode(SessionService.CurrentLanguage);
            var shouldShowZalo = ShouldShowZalo();
            
            var model = new ContactUsViewModel
            {
                MailContact = mailContact,
                ShouldShowZalo = shouldShowZalo
            };

            return View($"~/Views/ContactUs/{_appSetting.SiteName}/Index.cshtml", model);
        }

        private bool ShouldShowZalo()
        {
            if (SessionService.CurrentLanguage.MatchWith(SystemLanguage.VietnameseLanguageCode))
            {
                return true;
            }
            
            if (SessionService.UserSession?.PreferredLanguage.MatchWith(SystemLanguage.VietnameseLanguageCode) == true)
            {
                return true;
            }

            return false;
        }
    }
}
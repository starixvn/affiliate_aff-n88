namespace Fanex.Affiliate.User.Core.Controllers
{
    using System.Web.Mvc;
    using BusinessService;
    using Constants;
    using CoreService;
    using Utilities;
    using ViewModels;

    public class HomeController : BaseController
    {
        private readonly IAppSetting _appSetting;
        public HomeController(
            ISessionService sessionService,
            IAppSetting appSetting,
            ILanguageService languageService,
            IIpLocationService ipLocationService) 
            : base(sessionService, languageService, ipLocationService)

        {
            _appSetting = appSetting;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var isAuthenticated = Request.IsAuthenticated && SessionService.UserSession != null;

            var viewModel = new HomeViewModel
            {
                IsAuthenticated = isAuthenticated,
                Language = SessionService.CurrentLanguage,
                ShortedLanguageCode = SystemLanguage.GetUppercaseShortedCode(SessionService.CurrentLanguage),
                SignUpLink = isAuthenticated ? Url.Content("~/UserPanel/Main/#AccountOverview") : Url.Content("~/SignUp"),
                BannerLink = isAuthenticated ? Url.Content("~/UserPanel/Main/#AccountOverview#MediaGallery") : "javascript:;",
                PromotionB2CLink = GetPromotionLink()
            };

            return View($"~/Views/Home/{_appSetting.SiteName}/Index.cshtml", viewModel);
        }

        private string GetPromotionLink()
        {
            var segments = Request.Url.Host.Split('.');
            var domainName = segments.Length > 1 ? segments[segments.Length - 2] : string.Empty;

            return string.Format(_appSetting.PromotionB2CLink, domainName).Replace("..", ".");
        }
    }
}
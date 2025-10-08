namespace Fanex.Affiliate.User.Core.Controllers
{
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using Utilities;

    public class FaqController : BaseLayoutController
    {

        public FaqController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService,
            IIpLocationService ipLocationService) 
            : base(appSetting, sessionService, languageService, ipLocationService)
        {
        }

        [HttpGet]
        public ActionResult Index()
        {
            var viewPath = PathHelper.GetViewPath("Faq", "Index", AppSetting.SiteName);
            return View(viewPath, GetBaseLayoutViewModel());
        }
    }
}
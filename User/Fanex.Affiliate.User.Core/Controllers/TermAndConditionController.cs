namespace Fanex.Affiliate.User.Core.Controllers
{
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using Utilities;

    public class TermAndConditionController : BaseLayoutController
    {
        public TermAndConditionController(
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
            var viewPath = PathHelper.GetViewPath("TermAndCondition", "Index", AppSetting.SiteName);
            return View(viewPath, GetBaseLayoutViewModel());
        }

        [HttpGet]
        public ActionResult Popup()
        {
            var viewPath = PathHelper.GetViewPath("TermAndCondition", "Popup", AppSetting.SiteName);
            return View(viewPath, GetBaseLayoutViewModel());
        }
    }
}
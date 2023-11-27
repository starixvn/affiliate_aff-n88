using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.Utilities;
using System.Web.Mvc;

namespace Fanex.Affiliate.User.Core.Controllers
{
    public class TermAndConditionController : BaseLayoutController
    {
        public TermAndConditionController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService) : base(appSetting, sessionService, languageService)
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
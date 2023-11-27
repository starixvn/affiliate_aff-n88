using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.Utilities;
using System.Web.Mvc;

namespace Fanex.Affiliate.User.Core.Controllers
{
    public class PromotionController : BaseLayoutController
    {
        public PromotionController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService)
        : base(appSetting, sessionService, languageService)
        {
        }

        [HttpGet]
        public ActionResult Index()
        {
            var viewPath = PathHelper.GetViewPath("Promotion", "Index", AppSetting.SiteName);
            return View(viewPath, GetBaseLayoutViewModel());
        }
    }
}

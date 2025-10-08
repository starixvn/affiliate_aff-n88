namespace Fanex.Affiliate.User.Core.Controllers
{
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using Utilities;

    public class PromotionController : BaseLayoutController
    {
        public PromotionController(
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
            return Redirect("~/Home");
        }
    }
}

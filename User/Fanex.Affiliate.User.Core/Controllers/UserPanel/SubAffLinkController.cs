namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using Utilities;

    public class SubAffLinkController : BaseMarketingController
    {
        public SubAffLinkController(ISessionService sessionService,
            IAppSetting appSetting,
            ILanguageService languageService,
            IMarketingService marketingService,
            IIpLocationService ipLocationService)
            : base(sessionService,
                appSetting,
                languageService,
                marketingService,
                ipLocationService)
        {
        }

        public ActionResult Index()
        {
            return RedirectToRoute("UserPanel", new { controller = "AffiliateLink", isTargetToMemberSite = false });
        }
    }
}

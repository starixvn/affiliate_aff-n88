namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using Utilities;

    public class SubAffMediaGalleryController : BaseMarketingController
    {
        public SubAffMediaGalleryController(ISessionService sessionService,
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
            return RedirectToRoute("UserPanel", new { controller = "MediaGallery", isTargetToMemberSite = false });
        }
    }
}

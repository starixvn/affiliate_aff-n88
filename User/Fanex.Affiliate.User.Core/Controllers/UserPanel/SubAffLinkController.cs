using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.CoreService;
using System.Web.Mvc;

namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    public class SubAffLinkController : BaseController
    {
        public SubAffLinkController(ISessionService sessionService, ILanguageService languageService) : base(sessionService, languageService)
        {
        }

        public ActionResult Index()
        {
            var a = RedirectToRoute("UserPanel", new { controller = "AffiliateLink" ,isForMemberSite = false });
            return a;
        }
    }
}

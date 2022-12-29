using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.CoreService;
using System.Web.Mvc;

namespace Fanex.Affiliate.User.Core.Controllers
{
    public class PromotionController: BaseController
    {
        public PromotionController(ISessionService sessionService, ILanguageService languageService)
        : base(sessionService, languageService)
        {
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View("~/Views/Promotion/Index.cshtml", model: SessionService.CurrentLanguage);
        }
    }
}

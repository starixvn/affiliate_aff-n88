using System.Web.Mvc;
using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.ViewModels;

namespace Fanex.Affiliate.User.Core.Controllers
{
    public class TermAndConditionController : BaseController
    {

        public TermAndConditionController(ISessionService sessionService, ILanguageService languageService) :
            base(sessionService, languageService)
        {
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View("~/Views/TermAndCondition/Index.cshtml", model: SessionService.CurrentLanguage);
        }

        [HttpGet]
        public ActionResult Popup(string mode)
        {
            var model = new PopupViewModel
            {
                Mode = string.IsNullOrEmpty(mode) ? "lightmode" : mode,
                CurrentLanguage = SessionService.CurrentLanguage
            };

            return View("~/Views/TermAndCondition/Popup.cshtml", model);
        }
    }
}
namespace Fanex.Affiliate.User.Core.Controllers
{
    using System.Web.Mvc;
    using CoreService;
    using Fanex.Affiliate.User.Core.BusinessService;
    using Fanex.Affiliate.User.Core.Utilities;

    public class FaqController : BaseLayoutController
    {

        public FaqController(
            IAppSetting appSetting, 
            ISessionService sessionService,
            ILanguageService languageService) : base(appSetting, sessionService, languageService)
        {
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View($"~/Views/Faq/Index.cshtml", GetBaseLayoutViewModel());
        }
    }
}
namespace Fanex.Affiliate.User.Core.Controllers
{
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using Filters;
    using Utilities;

    [CustomAuthorize]
    public class MainController : BaseController
    {
        private readonly IAppSetting _appSetting;

        public MainController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService,
            IIpLocationService ipLocationService) 
            : base(sessionService, languageService, ipLocationService)
        {
            _appSetting = appSetting;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var viewPath = PathHelper.GetViewPath("UserPanel/Main", "Index", _appSetting.SiteName);

            return View(viewPath);
        }
    }
}
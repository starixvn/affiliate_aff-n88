namespace Fanex.Affiliate.User.Core.Controllers
{
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using Utilities;

    public class NotifyController : BaseController
    {
        private readonly IAppSetting _appSetting;

        public NotifyController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService,
            IIpLocationService ipLocationService)
            : base(sessionService, languageService, ipLocationService)
        {
            _appSetting = appSetting;
        }

        [HttpGet]
        public ActionResult Error()
        {
            var viewPath = PathHelper.GetViewPath("Notify", "Error", _appSetting.SiteName);
            return View(viewPath);
        }

        [HttpGet]
        public ActionResult PageNotFound()
        {
            var viewPath = PathHelper.GetViewPath("Notify", "PageNotFound", _appSetting.SiteName);
            return View(viewPath);
        }

        public ActionResult CodeExpired()
        {
            return Json(new
            {
                IsOk = false,
                IsExpired = true
            }, JsonRequestBehavior.AllowGet);
        }
    }
}

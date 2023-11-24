using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.Utilities;
using System.Web.Mvc;

namespace Fanex.Affiliate.User.Core.Controllers
{
    public class NotifyController : BaseController
    {
        private readonly IAppSetting _appSetting;

        public NotifyController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService)
            : base(sessionService, languageService)
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

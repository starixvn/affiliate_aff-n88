using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.Utilities;
using System;
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
            if(string.Equals(AppSetting.Instance.SiteName, SiteName.N88, StringComparison.CurrentCultureIgnoreCase))
            {
                return Redirect(Url.Content("~/Notify/PageNotFound"));
            }

            return View("~/Views/Promotion/Index.cshtml", model: SessionService.CurrentLanguage);
        }
    }
}

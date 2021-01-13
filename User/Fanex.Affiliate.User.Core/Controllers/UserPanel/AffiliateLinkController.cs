namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Constants;
    using DTO.UserPanel;
    using Extensions;
    using Fanex.Affiliate.User.Core.BusinessService;
    using Fanex.Affiliate.User.Core.CoreService;
    using Fanex.Affiliate.User.Core.Resources;
    using Fanex.Affiliate.User.Core.Utilities;
    using Filters;
    using MetalModels.UserPanel;
    using ONEbook.UM.Filters;
    using ViewModels.UserPanel.Marketing;

    [CheckUMFilter]
    [CustomAuthorize]
    public class AffiliateLinkController : BaseMarketingController
    {
        private IAccountService AccountService { get; }

        public AffiliateLinkController(ISessionService sessionService,
            IAppSetting appSetting,
            ILanguageService languageService,
            IMarketingService marketingService,
            IAccountService accountService)
            : base(sessionService,
                appSetting,
                languageService,
                marketingService)
        {
            AccountService = accountService;
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult Index()
        {
            var langs = LanguageService.GetLanguageList(SessionService.IsInternal);
            var channels = MarketingService.GetChannels(SessionService.UserSession.AffId);

            var refs = new List<RefLinkViewModel>
            {
                GetAffLinkTypeViewModel(),
            };

            var affId = SessionService.UserSession.AffId;
            if (!AccountService.GetGeneralAffInfo(affId).IsMaxSubLevel)
            {
                refs.Add(GetSubAffLinkTypeViewModel());
            }

            var vm = new AffiliateLinkViewModel
            {
                Channels = channels,
                Languages = langs,
                RefLinks = refs
            };

            ViewBag.SelectedLang = SessionService.UserSession.PreferredLanguage;

            return View("~/Views/UserPanel/AccountOverview/AffiliateLink/Index.cshtml", vm);
        }


    }
}
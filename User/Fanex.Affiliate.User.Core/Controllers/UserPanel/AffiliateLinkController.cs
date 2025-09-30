namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System.Web.Mvc;
    using Fanex.Affiliate.User.Core.BusinessService;
    using Fanex.Affiliate.User.Core.CoreService;
    using Fanex.Affiliate.User.Core.Enum;
    using Fanex.Affiliate.User.Core.Extensions;
    using Fanex.Affiliate.User.Core.Resources;
    using Fanex.Affiliate.User.Core.Utilities;
    using Filters;
    using ONEbook.UM.AspNetMVC.Filters;

    [CheckUMFilter]
    [CustomAuthorize]
    public class AffiliateLinkController : BaseMarketingController
    {
        private IAccountService AccountService { get; }

        public AffiliateLinkController(
            ISessionService sessionService,
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
            var affId = SessionService.UserSession.AffId;
            var targetCountryCode = AccountService.GetAccountInfo(affId)?.TargetCountryCode;

            var vm = GetLinkFormViewModel(targetCountryCode);
            vm.Channels = MarketingService.GetChannels(affId);

            if (!AccountService.GetGeneralAffInfo(affId).IsMaxSubLevel)
            {
                vm.LinkTypes = vm.LinkTypes
                    .Append(new SelectListItem
                    {
                        Value = nameof(AffiliateLinkType.SubAffiliateLink),
                        Text = Lang.SubAffiliateLink
                    });
            }

            ViewBag.SelectedLang = SessionService.UserSession.PreferredLanguage;

            var viewPath = PathHelper.GetViewPath("UserPanel/AccountOverview/AffiliateLink", "Index", AppSetting.SiteName);
            return View(viewPath, vm);
        }
    }
}
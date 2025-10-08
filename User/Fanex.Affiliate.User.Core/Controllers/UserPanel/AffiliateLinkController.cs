namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using Enum;
    using Extensions;
    using Filters;
    using ONEbook.UM.AspNetMVC.Filters;
    using Resources;
    using Utilities;

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
            IAccountService accountService,
            IIpLocationService ipLocationService)
           : base(sessionService,
                appSetting,
                languageService,
                marketingService,
                ipLocationService)
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
namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Mvc.Html;
    using BusinessService;
    using CoreService;
    using Enum;
    using Extensions;
    using Filters;
    using Resources;
    using Utilities;
    using ViewModels.UserPanel.Marketing;

    public class MediaGalleryController : BaseMarketingController
    {
        private IAccountService AccountService { get; }

        public MediaGalleryController(ISessionService sessionService, IAppSetting appSetting,
            ILanguageService languageService,
            IMarketingService marketingService,
            IAccountService accountService,
            IIpLocationService ipLocationService) 
            : base(sessionService, appSetting, languageService, marketingService, ipLocationService)
        {
            AccountService = accountService;
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult Index()
        {
            var searchFormVm = GetSearchFormViewModel();
            ViewBag.SelectedLang = SessionService.UserSession.PreferredLanguage;

            var viewPath = PathHelper.GetViewPath("UserPanel/AccountOverview/MediaGallery", "Index", AppSetting.SiteName);
            return View(viewPath, searchFormVm);
        }

        private MediaGallerySearchFormViewModel GetSearchFormViewModel()
        {
            var userSession = SessionService.UserSession;
            var affId = userSession.AffId;
            var isInternal = SessionService.IsInternal;

            var targetCountryCode = AccountService.GetAccountInfo(affId)?.TargetCountryCode;

            var commonLinkForm = GetLinkFormViewModel(targetCountryCode, true);

            if (!AccountService.GetGeneralAffInfo(affId).IsMaxSubLevel)
            {
                commonLinkForm.LinkTypes = commonLinkForm.LinkTypes.Append(new SelectListItem
                {
                    Value = nameof(AffiliateLinkType.SubAffiliateLink),
                    Text = Lang.SubAffiliateLink
                });
            }

            var currencyList = MarketingService.GetCurrencyList(isInternal)
                .Select(i => new SelectListItem
                {
                    Value = i.Currency,
                    Text = Lang.ResourceManager.GetString(i.Currency.Trim()) ?? i.Currency
                });

            return new MediaGallerySearchFormViewModel
            {
                CategoryList = commonLinkForm.CategoryList,
                Channels = MarketingService.GetChannels(affId),
                CurrencyList = currencyList,
                DeviceList = EnumHelper.GetSelectList(typeof(DeviceType)),
                SizeList = commonLinkForm.SizeList,
                LinkTypes = commonLinkForm.LinkTypes,
                TargetCountries = commonLinkForm.TargetCountries,
                Languages = commonLinkForm.Languages,
                Domains = commonLinkForm.Domains,
                SitePages = commonLinkForm.SitePages
            };
        }
    }
}
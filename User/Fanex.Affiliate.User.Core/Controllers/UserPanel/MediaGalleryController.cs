namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Constants;
    using DTO.UserPanel;
    using Extensions;
    using Fanex.Affiliate.User.Core.BusinessService;
    using Fanex.Affiliate.User.Core.CoreService;
    using Fanex.Affiliate.User.Core.Utilities;
    using Filters;
    using MetalModels.UserPanel;
    using ViewModels.UserPanel.Marketing;

    public class MediaGalleryController : BaseMarketingController
    {
        public MediaGalleryController(ISessionService sessionService, IAppSetting appSetting,
            ILanguageService languageService,
            IMarketingService marketingService) :
            base(sessionService, appSetting, languageService, marketingService)
        {
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult Index(bool isTargetToMemberSite = true)
        {
            return isTargetToMemberSite ? GetViewForMemberSite() : GetViewForAffiliateSite();
        }

        private ActionResult GetViewForMemberSite()
        {
            var userSession = SessionService.UserSession;
            var searchForm = GetSearchFormViewModel(true);
            var linkForm = GetLinkFormViewModel();

            var selectedLanguage = userSession.PreferredLanguage;
            var selectedDomain = linkForm.DomainList.FirstOrDefault();
            var selectedPage = linkForm.MemberSitePageList.FirstOrDefault()?.PageCode ?? string.Empty;
            var bannerSettingKey = userSession.PreferredLanguage.Replace("-", string.Empty).ToUpperInvariant();

            var bannerParam = new MarketingBannerParam
            {
                AffId = userSession.AffId,
                AffCode = userSession.AffCode,
                Language = SystemLanguage.LanguageList.FirstOrDefault(l => l.Code.MatchWith(selectedLanguage))?.EnglishName,
                AffType = userSession.AffType,
                SelectedDomain = selectedDomain,
                SelectedPage = selectedPage,
                TextLinkTemplate = MarketingService.GetTextLinkTemplate(TargetSite.TargetToMember),
                BannerDomain = AppSetting.GetValue($"BannerDomain{bannerSettingKey}") ?? AppSetting.BannerDomain,
                TargetId = TargetSite.TargetToMember,
                DeviceType = 0,
                PageIndex = 1,
                PageSize = 20
            };

            var viewModel = new MarketingViewModel
            {
                SearchForm = searchForm,
                MarketingDataList = GetBannerList(bannerParam)
            };

            ViewBag.TotalItem = bannerParam.Nrows;

            return View("~/Views/UserPanel/AccountOverview/MediaGallery/Index.cshtml", viewModel);
        }

        private ActionResult GetViewForAffiliateSite()
        {
            var userSession = SessionService.UserSession;
            var searchForm = GetSearchFormViewModel(true, TargetSite.TargetToSubAff);
            var linkForm = GetLinkFormViewModel(false);

            var selectedLanguage = userSession.PreferredLanguage;
            var selectedDomain = linkForm.DomainList.FirstOrDefault();
            var selectedPage = linkForm.MemberSitePageList.FirstOrDefault()?.PageCode ?? string.Empty;
            var bannerSettingKey = userSession.PreferredLanguage.Replace("-", string.Empty).ToUpperInvariant();

            var bannerParam = new MarketingBannerParam
            {
                AffId = userSession.AffId,
                AffCode = userSession.AffCode,
                IsSubAffTab = true,
                Language = SystemLanguage.LanguageList.FirstOrDefault(l => l.Code.MatchWith(selectedLanguage))?.EnglishName,
                AffType = userSession.AffType,
                SelectedDomain = selectedDomain,
                SelectedPage = selectedPage,
                TextLinkTemplate = MarketingService.GetTextLinkTemplate(TargetSite.TargetToSubAff),
                BannerDomain = AppSetting.GetValue($"BannerDomain{bannerSettingKey}") ?? AppSetting.BannerDomain,
                TargetId = TargetSite.TargetToSubAff,
                DeviceType = 0,
                PageIndex = 1,
                PageSize = 20
            };

            var viewModel = new MarketingViewModel
            {
                SearchForm = searchForm,
                MarketingDataList = GetBannerList(bannerParam)
            };

            ViewBag.TotalItem = bannerParam.Nrows;

            return View("~/Views/UserPanel/AccountOverview/MediaGallery/Index.cshtml", viewModel);
        }

        private IEnumerable<MarketingItem> GetBannerList(MarketingBannerParam bannerParam)
        {
            if (bannerParam.SelectedDomain == null)
            {
                return new List<MarketingItem>();
            }

            return MarketingService.GetBannerList(bannerParam);
        }
    }
}
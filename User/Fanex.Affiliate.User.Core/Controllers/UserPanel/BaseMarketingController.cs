using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.Enum;
using Fanex.Affiliate.User.Core.Filters;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.Resources;
using Fanex.Affiliate.User.Core.Utilities;
using Fanex.Affiliate.User.Core.ViewModels.UserPanel.Marketing;

namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    [CustomAuthorize]
    public class BaseMarketingController : BaseController
    {
        protected readonly IMarketingService MarketingService;
        protected readonly IAppSetting AppSetting;

        public BaseMarketingController(ISessionService sessionService,
            IAppSetting appSetting,
            ILanguageService languageService,
            IMarketingService marketingService)
            : base(sessionService, languageService)
        {
            MarketingService = marketingService;
            AppSetting = appSetting;
        }
        protected SearchFormViewModel GetSearchFormViewModel(bool isMediaPage, AffiliateLinkType linkType = AffiliateLinkType.AffiliateLink)
        {
            var categoryList = MarketingService.GetCategoryList(isMediaPage, linkType, SessionService.IsInternal).Where(c => string.IsNullOrEmpty(c.SubCategory));
            var languageList = LanguageService.GetLanguageList(SessionService.IsInternal);

            var userSession = SessionService.UserSession;
            var viewModel = new SearchFormViewModel
            {
                CategoryList = categoryList.Select(i => new SelectListItem { Value = i.Category, Text = Lang.ResourceManager.GetString(i.Category.Trim()) ?? i.Category }),
                LanguageList = MarketingHelper.GetLanguageList(languageList, userSession.PreferredLanguage),
                TargetId = (int)linkType
            };

            if (linkType == AffiliateLinkType.AffiliateLink)
            {
                var currencyList = MarketingService.GetCurrencyList(SessionService.IsInternal);
                viewModel.CurrencyList = currencyList
                    .Select(i => new SelectListItem
                    {
                        Value = i.Currency,
                        Text = Lang.ResourceManager.GetString(i.Currency.Trim()) ?? i.Currency
                    });
            }

            if (isMediaPage)
            {
                var sizeList = MarketingService.GetSizeList(new SizeParam
                {
                    AffType = userSession.AffType,
                    Language = userSession.PreferredLanguage
                },
                SessionService.IsInternal);

                viewModel.SizeList = sizeList.Select(i => new SelectListItem { Value = i.Size, Text = i.Size });
            }

            return viewModel;
        }

        protected LinkFormViewModel GetLinkFormViewModel(bool isTargetToMemberSite = true)
        {
            var userSession = SessionService.UserSession;
            var isInternal = SessionService.IsInternal;
            var targetId = isTargetToMemberSite ? AffiliateLinkType.AffiliateLink : AffiliateLinkType.SubAffiliateLink;

            var viewModel = new LinkFormViewModel
            {
                DomainList = MarketingService.GetAvailableDomainList(userSession.AffId, targetId, isInternal),
                MemberSitePageList = MarketingService.GetLandingPageList(isInternal, targetId)
            };

            return viewModel;
        }

        protected IDictionary<string, LanguageLinkViewModel> GetLinkForMemberList(QrCodeParam param)
        {
            var selectedDomain = GetDomain(param.SelectedDomainId, param.SelectedLinkType);

            if (selectedDomain == null)
            {
                return new Dictionary<string, LanguageLinkViewModel>();
            }

            var userSession = SessionService.UserSession;

            var linkGenerationParam = new LinkGeneratingParam
            {
                AffId = userSession.AffId,
                AffCode = userSession.AffCode,
                TextLinkTemplate = AppSetting.TextLinkTemplate,
                PreferredLanguage = userSession.PreferredLanguage,
                SelectedLanguage = param.SelectedLanguage,
                SelectedDomain = selectedDomain,
                SelectedPage = param.SelectedPage,
                SelectedChannel = param.SelectedChannel,
            };

            return MarketingService.GenerateLinkList(linkGenerationParam);
        }

        protected IDictionary<string, LanguageLinkViewModel> GetLinkForSubAffList(QrCodeParam param)
        {
            var selectedDomain = GetDomain(param.SelectedDomainId, param.SelectedLinkType);

            if (selectedDomain == null)
            {
                return new Dictionary<string, LanguageLinkViewModel>();
            }

            var userSession = SessionService.UserSession;

            var linkGenerationParam = new LinkGeneratingParam
            {
                AffId = userSession.AffId,
                AffCode = userSession.AffCode,
                TextLinkTemplate = AppSetting.SubAffTextLinkTemplate,
                PreferredLanguage = userSession.PreferredLanguage,
                SelectedLanguage = param.SelectedLanguage,
                SelectedDomain = selectedDomain,
                SelectedPage = param.SelectedPage,
                SelectedChannel = param.SelectedChannel
            };

            return MarketingService.GenerateLinkList(linkGenerationParam);
        }

        protected RefLinkViewModel GetAffLinkTypeViewModel()
        {
            var affId = SessionService.UserSession.AffId;
            var domains = MarketingService.GetAvailableDomainList(affId, Enum.AffiliateLinkType.AffiliateLink, SessionService.IsInternal);
            var pages = MarketingService.GetLandingPageList(SessionService.IsInternal, Enum.AffiliateLinkType.AffiliateLink);

            return new RefLinkViewModel
            {
                AffLinkType = Enum.AffiliateLinkType.AffiliateLink,
                AffTypeDisplayName = Lang.AffilateLink,
                Domains = domains,
                SitePages = pages
            };
        }

        protected RefLinkViewModel GetSubAffLinkTypeViewModel()
        {
            var affId = SessionService.UserSession.AffId;
            var domains = MarketingService.GetAvailableDomainList(affId, Enum.AffiliateLinkType.SubAffiliateLink, SessionService.IsInternal);
            var pages = MarketingService.GetLandingPageList(SessionService.IsInternal, Enum.AffiliateLinkType.SubAffiliateLink);

            return new RefLinkViewModel
            {
                AffLinkType = Enum.AffiliateLinkType.SubAffiliateLink,
                AffTypeDisplayName = Lang.SubAffiliateLink,
                Domains = domains,
                SitePages = pages
            };
        }

        private Domain GetDomain(int? domainId, AffiliateLinkType linkType)
            => MarketingService
            .GetAvailableDomainList(SessionService.UserSession.AffId, linkType, SessionService.IsInternal)
            .FirstOrDefault(d => d.DomainId == domainId);


    }
}

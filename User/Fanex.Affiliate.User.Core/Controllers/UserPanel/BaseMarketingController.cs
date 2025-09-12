using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.DTO;
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

        protected IDictionary<string, LanguageLinkViewModel> GetLinkForMemberList(QrCodeParam param)
            => GetLinkList(param, AppSetting.TextLinkTemplate);

        protected IDictionary<string, LanguageLinkViewModel> GetLinkForSubAffList(QrCodeParam param)
            => GetLinkList(param, AppSetting.SubAffTextLinkTemplate);

        private IDictionary<string, LanguageLinkViewModel> GetLinkList(QrCodeParam param, string textLinkTemplate)
        {
            var selectedDomain = GetDomain(param.SelectedDomainId, param.SelectedTargetCountry, param.SelectedLinkType);

            if (selectedDomain == null)
            {
                return new Dictionary<string, LanguageLinkViewModel>();
            }

            var userSession = SessionService.UserSession;

            var linkGenerationParam = new LinkGeneratingParam
            {
                AffId = userSession.AffId,
                AffCode = userSession.AffCode,
                TextLinkTemplate = textLinkTemplate,
                PreferredLanguage = userSession.PreferredLanguage,
                SelectedLanguage = param.SelectedLanguage,
                SelectedDomain = selectedDomain,
                SelectedPage = param.SelectedPage,
                SelectedChannel = param.SelectedChannel,
                SelectedTargetCountry = param.SelectedTargetCountry
            };

            return MarketingService.GenerateLinkList(linkGenerationParam);
        }

        private CommonSearchFormViewModel BuildCommonData(
            MarketingFilterParam param,
            bool isDefaultLoading = false)
        {
            var isInternal = SessionService.IsInternal;

            var targetCountries = isDefaultLoading
                ? LanguageService.GetSystemTargetCountries()
                : Enumerable.Empty<TargetCountry>();

            if (string.IsNullOrEmpty(param.TargetCountryCode))
            {
                param.TargetCountryCode = targetCountries.First()?.TargetCountryCode;
            }

            var targetLanguages = param.IsChangeAffTypeLink
                ? Enumerable.Empty<Language>()
                : LanguageService.GetLanguageByTargetCountry(param.TargetCountryCode);

            var languageCode = GetTargetLanguageCode(param.IsChangeAffTypeLink, param.Language, targetLanguages);
            param.Language = languageCode;

            if (param.IsMediaGallery && (isDefaultLoading || param.IsChangeAffTypeLink))
            {
                param.Category = null;
                param.SubCategory = null;
            }

            var categoryList = GetCategoryList(param, isDefaultLoading, isInternal);
            var sizeList = GetSizeList(param, isInternal);
            var domains = GetDomainListByTargetCountry(param.TargetCountryCode, param.TargetId);
            var selectedDomain = domains.FirstOrDefault(d => d.DomainId == param.DomainId)
                                 ?? domains.FirstOrDefault();

            var pages = MarketingService.GetLandingPageList(new LandingPageParam
            {
                IsInternal = isInternal,
                IsMember = param.TargetId == AffiliateLinkType.AffiliateLink,
                TargetCountryCode = param.TargetCountryCode
            });

            return new CommonSearchFormViewModel
            {
                TargetCountries = SystemHelper.GetTargetCountryList(targetCountries, param.TargetCountryCode),
                Languages = SystemHelper.GetTargetLanguageList(targetLanguages, languageCode),
                Domains = SystemHelper.GetDomainList(domains, selectedDomain?.DomainId),
                SitePages = SystemHelper.GetPageList(pages),
                CategoryList = categoryList,
                SizeList = sizeList
            };
        }

        private static string GetTargetLanguageCode(bool isChangeAffTypeLink, string currentLang, IEnumerable<Language> targetLanguages)
        {
            return isChangeAffTypeLink
                ? currentLang
                : targetLanguages.FirstOrDefault()?.Code ?? SystemLanguage.DefaultLanguageCode;
        }

        private IEnumerable<SelectListItem> GetCategoryList(MarketingFilterParam param, bool isDefaultLoading, bool isInternal)
        {
            if (param.IsMediaGallery && (isDefaultLoading || param.IsChangeAffTypeLink))
            {
                return MarketingService.GetCategoryList(true, param.TargetId, isInternal)
                    .Where(c => string.IsNullOrEmpty(c.SubCategory))
                    .Select(c => new SelectListItem
                    {
                        Value = c.Category,
                        Text = Lang.ResourceManager.GetString(RegexHelper.Replace(c.Category, @"\s+", "")) ?? c.Category
                    });
            }

            return Enumerable.Empty<SelectListItem>();
        }

        private IEnumerable<SelectListItem> GetSizeList(MarketingFilterParam param, bool isInternal)
        {
            if (!param.IsMediaGallery)
            {
                return Enumerable.Empty<SelectListItem>();
            }

            var sizeParam = new SizeParam
            {
                Category = param.Category,
                SubCategory = param.SubCategory,
                Language = param.Language,
                Currency = param.Currency,
                ImageType = param.ImageType,
                DeviceType = param.DeviceType,
                AffType = param.AffType,
                TargetId = param.TargetId,
                TargetCountryCode = param.TargetCountryCode
            };

            return MarketingService.GetSizeList(sizeParam, isInternal)
                .Select(i => new SelectListItem { Value = i.Size, Text = i.Size });
        }

        protected CommonSearchFormViewModel GetLinkFormViewModel(
            string targetCountryCode,
            bool isMediaGallery = false,
            AffiliateLinkType linkType = AffiliateLinkType.AffiliateLink)
        {
            var linkTypes = new List<SelectListItem>
            {
                new SelectListItem
                {
                    Value = linkType.ToString(),
                    Text = linkType == AffiliateLinkType.AffiliateLink ? Lang.AffilateLink : Lang.SubAffiliateLink
                }
            };

            var param = new MarketingFilterParam
            {
                TargetCountryCode = targetCountryCode,
                TargetId = linkType,
                IsMediaGallery = isMediaGallery
            };

            var commonData = BuildCommonData(param, true);

            return new CommonSearchFormViewModel
            {
                LinkTypes = linkTypes,
                TargetCountries = commonData.TargetCountries,
                Languages = commonData.Languages,
                Domains = commonData.Domains,
                SitePages = commonData.SitePages,
                CategoryList = commonData.CategoryList,
                SizeList = commonData.SizeList
            };
        }

        protected ChangedFilterFormViewModel GetChangedFilter(MarketingFilterParam param)
        {
            var commonData = BuildCommonData(param);

            return new ChangedFilterFormViewModel
            {
                Domains = commonData.Domains,
                SitePages = commonData.SitePages,
                Languages = commonData.Languages,
                CategoryList = commonData.CategoryList,
                SizeList = commonData.SizeList
            };
        }

        protected Domain GetDomain(int? domainId, string targetCountryCode, AffiliateLinkType linkType)
            => GetDomainListByTargetCountry(targetCountryCode, linkType)
                .FirstOrDefault(d => d.DomainId == domainId);

        private IEnumerable<Domain> GetDomainListByTargetCountry(string targetCountryCode, AffiliateLinkType linkType = AffiliateLinkType.AffiliateLink)
        {
            var userSession = SessionService.UserSession;
            var isInternal = SessionService.IsInternal;

            var param = new AvailableDomainParam
            {
                TargetCountryCode = targetCountryCode,
                AffId = userSession.AffId,
                IsMember = linkType == AffiliateLinkType.AffiliateLink,
                IsInternal = isInternal
            };

            return MarketingService.GetAvailableDomainList(param);
        }
    }
}

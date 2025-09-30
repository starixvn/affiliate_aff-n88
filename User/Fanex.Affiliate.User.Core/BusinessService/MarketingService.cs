using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.DTO.UserPanel.MediaGallery;
using Fanex.Affiliate.User.Core.Enum;
using Fanex.Affiliate.User.Core.Extensions;
using Fanex.Affiliate.User.Core.MetalModels;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.Repository.UserPanel;
using Fanex.Affiliate.User.Core.Resources;
using Fanex.Affiliate.User.Core.Utilities;
using Fanex.Affiliate.User.Core.ViewModels.UserPanel.Marketing;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public class MarketingService : IMarketingService
    {
        private readonly IMarketingRepository _marketingRepository;
        private readonly IMemoryCacheService _cacheService;
        private readonly IAppSetting _appSetting;
        private readonly ILanguageService _languageService;


        private const int AffiliateLink = 1;
        private const int MediaGallery = 2;

        public MarketingService(IMarketingRepository marketingRepository, IMemoryCacheService cacheService, IAppSetting appSetting, ILanguageService languageService)
        {
            _marketingRepository = marketingRepository;
            _cacheService = cacheService;
            _appSetting = appSetting;
            _languageService = languageService;
        }

        public void TrackingAffMarketingLink(int affId, IDictionary<string, QrCodeLinkViewModel> qrCodeLinks, QrCodeParam param)
        {
            var affMediaLinks = GetAffMarketingLinks(affId, param.SelectedChannel);
            var shouldTrackingAffLinks = qrCodeLinks.Values;

            if (affMediaLinks != null)
            {
                shouldTrackingAffLinks = new List<QrCodeLinkViewModel>();

                foreach (var item in qrCodeLinks.Values)
                {
                    var affLink = affMediaLinks.FirstOrDefault(l => l.AffMediaLink.Equals(item.Link, StringComparison.OrdinalIgnoreCase));

                    if (affLink is null)
                    {
                        item.IsShow = true;
                        shouldTrackingAffLinks.Add(item);
                    }
                    else
                    {
                        item.IsShow = affLink.IsShow;
                    }
                }
            }

            foreach (var item in shouldTrackingAffLinks)
            {
                var trackingParam = new MarketingLinkParam
                {
                    AffId = affId,
                    AffMediaLink = item.Link,
                    ChannelCode = param.SelectedChannel,
                    LanguageCode = item.Language.Code,
                    IsOn = item.IsShow
                };

                ToggleMarketingLink(trackingParam);
            }
        }

        public IEnumerable<CategoryType> GetCategoryList(bool isMediaPage, AffiliateLinkType linkType, bool isInternal = false)
        {
            var cacheKey = isMediaPage ? CacheKey.BannerCategoryList : CacheKey.TextCategoryList;
            cacheKey = $"{cacheKey}-{linkType}";

            var categoryList = _cacheService.Get<IEnumerable<CategoryType>>(cacheKey);
            if (categoryList == null)
            {
                var mediaType = isMediaPage ? AffiliateLink : MediaGallery;
                var target = linkType;
                var param = new MediaCategoryParam
                {
                    TargetId = (int)target,
                    TypeId = mediaType
                };
                categoryList = _marketingRepository.GetCategoryList(param, isInternal);

                _cacheService.Set(cacheKey, categoryList);
            }

            return categoryList ?? new List<CategoryType>();
        }

        public IEnumerable<CurrencyType> GetCurrencyList(bool isInternal)
        {
            var currencyList = _cacheService.Get<IEnumerable<CurrencyType>>(CacheKey.CurrencyList);

            if (currencyList == null)
            {
                currencyList = _marketingRepository.GetCurrencyList(isInternal);
                _cacheService.Set(CacheKey.CurrencyList, currencyList);
            }

            return currencyList ?? new List<CurrencyType>();
        }

        public IEnumerable<SizeType> GetSizeList(SizeParam param, bool isInternal = false)
        {
            param.Language = ConvertSelectedLanguageNames(param.TargetCountryCode, param.Language);
            return _marketingRepository.GetSizeList(param, isInternal);
        }

        public IEnumerable<BannerType> GetBannerTypeList(bool isInternal = false)
        {
            var bannerTypeList = _cacheService.Get<IEnumerable<BannerType>>(CacheKey.BannerTypeList);

            if (bannerTypeList == null)
            {
                bannerTypeList = _marketingRepository.GetBannerTypeList(isInternal);
                _cacheService.Set(CacheKey.BannerTypeList, bannerTypeList);
            }

            return bannerTypeList ?? new List<BannerType>();
        }

        public IEnumerable<Domain> GetAvailableDomainList(AvailableDomainParam param)
        {
            var domains = _marketingRepository.GetAvailableDomainList(param);

            return domains ?? new List<Domain>();
        }

        public IDictionary<string, LanguageLinkViewModel> GenerateLinkList(LinkGeneratingParam linkGeneratedParam)
        {
            var languages = GetLanguageUsedForGeneration(linkGeneratedParam);
            return GenerateLink(languages, linkGeneratedParam);
        }

        public IEnumerable<MarketingItem> GetBannerList(MarketingBannerParam bannerParam)
        {
            const int LengthOfSplittingSize = 2;
            bannerParam.Language = ConvertSelectedLanguageNames(bannerParam.SelectedTargetCountry, bannerParam.Language);

            var bannerList = _marketingRepository.GetBannerList(bannerParam);
            foreach (var banner in bannerList)
            {
                banner.FileName = bannerParam.BannerDomain + banner.FileName;
                banner.SelectedDomainName = bannerParam.SelectedDomain.DomainName;

                var sizes = banner.Size.Split('x');
                if (sizes.Count() == LengthOfSplittingSize)
                {
                    banner.Width = Convert.ToInt32(sizes[0]);
                    banner.Height = Convert.ToInt32(sizes[1]);
                }

                var language = _languageService.GetLanguageList().FirstOrDefault(l => l.EnglishName.MatchWith(banner.Language));

                if (language != null)
                {
                    banner.RedirectLink = GenerateLink(bannerParam, language.ShortedCode);
                }

            }

            return bannerList;
        }

        public IEnumerable<MarketingItem> GetTextList(MarketingTextParam textParam)
        {
            var textList = _marketingRepository.GetTextList(textParam);

            foreach (var text in textList)
            {
                text.Message = HttpContext.Current.Server.HtmlDecode(text.Message.Replace("\r\n", "<br/>").Replace("\n", "<br/>"));
                text.ScriptSrc = $"{textParam.ScriptUrl}?textId={text.TextId}&targetId={textParam.TargetId}";
                var language = _languageService.GetLanguageList().FirstOrDefault(l => l.EnglishName.MatchWith(text.Language));

                if (language != null)
                {
                    text.RedirectLink = GenerateLink(textParam, language.ShortedCode);
                }

            }

            return textList;
        }

        public IEnumerable<LandingPage> GetLandingPageList(LandingPageParam param)
        {
            return param.IsMember
                ? _marketingRepository.GetLandingPageList(param)
                : GetSubAffLandingPages();
        }

        public string GetTextLinkTemplate(AffiliateLinkType linkType)
        {
            switch (linkType)
            {
                case AffiliateLinkType.AffiliateLink:
                    return _appSetting.TextLinkTemplate;
                case AffiliateLinkType.SubAffiliateLink:
                    return _appSetting.SubAffTextLinkTemplate;
                default:
                    return _appSetting.TextLinkTemplate;
            }
        }

        public ResultInfo<MarketingChannel> AddMarketingChannel(int userId, string channelName)
        {
            var channelCode = NormalizeName(channelName);
            var (Code, ErrMsg) = _marketingRepository.AddMarketingChannel(userId, channelCode, channelName);
            var message = GenAddChannelErrMsg(Code);

            return new ResultInfo<MarketingChannel>
            {
                IsOk = Code == 0,
                Message = string.IsNullOrWhiteSpace(message) ? ErrMsg : message,
                Data = new MarketingChannel { ChannelCode = channelCode, ChannelName = channelName }
            };
        }

        public IDictionary<string, string> GetChannels(int userId)
            => _marketingRepository.GetMarketingChannels(userId).ToDictionary(c => c.ChannelCode, c => c.ChannelName);


        public ResultInfo ToggleMarketingLink(MarketingLinkParam param)
        {
            var (Code, ErrMsg) = _marketingRepository.ToggleMarketingLink(param);
            var message = GenToggleErrMsg(Code);

            return new ResultInfo
            {
                IsOk = Code == 0,
                Message = string.IsNullOrWhiteSpace(message) ? ErrMsg : message
            };
        }

        private IEnumerable<MarketingChannelLink> GetAffMarketingLinks(int userId, string channelCode)
            => _marketingRepository.GetAffMarketingLinks(userId, channelCode);

        public IEnumerable<IGrouping<string, MarketingChannelLink>> GetUsingMarketingLinks(int userId)
            => _marketingRepository.GetUsingMarketingLink(userId).GroupBy(c => c.ChannelCode);

        private string ConvertSelectedLanguageNames(string targetCountryCode, string languageCode)
        {
            var targetCountryLanguages = _languageService.GetLanguageByTargetCountry(targetCountryCode);
            if (string.IsNullOrEmpty(languageCode))
            {
                var allLanguageName = targetCountryLanguages.Select(l => l.EnglishName).ToList();
                return string.Join(",", allLanguageName);
            }

            return targetCountryLanguages.FirstOrDefault(l => l.Code.MatchWith(languageCode))?.EnglishName;
        }

        private Dictionary<string, Language> GetLanguageUsedForGeneration(LinkGeneratingParam linkGeneratedParam)
        {
            var result = new Dictionary<string, Language>();
            var languageList = _languageService.GetLanguageByTargetCountry(linkGeneratedParam.SelectedTargetCountry);

            if (string.IsNullOrEmpty(linkGeneratedParam.SelectedLanguage))
            {
                foreach (var language in languageList)
                {
                    result.Add(language.Code, language);
                }
            }
            else
            {
                var language = languageList.FirstOrDefault(l => l.Code.MatchWith(linkGeneratedParam.SelectedLanguage));
                if (language != null)
                {
                    result.Add(language.Code, language);
                }
            }

            return result;
        }

        private static IDictionary<string, LanguageLinkViewModel> GenerateLink(Dictionary<string, Language> languages, LinkGeneratingParam param)
        {
            var linkDics = new Dictionary<string, LanguageLinkViewModel>();

            foreach (var item in languages)
            {
                var lang = item.Value;
                var linkViewModel = new LanguageLinkViewModel
                {
                    Language = lang,
                    Link = GenerateLink(param, lang.ShortedCode)
                };

                linkDics.Add(lang.NativeName, linkViewModel);
            }

            return linkDics;
        }

        private static string GenerateLink(LinkBaseParam linkParam, string shortedLanguageCode)
        {
            var selectedDomain = linkParam.SelectedDomain;
            var template = linkParam.TextLinkTemplate;
            var scheme = selectedDomain.IsSsl ? Uri.UriSchemeHttps : Uri.UriSchemeHttp;

            var result = template.Replace("{scheme}", scheme)
                                .Replace("{domain}", selectedDomain.DomainName)
                                .Replace("{custid}", linkParam.AffCode.ToString())
                                .Replace("{target}", HttpUtility.UrlPathEncode(linkParam.SelectedPage))
                                .Replace("{lang}", shortedLanguageCode)
                                .Replace("{channel}", linkParam.SelectedChannel);

            return result;
        }

        private static IEnumerable<LandingPage> GetSubAffLandingPages()
        {
            return new List<LandingPage>
            {
                new LandingPage{PageCode = "Signup", PageName="SignUp"}
            };
        }

        private static string GenAddChannelErrMsg(int code)
        {
            switch (code)
            {
                case ErrCodes.OneHundredOne:
                    return Error.ErrInValidAff;
                case ErrCodes.OneHundredTwo:
                    return Error.ErrChannelExisted;
                case ErrCodes.OneHundredThree:
                    return Error.ErrInternalError;
                default:
                    return string.Empty;
            }
        }


        private static string GenToggleErrMsg(int code)
        {
            switch (code)
            {
                case ErrCodes.OneHundredOne:
                    return Error.ErrInValidAff;
                case ErrCodes.OneHundredTwo:
                    return Error.ErrInternalError;
                default:
                    return string.Empty;
            }
        }

        private static string NormalizeName(string channelName)
        {
            return channelName.ToLowerInvariant();
        }
    }
}
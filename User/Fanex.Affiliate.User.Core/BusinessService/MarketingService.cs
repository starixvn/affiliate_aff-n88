using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.Extensions;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.Repository.UserPanel;
using Fanex.Affiliate.User.Core.DTO.UserPanel.MediaGallery;
using Fanex.Affiliate.User.Core.Utilities;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.ViewModels.UserPanel.Marketing;
using Fanex.Affiliate.User.Core.MetalModels;
using Fanex.Affiliate.User.Core.Enum;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public class MarketingService : IMarketingService
    {
        private readonly IMarketingRepository _marketingRepository;
        private readonly IMemoryCacheService _cacheService;
        private readonly IAppSetting _appSetting;


        private const int AffiliateLink = 1;
        private const int MediaGallery = 2;


        public MarketingService(IMarketingRepository marketingRepository, IMemoryCacheService cacheService, IAppSetting appSetting)
        {
            _marketingRepository = marketingRepository;
            _cacheService = cacheService;
            _appSetting = appSetting;
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
            }

            if (currencyList != null)
            {
                _cacheService.Set(CacheKey.CurrencyList, currencyList);
            }

            return currencyList ?? new List<CurrencyType>();
        }

        public IEnumerable<SizeType> GetSizeList(SizeParam param, bool isInternal = false)
        {
            return _marketingRepository.GetSizeList(param, isInternal);
        }

        public IEnumerable<BannerType> GetBannerTypeList(bool isInternal = false)
        {
            var bannerTypeList = _cacheService.Get<IEnumerable<BannerType>>(CacheKey.BannerTypeList);
            if (bannerTypeList == null)
            {
                bannerTypeList = _marketingRepository.GetBannerTypeList(isInternal);
            }

            if (bannerTypeList != null)
            {
                _cacheService.Set(CacheKey.BannerTypeList, bannerTypeList);
            }

            return bannerTypeList ?? new List<BannerType>();
        }

        public IEnumerable<Domain> GetAvailableDomainList(int affId, AffiliateLinkType linkType, bool isInternal = false)
        {
            var isMember = linkType == AffiliateLinkType.AffiliateLink;
            var cachKey = isMember ? CacheKey.DomainList : CacheKey.SubDomainList;

            var domainList = _cacheService.Get<IEnumerable<Domain>>(cachKey);

            if (domainList == null)
            {
                domainList = _marketingRepository.GetAvailableDomainList(affId, isMember, isInternal);
            }

            if (domainList != null)
            {
                _cacheService.Set(cachKey, domainList, Number.Ten);
            }

            return domainList ?? new List<Domain>();
        }

        public IDictionary<string, LanguageLinkViewModel> GenerateLinkList(LinkGeneratingParam linkGeneratedParam)
        {
            var languages = GetLanguageUsedForGeneration(linkGeneratedParam);
            return GenerateLink(languages, linkGeneratedParam);
        }

        public IEnumerable<MarketingItem> GetBannerList(MarketingBannerParam bannerParam)
        {
            const int LengthOfSplittingSize = 2;
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

                var language = SystemLanguage.LanguageList.FirstOrDefault(l => l.EnglishName.MatchWith(banner.Language));

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
                text.Message = HttpContext.Current.Server.HtmlDecode(text.Message.Replace("\r\n", "<br/>").Replace("\n","<br/>"));
                text.ScriptSrc = $"{textParam.ScriptUrl}?textId={text.TextId}&targetId={textParam.TargetId}";
                var language = SystemLanguage.LanguageList.FirstOrDefault(l => l.EnglishName.MatchWith(text.Language));

                if (language != null)
                {
                    text.RedirectLink = GenerateLink(textParam, language.ShortedCode);
                }

            }

            return textList;
        }

        public IEnumerable<LandingPage> GetLandingPageList(bool isInternal = false, AffiliateLinkType linkType = AffiliateLinkType.AffiliateLink)
        {
            var isTargetToMember = linkType == AffiliateLinkType.AffiliateLink;
            return isTargetToMember
                ? _marketingRepository.GetLandingPageList(isInternal)
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
            var result =  _marketingRepository.AddMarketingChannel(userId, channelCode, channelName);

            return new ResultInfo<MarketingChannel>()
            {
                IsOk = result.Code == 0,
                Message = result.ErrMsg,
                Data = new MarketingChannel { ChannelCode = channelCode, ChannelName = channelName }
            };
        }

        public IDictionary<string, string> GetChannels(int userId)
            => _marketingRepository.GetMarketingChannels(userId).ToDictionary(c => c.ChannelCode, c => c.ChannelName);


        public ResultInfo ToggleMarketingLink(MarketingLinkParam param)
        {
            var result = _marketingRepository.ToggleMarketingLink(param);

            return new ResultInfo
            {
                IsOk = result.Code == 0,
                Message = result.ErrMsg
            };
        }

        public IEnumerable<IGrouping<string, MarketingChannelLink>> GetUsingMarketingLinks(int userId)
            => _marketingRepository.GetUsingMarketingLink(userId).GroupBy(c => c.ChannelCode);

        private static Dictionary<string, Language> GetLanguageUsedForGeneration(LinkGeneratingParam linkGeneratedParam)
        {
            var result = new Dictionary<string, Language>();

            if (string.IsNullOrEmpty(linkGeneratedParam.SelectedLanguage))
            {
                foreach (var language in SystemLanguage.LanguageList)
                {
                    result.Add(language.Code, language);
                }
            }
            else
            {
                var language = SystemLanguage.LanguageList.FirstOrDefault(l => l.Code.MatchWith(linkGeneratedParam.SelectedLanguage));
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

        private IEnumerable<LandingPage> GetSubAffLandingPages()
        {
            return new List<LandingPage>
            {
                new LandingPage{PageCode = "Signup", PageName="SignUp"}
            };
        }

        private string NormalizeName(string channelName)
        {
            return channelName.Replace(" ", String.Empty).ToLowerInvariant();
        }
    }
}
using System.Collections.Generic;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.DTO.UserPanel.MediaGallery;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public interface IMarketingService
    {
        IEnumerable<CategoryType> GetCategoryList(bool isMediaPage, bool isForSubAffiliate = false, bool isInternal = false);

        IEnumerable<LanguageType> GetLanguageList(bool isInternal);

        IEnumerable<CurrencyType> GetCurrencyList(bool isInternal);

        IEnumerable<BannerType> GetBannerTypeList(bool isInternal = false);

        IEnumerable<SizeType> GetSizeList(SizeParam param, bool isInternal = false);

        IEnumerable<Domain> GetDomainList(int affId, bool isInternal = false);

        IDictionary<string, string> GenerateLinkList(LinkGenerationParam linkGenerationParam);

        IEnumerable<MarketingItem> GetBannerList(MarketingBannerParam bannerParam);

        IEnumerable<MarketingItem> GetTextList(MarketingTextParam textParam);

        IEnumerable<LandingPage> GetLandingPageList(bool isInternal = false);
    }
}

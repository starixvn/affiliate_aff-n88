using System.Collections.Generic;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.DTO.UserPanel.MediaGallery;
using Fanex.Affiliate.User.Core.Constants;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public interface IMarketingService
    {
        IEnumerable<CategoryType> GetCategoryList(bool isMediaPage, int targetId = TargetSite.TargetToMember, bool isInternal = false);

        IEnumerable<LanguageType> GetLanguageList(bool isInternal);

        IEnumerable<CurrencyType> GetCurrencyList(bool isInternal);

        IEnumerable<BannerType> GetBannerTypeList(bool isInternal = false);

        IEnumerable<SizeType> GetSizeList(SizeParam param, bool isInternal = false);

        IEnumerable<Domain> GetDomainList(int affId, bool isInternal = false, bool isTargetToMember = true);

        IDictionary<string, string> GenerateLinkList(LinkGenerationParam linkGenerationParam);

        IEnumerable<MarketingItem> GetBannerList(MarketingBannerParam bannerParam);

        IEnumerable<MarketingItem> GetTextList(MarketingTextParam textParam);

        IEnumerable<LandingPage> GetLandingPageList(bool isInternal = false, bool isTargetToMember = true);

        string GetTextLinkTemplate(int targetId);
    }
}

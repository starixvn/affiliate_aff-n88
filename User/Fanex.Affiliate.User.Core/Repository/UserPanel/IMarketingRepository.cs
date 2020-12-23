using System.Collections.Generic;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.DTO.UserPanel.MediaGallery;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.MetalModels;

namespace Fanex.Affiliate.User.Core.Repository.UserPanel
{
    public interface IMarketingRepository
    {
        IEnumerable<CategoryType> GetCategoryList(MediaCategoryParam param, bool isInternal);

        IEnumerable<CurrencyType> GetCurrencyList(bool isInternal);

        IEnumerable<BannerType> GetBannerTypeList(bool isInternal);

        IEnumerable<SizeType> GetSizeList(SizeParam param, bool isInternal);

        IEnumerable<Domain> GetAvailableDomainList(int affId, bool isMember, bool isInternal);

        IEnumerable<MarketingItem> GetBannerList(MarketingBannerParam bannerParam);

        IEnumerable<MarketingItem> GetTextList(MarketingTextParam textParam);

        IEnumerable<LandingPage> GetLandingPageList(bool isInternal);

        (int Code, string ErrMsg) AddMarketingChannel(int userId, string channelCode, string channelName);

        IEnumerable<MarketingChannel> GetMarketingChannels(int userId);

        (int Code, string ErrMsg) MarkLinkIsTrackedByChannel(MarketingLinkParam param);

        IEnumerable<MarketingChannelLink> GetUsedMarketingLink(int userId);
    }
}

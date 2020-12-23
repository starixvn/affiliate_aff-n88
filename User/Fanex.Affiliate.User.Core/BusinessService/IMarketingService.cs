using System.Collections.Generic;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.DTO.UserPanel.MediaGallery;
using Fanex.Affiliate.User.Core.ViewModels.UserPanel.Marketing;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.MetalModels;
using System.Linq;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public interface IMarketingService
    {
        IEnumerable<CategoryType> GetCategoryList(bool isMediaPage, int targetId, bool isInternal = false);

        IEnumerable<CurrencyType> GetCurrencyList(bool isInternal);

        IEnumerable<BannerType> GetBannerTypeList(bool isInternal = false);

        IEnumerable<SizeType> GetSizeList(SizeParam param, bool isInternal = false);

        IEnumerable<Domain> GetAvailableDomainList(int affId, int targetId, bool isInternal = false);

        IDictionary<string, LanguageLinkViewModel> GenerateLinkList(LinkGenerationParam linkGenerationParam);

        IEnumerable<MarketingItem> GetBannerList(MarketingBannerParam bannerParam);

        IEnumerable<MarketingItem> GetTextList(MarketingTextParam textParam);

        IEnumerable<LandingPage> GetLandingPageList(bool isInternal = false, bool isTargetToMember = true);

        ResultInfo AddMarketingChannel(int userId, string channelName);

        IDictionary<string, string> GetChannels(int userId);

        string GetTextLinkTemplate(int targetId);

        ResultInfo MarkLinkWillUsedInChannel(MarketingLinkParam param);

        IEnumerable<IGrouping<string, MarketingChannelLink>> GetUsedMarketingLinks(int userId);
    }
}

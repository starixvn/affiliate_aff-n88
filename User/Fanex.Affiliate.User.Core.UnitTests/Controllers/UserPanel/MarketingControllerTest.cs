using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.UnitTests.TestHelper;
using Fanex.Affiliate.User.Core.Utilities;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Drawing;
using Xunit;
using Fanex.Affiliate.User.Core.Controllers.UserPanel;
using System.Web.Mvc;
using Fanex.Affiliate.User.Core.ViewModels.UserPanel.Marketing;
using System.IO;
using Fanex.Affiliate.User.Core.Extensions;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.DTO.UserPanel.MediaGallery;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.Enum;

namespace Fanex.Affiliate.User.Core.UnitTests.Controllers.UserPanel
{
    public class MarketingControllerTest
    {
        private readonly ISessionService SessionService;
        private readonly IAppSetting AppSetting;
        private readonly ILanguageService LanguageService;
        private readonly IMarketingService MarketingService;
        private readonly IQrCodeGeneratorService QrCodeService;

        private static IEnumerable<SizeType> SizeTypes => new List<SizeType>
        {
            new SizeType { SizeId = 1, Size = "1080x1920" },
            new SizeType { SizeId = 2, Size = "640x256" },
        };

        private static IEnumerable<MarketingItem> MarketingItems => new List<MarketingItem>
        {
            new MarketingItem {BannerId =1 },
            new MarketingItem {BannerId  = 2 }
        };

        public MarketingControllerTest()
        {
            SessionService = NSubtituteMockingHelper.FakeSessionService();
            AppSetting = Substitute.For<IAppSetting>();
            LanguageService = NSubtituteMockingHelper.FakeLanguageService();
            MarketingService = NSubtituteMockingHelper.FakeMarkengtingService();
            QrCodeService = Substitute.For<IQrCodeGeneratorService>();
        }

        [Theory]
        [InlineData("test")]
        [InlineData("test1")]
        [InlineData("test2")]
        public void GetSubCategory_WhenCall_ReturnCorrectNumberOfSubCategory(string category)
        {
            var subCate = Constant.CategoryList.Where(c => c.Category.MatchWith(category) && !string.IsNullOrEmpty(c.SubCategory));
            var controller = CreateMarketingController();
            var result = controller.GetSubCategory(category, AffiliateLinkType.AffiliateLink) as JsonResult;
            var model = result.Data as IEnumerable<SelectListItem>;
            Assert.Equal(subCate.Count(), model.Count());
            Assert.Equal(JsonRequestBehavior.AllowGet, result.JsonRequestBehavior);
        }

        [Fact]
        public void GetSize_WhenCall_ReturnCorrectJson()
        {
            var controller = CreateMarketingController();
            MarketingService.GetSizeList(Arg.Compat.Any<SizeParam>(), Arg.Compat.Any<bool>())
                .Returns(SizeTypes);
            var param = new SizeParam { Language = Constant.DefaultLanguage };

            var result = controller.GetSize(param) as JsonResult;
            var model = result.Data as IEnumerable<SizeType>;

            Assert.Collection(model, t => Assert.Contains(SizeTypes, s => s.SizeId == t.SizeId), t => Assert.Contains(SizeTypes, s => s.SizeId == t.SizeId));
            Assert.Equal(JsonRequestBehavior.AllowGet, result.JsonRequestBehavior);
        }

        [Fact]
        public void GetSize_WhenCallWithLanguageIsEmpty_ReturnCorrectJson()
        {
            var controller = CreateMarketingController();
            LanguageService.GetLanguageList().Returns(new List<Language>());
            MarketingService.GetSizeList(Arg.Compat.Any<SizeParam>(), Arg.Compat.Any<bool>())
                .Returns(SizeTypes);
            var param = new SizeParam { Language = Constant.DefaultLanguage };

            var result = controller.GetSize(param) as JsonResult;
            var model = result.Data as IEnumerable<SizeType>;

            Assert.Collection(model, t => Assert.Contains(SizeTypes, s => s.SizeId == t.SizeId), t => Assert.Contains(SizeTypes, s => s.SizeId == t.SizeId));
            Assert.Equal(JsonRequestBehavior.AllowGet, result.JsonRequestBehavior);
        }

        [Fact]
        public void GetBanner_WhenCallWithNoSelectedDomain_ReturnEmptyModelItem()
        {
            var controller = CreateMarketingController();
            MarketingService.GetAvailableDomainList(Arg.Compat.Any<int>(), Arg.Any<AffiliateLinkType>(), Arg.Any<bool>()).Returns(new List<Domain>());
            var param = new MarketingBannerParam();

            var result = controller.GetBanner(param) as ViewResult;
            var model = result.Model as IEnumerable<MarketingItem>;

            Assert.Contains("AccountOverview/Partial/_BannerList.cshtml", result.ViewName);
            Assert.Empty(model);
        }

        [Fact]
        public void GetBanner_WhenCall_ReturnCorrectModel()
        {
            var controller = CreateMarketingController();
            var bannerItems = MarketingItems;
            MarketingService.GetBannerList(Arg.Compat.Any<MarketingBannerParam>()).Returns(bannerItems);
            MarketingService.GetAvailableDomainList(Arg.Any<int>(), Arg.Any<AffiliateLinkType>(), Arg.Any<bool>()).Returns(Constant.DomainList);
            var domainId = Constant.DomainList.First().DomainId;
            var param = new MarketingBannerParam { SelectedDomainId = domainId, Language = "vi-VN" };

            var result = controller.GetBanner(param) as ViewResult;
            var model = result.Model as IEnumerable<MarketingItem>;

            Assert.Contains("AccountOverview/Partial/_BannerList.cshtml", result.ViewName);
            Assert.NotEmpty(model);
        }

        private MarketingController CreateMarketingController()
            => new MarketingController(SessionService, AppSetting, LanguageService, MarketingService, QrCodeService);
    }
}

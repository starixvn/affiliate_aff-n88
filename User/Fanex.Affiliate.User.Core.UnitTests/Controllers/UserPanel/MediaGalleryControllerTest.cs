namespace Fanex.Affiliate.User.Core.UnitTests.Controllers.UserPanel
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Core.BusinessService;
    using Core.Controllers.UserPanel;
    using Core.CoreService;
    using Core.Utilities;
    using DTO;
    using DTO.UserPanel.MediaGallery;
    using Enum;
    using MetalModels.UserPanel;
    using NSubstitute;
    using TestHelper;
    using Xunit;

    public class MediaGalleryControllerTest
    {
        private readonly ISessionService sessionService;
        private readonly IAppSetting appSetting;
        private readonly IAccountService accountService;
        private readonly ILanguageService languageService;
        private readonly IMarketingService marketingService;
        private readonly IIpLocationService ipLocationService;

        public MediaGalleryControllerTest()
        {
            sessionService = NSubtituteMockingHelper.FakeSessionService();
            appSetting = Substitute.For<IAppSetting>();
            accountService = Substitute.For<IAccountService>();
            ipLocationService = Substitute.For<IIpLocationService>();
            languageService = NSubtituteMockingHelper.FakeLanguageService();
            marketingService = NSubtituteMockingHelper.FakeMarkengtingService();
        }

        [Theory]
        [InlineData(true)]
        [InlineData(false)]
        public void Index_WhenCall_ReturnCorrectView(bool isMaxSubLevel)
        {
            //Arange
            marketingService.GetChannels(Arg.Any<int>()).Returns(new Dictionary<string, string> { ["Abc"] = "123" });
            marketingService.GetCategoryList(Arg.Any<bool>(), Arg.Any<AffiliateLinkType>(), Arg.Any<bool>()).ReturnsForAnyArgs(Constant.CategoryList);
            marketingService.GetCurrencyList(Arg.Any<bool>()).ReturnsForAnyArgs(isMaxSubLevel ? Constant.CurrencyType : new List<CurrencyType>());
            marketingService.GetSizeList(Arg.Any<SizeParam>(), Arg.Any<bool>()).ReturnsForAnyArgs(Constant.SizeTypes);

            accountService.GetGeneralAffInfo(Arg.Any<int?>(), Arg.Any<string>()).ReturnsForAnyArgs(new GeneralAffInfo { IsMaxSubLevel = isMaxSubLevel });

            var controller = new MediaGalleryController(sessionService, appSetting, languageService, marketingService, accountService, ipLocationService);

            //Action
            var result = controller.Index() as ViewResult;

            //Assert
            Assert.Equal("~/Views/UserPanel/AccountOverview/MediaGallery/Index.cshtml", result.ViewName);
        }
    }
}

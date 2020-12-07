using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.Controllers.UserPanel;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.UnitTests.TestHelper;
using Fanex.Affiliate.User.Core.Utilities;
using NSubstitute;
using System.Collections.Generic;
using System.Web.Mvc;
using Xunit;

namespace Fanex.Affiliate.User.Core.UnitTests.Controllers.UserPanel
{
    public class MediaGalleryControllerTest
    {
        private readonly ISessionService sessionService;
        private readonly IAppSetting appSetting;
        private readonly ILanguageService languageService;
        private readonly IMarketingService marketingService;

        public MediaGalleryControllerTest()
        {
            sessionService = NSubtituteMockingHelper.FakeSessionService();
            appSetting = Substitute.For<IAppSetting>();
            languageService = NSubtituteMockingHelper.FakeLanguageService();
            marketingService = NSubtituteMockingHelper.FakeMarkengtingService();
        }

        [Theory]
        [InlineData(true)]
        [InlineData(false)]
        public void Index_WhenCall_ReturnCorrectView(bool isTargetToMemberSite)
        {
            //Arange
            appSetting.GetValue(Arg.Any<string>()).ReturnsForAnyArgs("abc");
            var controller = new MediaGalleryController(sessionService, appSetting,languageService, marketingService);

            //Action
            var result = controller.Index(isTargetToMemberSite) as ViewResult;

            //Assert
            Assert.Equal("~/Views/UserPanel/AccountOverview/MediaGallery/Index.cshtml", result.ViewName);
        }

        [Theory]
        [InlineData(true)]
        [InlineData(false)]
        public void Index_WhenCallWithLanguageInvalid_ReturnCorrectView(bool isTargetToMemberSite)
        {
            languageService.GetSystemLanguages().Returns(new List<Language>());
            marketingService.GetLandingPageList(Arg.Any<bool>(), Arg.Any<bool>()).Returns(new List<LandingPage>());
            var controller = new MediaGalleryController(sessionService, appSetting, languageService, marketingService);

            var result = controller.Index(isTargetToMemberSite) as ViewResult;

            Assert.Contains("~/Views/UserPanel/AccountOverview/MediaGallery/Index.cshtml", result.ViewName);
        }
    }
}

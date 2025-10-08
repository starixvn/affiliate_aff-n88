namespace Fanex.Affiliate.User.Core.UnitTests.Controllers.UserPanel
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Core.BusinessService;
    using Core.Controllers.UserPanel;
    using Core.CoreService;
    using Core.Utilities;
    using DTO;
    using NSubstitute;
    using TestHelper;
    using Xunit;

    public class AffiliateLinkControllerTest
    {
        private readonly ISessionService sessionService;
        private readonly IAppSetting appSetting;
        private readonly IAccountService accountService;
        private readonly ILanguageService languageService;
        private readonly IMarketingService marketingService;
        private readonly IIpLocationService ipLocationService;

        public AffiliateLinkControllerTest()
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
            //Arrange
            marketingService.GetChannels(Arg.Any<int>()).Returns(new Dictionary<string, string> { ["Abc"] = "123" });
            languageService.GetLanguageList(Arg.Any<bool>()).ReturnsForAnyArgs(Constant.LanguageList);

            accountService.GetGeneralAffInfo(Arg.Any<int?>(), Arg.Any<string>()).ReturnsForAnyArgs(new GeneralAffInfo { IsMaxSubLevel = isMaxSubLevel });


            var controller = new AffiliateLinkController(sessionService, appSetting, languageService, marketingService, accountService, ipLocationService);

            //Action
            var result = controller.Index() as ViewResult;

            //Assert
            Assert.Contains("~/Views/UserPanel/AccountOverview/AffiliateLink/Index.cshtml", result.ViewName);
        }
    }
}

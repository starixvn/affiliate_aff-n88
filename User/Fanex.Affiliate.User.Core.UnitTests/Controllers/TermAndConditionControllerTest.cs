namespace Fanex.Affiliate.User.Core.UnitTests.Controllers
{
    using System.Web.Mvc;
    using Core.BusinessService;
    using Core.Controllers;
    using Core.CoreService;
    using Core.Utilities;
    using NSubstitute;
    using TestHelper;
    using Xunit;

    public class TermAndConditionControllerTest
    {
        private readonly IAppSetting AppSetting;
        private readonly ISessionService SessionService;
        private readonly ILanguageService LanguageService;
        private readonly IIpLocationService IpLocationService;

        public TermAndConditionControllerTest()
        {
            AppSetting = Substitute.For<IAppSetting>();
            IpLocationService = Substitute.For<IIpLocationService>();
            SessionService = NSubtituteMockingHelper.FakeSessionService();
            LanguageService = NSubtituteMockingHelper.FakeLanguageService();
        }

        [Fact]
        public void Index_WhenCall_ReturnCorrectView()
        {
            var controller = CreateController();

            var result = controller.Index() as ViewResult;

            Assert.NotNull(result);
            Assert.Contains("Views/TermAndCondition/Index.cshtml", result.ViewName);
        }

        [Theory]
        [InlineData(null)]
        [InlineData("darkmode")]
        public void Popup_WhenCall_ReturnCorrectView(string mode)
        {
            var controller = CreateController();

            var result = controller.Popup() as ViewResult;

            Assert.NotNull(result);
            Assert.Contains("Views/TermAndCondition/Popup.cshtml", result.ViewName);
        }

        private TermAndConditionController CreateController()
            => new TermAndConditionController(AppSetting, SessionService, LanguageService, IpLocationService);
    }
}

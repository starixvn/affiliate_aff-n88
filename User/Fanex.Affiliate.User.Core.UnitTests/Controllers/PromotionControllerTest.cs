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

    public class PromotionControllerTest
    {
        private readonly IAppSetting AppSetting;
        private readonly ISessionService SessionService;
        private readonly ILanguageService LanguageService;
        private readonly IIpLocationService IpLocationService;

        public PromotionControllerTest()
        {
            AppSetting = Substitute.For<IAppSetting>();
            IpLocationService = Substitute.For<IIpLocationService>();
            SessionService = NSubtituteMockingHelper.FakeSessionService();
            LanguageService = NSubtituteMockingHelper.FakeLanguageService();
        }

        [Fact]
        public void Index_WhenCall_ReturnCorrectView()
        {
            var controller = new PromotionController(AppSetting, SessionService, LanguageService, IpLocationService);
            NSubtituteMockingHelper.FakeController(controller);

            var result = controller.Index() as ViewResult;

            Assert.Contains("~/Views/Promotion/Index.cshtml", result.ViewName);
        }
    }
}

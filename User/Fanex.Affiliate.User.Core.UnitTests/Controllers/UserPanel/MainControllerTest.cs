namespace Fanex.Affiliate.User.Core.UnitTests.Controllers.UserPanel
{
    using System.Web.Mvc;
    using Core.BusinessService;
    using Core.Controllers;
    using Core.CoreService;
    using Core.Utilities;
    using NSubstitute;
    using TestHelper;
    using Xunit;

    public class MainControllerTest
    {
        private readonly IAppSetting AppSetting;
        private readonly ISessionService SessionService;
        private readonly ILanguageService LanguageService;
        private readonly IIpLocationService IpLocationService;

        public MainControllerTest()
        {
            AppSetting = Substitute.For<IAppSetting>();
            IpLocationService = Substitute.For<IIpLocationService>();
            SessionService = NSubtituteMockingHelper.FakeSessionService();
            LanguageService = NSubtituteMockingHelper.FakeLanguageService();
        }

        [Fact]
        public void Index_WhenCall_ReturnCorrecView()
        {
            AppSetting.SiteName.Returns("N88");
            var controller = new MainController(AppSetting, SessionService, LanguageService, IpLocationService);
            var result = controller.Index() as ViewResult;

            Assert.Contains("Main/N88/Index.cshtml", result.ViewName);
        }
    }
}
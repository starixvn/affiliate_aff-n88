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

    public class ProductControllerTest
    {
        private readonly ISessionService SessionService;
        private readonly IAppSetting AppSetting;
        private readonly ILanguageService LanguageService;
        private readonly IIpLocationService IpLocationService;

        public ProductControllerTest()
        {
            AppSetting = Substitute.For<IAppSetting>();
            IpLocationService = Substitute.For<IIpLocationService>();
            SessionService = NSubtituteMockingHelper.FakeSessionService();
            LanguageService = NSubtituteMockingHelper.FakeLanguageService();
        }

        [Fact]
        public void Index_WhenCall_ReturnCorrectView()
        {
            var controller = new ProductController(AppSetting, SessionService, LanguageService, IpLocationService);
            NSubtituteMockingHelper.FakeController(controller);

            var result = controller.Index() as ViewResult;

            Assert.NotNull(result);
            Assert.Contains("/Views/Product/Index.cshtml", result.ViewName);
        }
    }
}

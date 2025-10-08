namespace Fanex.Affiliate.User.Core.UnitTests.Controllers
{
    using System.Web.Mvc;
    using Core.BusinessService;
    using Core.Controllers;
    using Core.CoreService;
    using Core.Utilities;
    using Newtonsoft.Json;
    using NSubstitute;
    using TestHelper;
    using Xunit;

    public class NotifyControllerTest
    {
        private readonly IAppSetting AppSetting;
        private readonly ISessionService SessionService;
        private readonly ILanguageService LanguageService;
        private readonly IIpLocationService IpLocationService;

        public NotifyControllerTest()
        {
            AppSetting = Substitute.For<IAppSetting>();
            IpLocationService = Substitute.For<IIpLocationService>();
            SessionService = NSubtituteMockingHelper.FakeSessionService();
            LanguageService = NSubtituteMockingHelper.FakeLanguageService();
        }

        [Fact]
        public void Error_WhenCall_ReturnCorrectView()
        {
            var controller = CreateController();

            var result = controller.Error() as ViewResult;

            Assert.NotNull(result);
        }

        [Fact]
        public void PageNotFound_WhenCall_ReturnCorrectView()
        {
            var controller = CreateController();

            var result = controller.PageNotFound() as ViewResult;

            Assert.NotNull(result);
        }

        [Fact]
        public void CodeExpired_WhenCall_ReturnIsNotOkResult()
        {
            var controller = CreateController();

            var result = controller.CodeExpired() as JsonResult;

            var returnData = new
            {
                IsOk = false,
                IsExpired = true
            };

            Assert.Equal(JsonConvert.SerializeObject(returnData), JsonConvert.SerializeObject(result.Data));
        }

        private NotifyController CreateController()
            => new NotifyController(AppSetting, SessionService, LanguageService, IpLocationService);
    }
}

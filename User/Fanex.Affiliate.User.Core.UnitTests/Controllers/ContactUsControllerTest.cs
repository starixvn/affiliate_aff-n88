namespace Fanex.Affiliate.User.Core.UnitTests.Controllers
{
    using System.Web;
    using System.Web.Mvc;
    using Core.BusinessService;
    using Core.Controllers;
    using Core.CoreService;
    using Core.Utilities;
    using Moq;
    using TestHelper;
    using Xunit;

    public class ContactUsControllerTest
    {
        [Fact]
        public void Index_WhenCallWithGet_ReturnCorrectView()
        {
            // Arrange
            var controller = CreateController();

            // Action
            var actionResult = controller.Index() as ViewResult;
            var result = actionResult.ViewName;

            // Assert
            Assert.NotEmpty(result);
        }

        private static ContactUsController CreateController(
            ISessionService sessionService = null,
            IAppSetting appSetting = null,
            ILanguageService languageService = null,
            IIpLocationService ipLocationService = null)
        {
            sessionService = sessionService ?? MockingHelper.GetSessionService();
            appSetting = appSetting ?? Mock.Of<IAppSetting>();
            languageService = languageService ?? Mock.Of<ILanguageService>();
            ipLocationService = ipLocationService ?? Mock.Of<IIpLocationService>();

            var controller = new ContactUsController(appSetting, sessionService, languageService, ipLocationService);
            var request = MockingHelper.GetHttpRequest();
            var server = new Mock<HttpServerUtilityBase>();
            server.Setup(s => s.HtmlEncode(It.IsAny<string>())).Returns<string>(s => $"Encoded{s}");

            controller.ControllerContext = Mock.Of<ControllerContext>(ctx =>
                ctx.HttpContext.Request == request &&
                ctx.HttpContext.Server == server.Object &&
                ctx.HttpContext.Session.SessionID == "SessionId"
            );

            return controller;
        }
    }
}

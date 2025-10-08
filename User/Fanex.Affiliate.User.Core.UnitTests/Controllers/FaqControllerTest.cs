namespace Fanex.Affiliate.User.Core.UnitTests.Controllers
{
    using System.Web.Mvc;
    using Core.BusinessService;
    using Core.Controllers;
    using Core.CoreService;
    using Core.Utilities;
    using NSubstitute;
    using Xunit;

    public class FaqControllerTest
    {
        [Fact]
        public void Index_WhenCall_ReturnCorrectView()
        {
            var appSetting = Substitute.For<IAppSetting>();
            var sessionService = Substitute.For<ISessionService>();
            var languageService = Substitute.For<ILanguageService>();
            var ipLocationService = Substitute.For<IIpLocationService>();
            var controller = new FaqController(appSetting, sessionService, languageService, ipLocationService);

            var result = controller.Index() as ViewResult;

            Assert.Contains("Views/Faq/Index.cshtml", result.ViewName);
        }
    }
}

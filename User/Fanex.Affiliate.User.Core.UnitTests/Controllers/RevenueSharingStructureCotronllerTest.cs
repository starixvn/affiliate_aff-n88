namespace Fanex.Affiliate.User.Core.UnitTests.Controllers
{
    using System.Web.Mvc;
    using Core.BusinessService;
    using Core.Controllers;
    using Core.CoreService;
    using Core.Utilities;
    using NSubstitute;
    using Xunit;

    public class RevenueSharingStructureCotronllerTest
    {
        [Fact]
        public void Index_WhenCall_ReturnCorrectView()
        {
            var appSetting = Substitute.For<IAppSetting>();
            appSetting.SiteName.Returns("N88");

            var sessionService = Substitute.For<ISessionService>();
            var languageService = Substitute.For<ILanguageService>();
            var ipLocationService = Substitute.For<IIpLocationService>();
            var controller = new RevenueSharingStructureController(appSetting, sessionService, languageService, ipLocationService);

            var result = controller.Index() as ViewResult;

            Assert.Contains("Views/CommissionStructure/N88/Index.cshtml", result.ViewName);
        }
    }
}

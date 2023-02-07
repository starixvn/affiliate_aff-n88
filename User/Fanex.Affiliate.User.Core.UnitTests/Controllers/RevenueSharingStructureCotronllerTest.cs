using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.Controllers;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.Utilities;
using NSubstitute;
using System.Web.Mvc;
using Xunit;

namespace Fanex.Affiliate.User.Core.UnitTests.Controllers
{
    public class RevenueSharingStructureCotronllerTest
    {
        [Fact]
        public void Index_WhenCall_ReturnCorrectView()
        {
            var appSetting = Substitute.For<IAppSetting>();
            appSetting.SiteName.Returns("N88");

            var sessionService = Substitute.For<ISessionService>();
            var languageService = Substitute.For<ILanguageService>();
            var controller = new RevenueSharingStructureController(appSetting, sessionService, languageService);

            var result = controller.Index() as ViewResult;

            Assert.Contains("Views/CommissionStructure/N88/Index.cshtml", result.ViewName);
        }
    }
}

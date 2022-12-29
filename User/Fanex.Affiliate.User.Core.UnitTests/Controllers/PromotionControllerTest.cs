using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.Controllers;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.UnitTests.TestHelper;
using System.Web.Mvc;
using Xunit;

namespace Fanex.Affiliate.User.Core.UnitTests.Controllers
{
    public class PromotionControllerTest
    {
        private readonly ISessionService SessionService;
        private readonly ILanguageService LanguageService;

        public PromotionControllerTest()
        {
            SessionService = NSubtituteMockingHelper.FakeSessionService();
            LanguageService = NSubtituteMockingHelper.FakeLanguageService();
        }

        [Fact]
        public void Index_WhenCall_ReturnCorrectView()
        {
            var controller = new PromotionController(SessionService, LanguageService);
            NSubtituteMockingHelper.FakeController(controller);

            var result = controller.Index() as ViewResult;
            var model = result.Model as string;

            Assert.Equal(Constant.DefaultLanguage, model);
            Assert.Contains("~/Views/Promotion/Index.cshtml", result.ViewName);
        }

        [Fact]
        public void Index_WhenCallWithN88_ReturnPageNotFoundView()
        {
            var controller = new PromotionController(SessionService, LanguageService);
            NSubtituteMockingHelper.FakeController(controller);

            var result = controller.Index() as RedirectResult;

            Assert.Contains("/Notify/PageNotFound", result.Url);
        }
    }
}

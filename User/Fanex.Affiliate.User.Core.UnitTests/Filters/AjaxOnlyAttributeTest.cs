namespace Fanex.Affiliate.User.Core.UnitTests.Filters
{
    using Core.Controllers;
    using Core.Filters;
    using TestHelper;
    using Xunit;

    public class AjaxOnlyAttributeTest
    {
        [Fact]
        public void IsValidForRequest_WhenCall_ReturnCorrect()
        {
            var controller = NSubtituteMockingHelper.FakeController(new HomeController(null, null, null, null));
            NSubtituteMockingHelper.FakeAjaxRequest(controller.Request);

            var attr = new AjaxOnlyAttribute();

            var isValidForRequest = attr.IsValidForRequest(controller.ControllerContext, null);

            Assert.True(isValidForRequest);
        }
    }
}

using Fanex.Affiliate.User.Core.Controllers;
using Fanex.Affiliate.User.Core.Filters;
using Fanex.Affiliate.User.Core.UnitTests.TestHelper;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Xunit;

namespace Fanex.Affiliate.User.Core.UnitTests.Filters
{
    public class AjaxOnlyAttributeTest
    {
        [Fact]
        public void IsValidForRequest_WhenCall_ReturnCorrect()
        {
            var controller = NSubtituteMockingHelper.FakeController(new HomeController(null, null, null));
            NSubtituteMockingHelper.FakeAjaxRequest(controller.Request);

            var attr = new AjaxOnlyAttribute();

            var isValidForRequest = attr.IsValidForRequest(controller.ControllerContext, null);

            Assert.True(isValidForRequest);
        }
    }
}

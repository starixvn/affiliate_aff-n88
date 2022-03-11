using Fanex.Affiliate.Admin.Core.Controllers;
using Moq;
using ONEbook.UM.Models;
using ONEbook.UM.Services;
using System.Web.Mvc;
using Xunit;

namespace Fanex.Affiliate.Admin.Core.UnitTests.Controllers
{
    public class UnderMaintenanceControllerTest
    {
        [Fact]
        public void Index_WhenCall_RedirectToLogin()
        {
            // Arrange
            var underMaintenanceService = new Mock<IMaintenanceService>();
            underMaintenanceService.Setup(u => u.IsUnderMaintenance()).Returns(false);
            var controller = CreateUnderMaintenanceController(underMaintenanceService.Object);

            // Action
            var viewResult = controller.Index() as RedirectResult;

            // Assert
            Assert.Equal("~/Portal/Login", viewResult.Url);
        }

        [Fact]
        public void Index_WhenCall_ReturnView()
        {
            // Arrange
            var underMaintenanceService = new Mock<IMaintenanceService>();
            underMaintenanceService.Setup(u => u.IsUnderMaintenance()).Returns(true);
            underMaintenanceService.Setup(u => u.GetUnderMaintenanceTime()).Returns(new UnderMaintenanceTime { From = "123", To = "234" });
            var controller = CreateUnderMaintenanceController(underMaintenanceService.Object);

            // Action
            var viewResult = controller.Index() as ViewResult;
            var model = viewResult.Model as UnderMaintenanceTime;

            // Assert
            Assert.Equal("", viewResult.ViewName);
            Assert.Equal("123", model.From);
            Assert.Equal("234", model.To);
        }

        private UnderMaintenanceController CreateUnderMaintenanceController(
            IMaintenanceService maintenanceService = null
            )
        {
            var fakeMaintenanceService = maintenanceService ?? Mock.Of<IMaintenanceService>();

            return new UnderMaintenanceController(fakeMaintenanceService);
        }
    }
}

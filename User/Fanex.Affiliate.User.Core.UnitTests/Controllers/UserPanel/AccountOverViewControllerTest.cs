namespace Fanex.Affiliate.User.Core.UnitTests.Controllers.UserPanel
{
    using System.Web.Mvc;
    using Core.BusinessService;
    using Core.Controllers.UserPanel;
    using Core.Repository.UserPanel;
    using DTO.UserPanel;
    using Moq;
    using Newtonsoft.Json;
    using TestHelper;
    using ViewModels.UserPanel;
    using Xunit;

    public class AccountOverViewControllerTest
    {
        [Fact]
        public void Index_WhenCall_ReturnCorrectView()
        {
            // Arrange
            var expectResult = new AccountOverviewViewModel { IsMaxLevel = false, LastLoginInfo = new LastLoginInfo() };
            var repository = new Mock<IAccountOverviewRepository>();
            repository.Setup(r => r.GetLastLoginInfo(It.IsAny<int>())).Returns(expectResult.LastLoginInfo);
            var controller = new AccountOverviewController(
                MockingHelper.GetSessionService(), 
                Mock.Of<ILanguageService>(), 
                repository.Object, 
                Mock.Of<IIpLocationService>());

            // Action
            var viewResult = controller.Index() as ViewResult;

            // Assert
            Assert.Equal("~/Views/UserPanel/AccountOverView/Index.cshtml", viewResult.ViewName);
            Assert.Equal(JsonConvert.SerializeObject(expectResult), JsonConvert.SerializeObject(viewResult.Model));
        }
    }
}
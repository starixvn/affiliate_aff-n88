namespace Fanex.Affiliate.User.Core.UnitTests.Controllers.UserPanel
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Core.BusinessService;
    using Core.Controllers.UserPanel;
    using Core.CoreService;
    using Core.Repository.UserPanel;
    using Core.Utilities;
    using DTO.UserPanel;
    using MetalModels.UserPanel;
    using Moq;
    using TestHelper;
    using ViewModels.UserPanel;
    using Xunit;

    public class SummaryControllerTest
    {
        private readonly DateTime monthDate = new DateTime(2019, 12, 20);

        [Fact]
        public void Index_WhenCall_ReturnCorrectPartialView()
        {
            // Arrange
            var controller = CreateController();

            // Action
            var partialViewResult = controller.Index() as PartialViewResult;

            // Assert
            Assert.Equal("~/Views/UserPanel/AccountOverView/Summary/Index.cshtml", partialViewResult.ViewName);
        }

        [Fact]
        public void Dashboard_WhenCall_ReturnCorrectPartialView()
        {
            // Arrange
            var expectedResult = new OverviewSummary { ActivePlayers = 123 };
            var accountOverviewRepository = new Mock<IAccountOverviewRepository>();
            accountOverviewRepository.Setup(a => a.GetUserOverviewSummary(It.IsAny<int>(), monthDate)).Returns(expectedResult);
            var controller = CreateController(accountOverviewRepository: accountOverviewRepository.Object);

            // Action
            var partialViewResult = controller.Dashboard(monthDate) as PartialViewResult;
            var result = partialViewResult.Model as OverviewSummary;
            // Assert
            Assert.Equal("~/Views/UserPanel/AccountOverView/Summary/Dashboard.cshtml", partialViewResult.ViewName);
            Assert.Equal(expectedResult, result);
        }

        [Fact]
        public void Overview_WhenCall_ReturnCorrectPartialView()
        {
            // Arrange
            var accountOverviewRepository = new Mock<IAccountOverviewRepository>();
            accountOverviewRepository.Setup(a => a.GetUserOverviewDetailList(It.IsAny<int>(), monthDate)).Returns(new List<OverviewDetail>());
            var controller = CreateController(accountOverviewRepository: accountOverviewRepository.Object);

            // Action
            var partialViewResult = controller.Overview(monthDate) as PartialViewResult;
            var result = partialViewResult.Model as IEnumerable<OverviewDetail>;
            // Assert
            Assert.Equal("~/Views/UserPanel/AccountOverView/Summary/Overview.cshtml", partialViewResult.ViewName);
            Assert.Single(result);
        }

        [Fact]
        public void PlayersDetails_WhenCall_ReturnCorrectPartialView()
        {
            // Arrange
            var param = new PlayerDetailParam { MonthDate = monthDate, IsSortAsc = true };
            PlayerDetailParam passedParam = null;
            var accountOverviewRepository = new Mock<IAccountOverviewRepository>();
            accountOverviewRepository.Setup(a => a.GetPlayerDetailList(param)).Returns(new List<PlayerDetail> { new PlayerDetail() }).Callback<PlayerDetailParam>(p => passedParam = p);
            var controller = CreateController(accountOverviewRepository: accountOverviewRepository.Object);

            // Action
            var partialViewResult = controller.PlayersDetails(param) as PartialViewResult;
            var result = partialViewResult.Model as PlayerDetailViewModel;

            // Assert
            Assert.Equal("~/Views/UserPanel/AccountOverView/Summary/PlayersDetails.cshtml", partialViewResult.ViewName);
            Assert.Equal(param.MonthDate, passedParam.MonthDate);
            Assert.Single(result.PlayerDetailList);
        }

        [Fact]
        public void PlayersDetailsContent_WhenCall_ReturnCorrectPartialView()
        {
            // Arrange
            var param = new PlayerDetailParam { MonthDate = monthDate };
            PlayerDetailParam passedParam = null;
            var accountOverviewRepository = new Mock<IAccountOverviewRepository>();
            accountOverviewRepository.Setup(a => a.GetPlayerDetailList(param)).Returns(new List<PlayerDetail> { new PlayerDetail() }).Callback<PlayerDetailParam>(p => passedParam = p);
            var controller = CreateController(accountOverviewRepository: accountOverviewRepository.Object);

            // Action
            var partialViewResult = controller.PlayersDetailsContent(param) as PartialViewResult;
            var result = partialViewResult.Model as PlayerDetailViewModel;

            // Assert
            Assert.Equal("~/Views/UserPanel/AccountOverView/Summary/PlayersDetailsContent.cshtml", partialViewResult.ViewName);
            Assert.Equal(param.MonthDate, passedParam.MonthDate);
            Assert.Single(result.PlayerDetailList);
        }

        [Fact]
        public void SubAffDetails_WhenCall_ReturnCorrectPartialView()
        {
            // Arrange
            var accountOverviewRepository = new Mock<IAccountOverviewRepository>();
            accountOverviewRepository.Setup(a => a.GetSubAffDetails(It.IsAny<SubAffDetailParam>())).Returns(new List<SubAffDetail> { new SubAffDetail() });
            var controller = CreateController(accountOverviewRepository: accountOverviewRepository.Object);

            // Action
            var partialViewResult = controller.SubAffDetails(new SubAffDetailParam { MonthDate = new DateTime(2020, 12, 01) }) as PartialViewResult;
            var result = partialViewResult.Model as List<SubAffDetail>;
            // Assert
            Assert.Equal("~/Views/UserPanel/AccountOverView/Summary/SubAffDetails.cshtml", partialViewResult.ViewName);
            Assert.NotEmpty(result);
        }

        private static SummaryController CreateController(
        ISessionService sessionService = null,
        ILanguageService languageService = null,
        IAccountOverviewRepository accountOverviewRepository = null,
        IIpLocationService ipLocationService = null)
        {
            var appSetting = Mock.Of<IAppSetting>();
            sessionService = sessionService ?? MockingHelper.GetSessionService();
            languageService = languageService ?? Mock.Of<ILanguageService>();
            ipLocationService = ipLocationService ?? Mock.Of<IIpLocationService>();
            accountOverviewRepository = accountOverviewRepository ?? Mock.Of<IAccountOverviewRepository>();

            return new SummaryController(appSetting, sessionService, languageService, accountOverviewRepository, ipLocationService);
        }
    }
}

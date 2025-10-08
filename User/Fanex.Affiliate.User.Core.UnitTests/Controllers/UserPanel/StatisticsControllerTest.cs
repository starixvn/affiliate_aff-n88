namespace Fanex.Affiliate.User.Core.UnitTests.Controllers.UserPanel
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Core.BusinessService;
    using Core.Controllers;
    using Core.CoreService;
    using Core.Repository.UserPanel;
    using Core.Utilities;
    using DTO.UserPanel;
    using MetalModels.UserPanel;
    using Moq;
    using TestHelper;
    using ViewModels.UserPanel.Statistics;
    using Xunit;

    public class StatisticsControllerTest
    {
        [Fact]
        public void StatisticsDetailBySite_WhenCall_ReturnViewWithCorrectModelData()
        {
            // Arrange
            var param = new StatisticsDetailBySiteParam
            {
                TotalPages = 10
            };
            var referrerStatisticsList = new List<ReferrerStatistics> { new ReferrerStatistics() };

            var statisticsRepository = new Mock<IStatisticsRepository>();
            statisticsRepository.Setup(s => s.GetStatisticsDetailBySite(param)).Returns(referrerStatisticsList);

            var controller = CreateController(staticticsRepository: statisticsRepository.Object);

            var expectedViewModel = new ReferrerStatisticsViewModel
            {
                DataList = referrerStatisticsList,
                IsDetail = true
            };

            // Action
            var viewResult = controller.StatisticsDetailBySite(param) as PartialViewResult;
            var viewName = viewResult.ViewName;
            var model = viewResult.Model as ReferrerStatisticsViewModel;

            // Assert
            Assert.Equal("~/Views/UserPanel/Statistics/StatisticsPartial/_ReferrersStatisticsContent.cshtml", viewName);
            Assert.Equal(expectedViewModel.DataList, model.DataList);
            Assert.True(model.IsDetail);
        }

        private static StatisticsController CreateController(
            ISessionService sessionService = null,
            ILanguageService languageService = null,
            IStatisticsRepository staticticsRepository = null,
            IIpLocationService ipLocationService = null)
        {
            var appSetting = Mock.Of<IAppSetting>();
            var fakeSessionService = sessionService ?? MockingHelper.GetSessionService();
            var fakeLanguageService = languageService ?? Mock.Of<ILanguageService>();
            var fakeIpLocationService = ipLocationService ?? Mock.Of<IIpLocationService>();
            var fakeStaticticsRepository = staticticsRepository ?? (new Mock<IStatisticsRepository>()).Object;

            return new StatisticsController(appSetting, fakeSessionService, fakeLanguageService, fakeStaticticsRepository, fakeIpLocationService);
        }
    }
}

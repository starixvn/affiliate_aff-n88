namespace Fanex.Affiliate.User.Core.UnitTests.Controllers.UserPanel
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Constants;
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

    public class ReferrersStatisticsControllerTest
    {
        [Fact]
        public void IndexGet_WhenCall_ReturnViewWithCorrectModelData()
        {
            // Arrange
            var referrerStatisticsList = new List<ReferrerStatistics> { new ReferrerStatistics() };

            var statisticsRepository = new Mock<IStatisticsRepository>();
            statisticsRepository.Setup(s => s.GetReferrerStatistics(It.IsAny<ReferrerStatisticsParam>())).Returns(referrerStatisticsList);

            var controller = CreateController(staticticsRepository: statisticsRepository.Object);

            var today = DateTimeOffset.Now.ToOffset(new TimeSpan(GMT.PlusEight, 0, 0));
            var expectedViewModel = new ReferrerStatisticsViewModel
            {
                DataList = referrerStatisticsList,
                FromDate = new DateTime(today.Year, today.Month, 1),
                ToDate = today.DateTime
            };

            // Action
            var viewResult = controller.Index() as ViewResult;
            var viewName = viewResult.ViewName;
            var model = viewResult.Model as ReferrerStatisticsViewModel;

            // Assert
            Assert.Equal("~/Views/UserPanel/Statistics/ReferrersStatistics/Index.cshtml", viewName);
            Assert.Equal(expectedViewModel.DataList, model.DataList);
            Assert.Equal(expectedViewModel.FromDate.Date, model.FromDate.Date);
            Assert.Equal(expectedViewModel.ToDate.Date, model.ToDate.Date);
        }

        [Fact]
        public void IndexPost_WhenCall_ReturnViewWithCorrectModelData()
        {
            // Arrange
            var referrerStatisticsList = new List<ReferrerStatistics> { new ReferrerStatistics() };

            var statisticsRepository = new Mock<IStatisticsRepository>();
            statisticsRepository.Setup(s => s.GetReferrerStatistics(It.IsAny<ReferrerStatisticsParam>())).Returns(referrerStatisticsList);

            var controller = CreateController(staticticsRepository: statisticsRepository.Object);

            var expectedViewModel = new ReferrerStatisticsViewModel
            {
                DataList = referrerStatisticsList
            };

            var param = new ReferrerStatisticsParam();
            var expectedParam = new ReferrerStatisticsParam
            {
                AffId = Constant.DefaultAffId,
                IsInternal = false
            };

            // Action
            var viewResult = controller.Index(param) as PartialViewResult;
            var viewName = viewResult.ViewName;
            var model = viewResult.Model as ReferrerStatisticsViewModel;

            // Assert
            Assert.Equal("~/Views/UserPanel/Statistics/StatisticsPartial/_ReferrersStatisticsContent.cshtml", viewName);
            Assert.Equal(expectedViewModel.DataList, model.DataList);
            Assert.Equal(expectedParam.AffId, param.AffId);
            Assert.Equal(expectedParam.IsInternal, param.IsInternal);
        }

        private static ReferrersStatisticsController CreateController(
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

            return new ReferrersStatisticsController(appSetting, fakeSessionService, fakeLanguageService, fakeStaticticsRepository, fakeIpLocationService);
        }
    }
}

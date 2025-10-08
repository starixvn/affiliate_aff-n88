namespace Fanex.Affiliate.User.Core.UnitTests.Controllers
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Core.BusinessService;
    using Core.Controllers.UserPanel;
    using Core.CoreService;
    using Core.Repository.UserPanel;
    using Core.Utilities;
    using DTO.UserPanel;
    using NSubstitute;
    using TestHelper;
    using ViewModels.UserPanel.Statistics;
    using Xunit;

    public class MarketingLinkStatisticsControllerTest
    {
        private readonly IAppSetting AppSetting;
        private readonly ISessionService SessionService;
        private readonly ILanguageService LanguageService;
        private readonly IStatisticsRepository StatisticsRepository;
        private readonly IIpLocationService IpLocationService;

        public MarketingLinkStatisticsControllerTest()
        {
            AppSetting = Substitute.For<IAppSetting>();
            SessionService = NSubtituteMockingHelper.FakeSessionService();
            LanguageService = NSubtituteMockingHelper.FakeLanguageService();
            StatisticsRepository = Substitute.For<IStatisticsRepository>();
            IpLocationService = Substitute.For<IIpLocationService>();
        }

        [Fact]
        public void Index_WhenCall_ReturnCorrectView()
        {
            var controller = new MarketingLinkStatisticsController(AppSetting, SessionService, LanguageService, StatisticsRepository, IpLocationService);
            NSubtituteMockingHelper.FakeController(controller);

            var result = controller.Index() as ViewResult;
            var model = result.Model as MarketingPageStatisticsViewModel;

            Assert.NotNull(model);
            Assert.Contains("~/Views/UserPanel/Statistics/MarketingPageStatistics/Index.cshtml", result.ViewName);
        }

        [Fact]
        public void Index_Post_WhenCall_ReturnCorrectView()
        {
            StatisticsRepository.GetMarketingPageStatistics(null).ReturnsForAnyArgs(new List<MarketingPageStatistics> { new MarketingPageStatistics { ChannelName = "ABC" } });
            var controller = new MarketingLinkStatisticsController(AppSetting, SessionService, LanguageService, StatisticsRepository, IpLocationService);
            NSubtituteMockingHelper.FakeController(controller);

            var result = controller.Index(new MarketingPageStatisticsViewModel()) as PartialViewResult;

            Assert.Contains("~/Views/UserPanel/Statistics/StatisticsPartial/_MarketingPageStatsticsContent.cshtml", result.ViewName);
        }
    }
}

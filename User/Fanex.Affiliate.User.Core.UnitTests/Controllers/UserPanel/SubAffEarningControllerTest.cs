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
    using NSubstitute;
    using TestHelper;
    using ViewModels.UserPanel;
    using Xunit;

    public class SubAffEarningControllerTest
    {
        private readonly IAppSetting AppSetting;
        private readonly ISessionService SessionService;
        private readonly ICurrencyRepository CurrencyRepository;
        private readonly ILanguageService LanguageService;
        private readonly IStatementHistoryRepository StatementHistoryRepository;
        private readonly IIpLocationService IpLocationService;

        public SubAffEarningControllerTest()
        {
            AppSetting = Substitute.For<IAppSetting>();
            SessionService = NSubtituteMockingHelper.FakeSessionService();
            LanguageService = NSubtituteMockingHelper.FakeLanguageService();
            StatementHistoryRepository = Substitute.For<IStatementHistoryRepository>();
            CurrencyRepository = Substitute.For<ICurrencyRepository>();
            IpLocationService = Substitute.For<IIpLocationService>();
        }
        [Fact]
        public void Index_WhenCallWith_ReturnCorrectView()
        {
            //Arrange
            StatementHistoryRepository.GetSubAffCommission(Arg.Any<SubAffComParam>()).Returns(new List<SubAffComInfo> {
                new SubAffComInfo
                {
                    UserName = "ABC",
                    Commission = 1000m,
                    SubAffCommission = 500m
                }
            });

            var controller = new SubAffEarningController(AppSetting, SessionService, LanguageService, StatementHistoryRepository, CurrencyRepository, IpLocationService);

            //Action
            var result = controller.Index(new SubAffComParam { MonthDate = new DateTime(2020, 12, 08) }) as ViewResult;
            var model = result.Model as IEnumerable<SubAffComViewModel>;

            //Assert
            Assert.Single(model);
            Assert.Equal("~/Views/UserPanel/StatementHistory/SubAffEarning.cshtml", result.ViewName);
        }

        [Fact]
        public void Index_WhenCallWithIsOnlyContent_ReturnCorrectView()
        {
            //Arrange
            StatementHistoryRepository.GetSubAffCommission(Arg.Any<SubAffComParam>()).Returns(new List<SubAffComInfo> {
                new SubAffComInfo
                {
                    UserName = "ABC",
                    Commission = 1000m,
                    SubAffCommission = 500m
                }
            });
            var controller = new SubAffEarningController(AppSetting, SessionService, LanguageService, StatementHistoryRepository, CurrencyRepository, IpLocationService);

            //Action
            var result = controller.Index(new SubAffComParam { IsOnlyContent = true, RequestPage = "abc", MonthDate = null }) as ViewResult;
            var model = result.Model as IEnumerable<SubAffComViewModel>;

            //Assert
            Assert.Single(model);
            Assert.Equal("~/Views/UserPanel/StatementHistory/StatementHistoryPartial/_SubAffEarningContent.cshtml", result.ViewName);
        }
    }
}

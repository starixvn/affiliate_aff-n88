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
    using DTO.Auth;
    using DTO.UserPanel;
    using MetalModels.UserPanel;
    using NSubstitute;
    using TestHelper;
    using ViewModels.UserPanel;
    using Xunit;

    public class RevenueReportControllerTest
    {
        private readonly IAppSetting AppSetting;
        private readonly ISessionService SessionService;
        private readonly ILanguageService LanguageService;
        private readonly ICommissionReportService CommissionService;
        private readonly ICurrencyRepository CurrencyRepo;
        private readonly IIpLocationService IpLocationService;

        public RevenueReportControllerTest()
        {
            AppSetting = Substitute.For<IAppSetting>();
            SessionService = NSubtituteMockingHelper.FakeSessionService();
            LanguageService = Substitute.For<ILanguageService>();
            CommissionService = Substitute.For<ICommissionReportService>();
            CurrencyRepo = Substitute.For<ICurrencyRepository>();
            IpLocationService = Substitute.For<IIpLocationService>();
        }


        [Fact]
        public void Index_WhenCall_ReturnCorrectView()
        {
            RevenueReportController controller = CreateController();
            SessionService.UserSession.Returns(new UserSession());
            CurrencyRepo.GetBaseCurrencyList().Returns(new List<Currency> { new Currency { Code = "USD", ExchangeId = 123 } });

            var result = controller.Index(null) as ViewResult;

            Assert.Contains("CommissionReport/Index.cshtml", result.ViewName);
        }


        [Fact]
        public void Index_WhenCallWithYearReportNotInRange_ReceiveNoItemList()
        {
            var date = DateTime.Now.AddYears(2);
            var controller = CreateController();

            var result = controller.Index(date.Year) as JsonResult;
            var model = (CommissionReportDataViewModel)result.Data;

            Assert.Null(model.Data);
            Assert.Null(model.Total);
        }

        [Fact]
        public void Index_WhenCallWithYearReportInRange_ServiceRecieveCall()
        {
            var thisYear = DateTime.Now.Year;
            var controller = CreateController();

            controller.Index(thisYear, 1);

            CommissionService.Received().GenerateCommissionReportData(Arg.Any<CommissionReportParam>());
        }

        private RevenueReportController CreateController()
            => new RevenueReportController(AppSetting, SessionService, LanguageService, CommissionService, CurrencyRepo, IpLocationService);

    }
}

using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.Controllers.UserPanel;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.Repository.UserPanel;
using Fanex.Affiliate.User.Core.UnitTests.TestHelper;
using Fanex.Affiliate.User.Core.ViewModels.UserPanel;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Razor.Text;
using Xunit;

namespace Fanex.Affiliate.User.Core.UnitTests.Controllers.UserPanel
{
    public class RevenueReportControllerTest
    {
        private readonly ISessionService SessionService;
        private readonly ILanguageService LanguageService;
        private readonly ICommissionReportService CommissionService;
        private readonly ICurrencyRepository CurrencyRepo;

        public RevenueReportControllerTest()
        {
            SessionService = NSubtituteMockingHelper.FakeSessionService();
            LanguageService = NSubstitute.Substitute.For<ILanguageService>();
            CommissionService = NSubstitute.Substitute.For<ICommissionReportService>();
            CurrencyRepo = Substitute.For<ICurrencyRepository>();
        }


        [Fact]
        public void Index_WhenCall_ReturnCorrectView()
        {
            RevenueReportController controller = CreateController();
            SessionService.UserSession.Returns(new DTO.Auth.UserSession());
            CurrencyRepo.GetBaseCurrencyList().Returns(new List<Currency>());

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

            controller.Index(thisYear);

            CommissionService.Received().GenerateCommissionReportData(Arg.Any<CommissionReportParam>());
        }

        private RevenueReportController CreateController()
            => new RevenueReportController(SessionService, LanguageService, CommissionService, CurrencyRepo);

    }
}

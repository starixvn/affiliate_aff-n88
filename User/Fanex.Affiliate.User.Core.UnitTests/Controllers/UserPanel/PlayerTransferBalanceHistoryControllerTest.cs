namespace Fanex.Affiliate.User.Core.UnitTests.Controllers.UserPanel
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Constants;
    using Core.BusinessService;
    using Core.Controllers.UserPanel;
    using Core.CoreService;
    using Core.Repository.UserPanel;
    using Core.Utilities;
    using DTO.Auth;
    using DTO.UserPanel;
    using DTO.UserPanel.PlayerTransferBalance;
    using MetalModels.UserPanel;
    using NSubstitute;
    using TestHelper;
    using Xunit;

    public class PlayerTransferBalanceHistoryControllerTest
    {
        private readonly IAppSetting AppSetting;
        private readonly ISessionService sessionService;
        private readonly IAccountRepository accountRepository;
        private readonly ICurrencyRepository currencyRepository;
        private readonly IPlayerTransferBalanceService playerTransferBalanceService;
        private readonly IIpLocationService ipLocationService;

        public PlayerTransferBalanceHistoryControllerTest()
        {
            AppSetting = Substitute.For<IAppSetting>();
            sessionService = NSubtituteMockingHelper.FakeSessionService();
            accountRepository = Substitute.For<IAccountRepository>();
            currencyRepository = Substitute.For<ICurrencyRepository>();
            playerTransferBalanceService = Substitute.For<IPlayerTransferBalanceService>();
            ipLocationService = Substitute.For<IIpLocationService>();
        }

        [Fact]
        public void Index_WhenCall_ReturnCorrectView()
        {
            var controller = CreateController();

            var result = controller.Index() as ViewResult;

            Assert.Equal("~/Views/UserPanel/PlayerTransferBalanceHistory/Index.cshtml", result.ViewName);
        }

        [Fact]
        public void Index_WhenCallWithDisabledTransfer_Redirect()
        {
            sessionService.UserSession.Returns(new UserSession { DisabledTransfer = true });
            var controller = CreateController();

            var result = controller.Index() as RedirectResult;

            Assert.Equal("/Notify/PageNotFound", result.Url);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        public void GetHistory_WhenCall_ReturnCorrectView(int playerCurrencyId)
        {
            accountRepository.GetAccountInfo(Arg.Compat.Any<int>()).Returns(new AccountInformation { PlayerCurrencyId = playerCurrencyId });
            currencyRepository.GetBaseCurrencyList().Returns(new List<Currency>
            {
                new Currency { ExchangeId = 1, Code = "USD"},
                new Currency { ExchangeId = 3, Code = "IDR"}
            });
            playerTransferBalanceService.GetPlayerTransferBalanceHistory(Arg.Compat.Any<PlayerTransferBalanceHistoryParam>()).Returns(new PlayerTransferBalanceHistoryResult
            {
                Items = new List<PlayerTransferBalanceHistoryInfo>
                {
                    new PlayerTransferBalanceHistoryInfo
                    {
                        Status = TransferBalanceStatus.Completed
                    },
                    new PlayerTransferBalanceHistoryInfo
                    {
                        Status = TransferBalanceStatus.Pending
                    },
                    new PlayerTransferBalanceHistoryInfo
                    {
                        Status = TransferBalanceStatus.Failed
                    },
                    new PlayerTransferBalanceHistoryInfo
                    {
                        Status = "Test"
                    }
                }
            });
            var controller = CreateController();

            var result = controller.GetHistory(new PlayerTransferBalanceHistoryParam()) as PartialViewResult;

            Assert.Equal("~/Views/UserPanel/PlayerTransferBalanceHistory/_Content.cshtml", result.ViewName);
        }

        [Fact]
        public void GetHistory_WhenCallWithDisabledTransfer_Redirect()
        {
            sessionService.UserSession.Returns(new UserSession { DisabledTransfer = true });
            var controller = CreateController();

            var result = controller.GetHistory(new PlayerTransferBalanceHistoryParam()) as RedirectToRouteResult;

            Assert.Equal("Default", result.RouteName);
            Assert.Equal("Index", result.RouteValues["action"]);
            Assert.Equal("Home", result.RouteValues["controller"]);
        }

        private PlayerTransferBalanceHistoryController CreateController()
        {

            var controler = new PlayerTransferBalanceHistoryController(AppSetting, sessionService, null, currencyRepository, playerTransferBalanceService, accountRepository, ipLocationService);

            return MockingHelper.FakeController(controler) as PlayerTransferBalanceHistoryController;
        }
    }
}

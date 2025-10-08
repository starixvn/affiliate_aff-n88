namespace Fanex.Affiliate.User.Core.UnitTests.Controllers.UserPanel
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Core.BusinessService;
    using Core.Controllers.UserPanel;
    using Core.CoreService;
    using Core.Utilities;
    using DTO;
    using DTO.Auth;
    using DTO.UserPanel.PlayerTransferBalance;
    using NSubstitute;
    using TestHelper;
    using ViewModels.UserPanel;
    using Xunit;

    public class PlayerTransferBalanceControllerTest
    {
        private readonly IAppSetting AppSetting;
        private readonly ISessionService sessionService;
        private readonly IPlayerTransferBalanceService playerTransferBalanceService;
        private readonly IIpLocationService ipLocationService;

        public PlayerTransferBalanceControllerTest()
        {
            AppSetting = Substitute.For<IAppSetting>();
            sessionService = NSubtituteMockingHelper.FakeSessionService();
            playerTransferBalanceService = Substitute.For<IPlayerTransferBalanceService>();
            ipLocationService = Substitute.For<IIpLocationService>();
        }

        [Fact]
        public void Index_WhenCall_ReturnCorrectView()
        {
            var controller = CreateController();

            var result = controller.Index() as ViewResult;

            Assert.Equal("~/Views/UserPanel/PlayerTransferBalance/Index.cshtml", result.ViewName);
        }

        [Fact]
        public void Index_WhenCallWithDisabledTransfer_RedirectToRoute()
        {
            sessionService.UserSession.Returns(new UserSession { DisabledTransfer = true });
            var controller = CreateController();

            var result = controller.Index() as RedirectToRouteResult;

            Assert.Equal("Default", result.RouteName);
            Assert.Equal("Index", result.RouteValues["action"]);
            Assert.Equal("Home", result.RouteValues["controller"]);
        }

        [Fact]
        public async Task SearchPlayer_WhenCall_ReturnCorrectData()
        {
            playerTransferBalanceService.GetPlayerTransferBalanceInfoAsync(Arg.Compat.Any<int>(), "").Returns(Task.FromResult(new ResultInfo<PlayerTransferBalanceInfo> { IsOk = true }));
            var controller = CreateController();

            var result = await controller.SearchPlayer("") as JsonResult;
            var data = result.Data as ResultInfo;

            Assert.True(data.IsOk);
        }

        [Fact]
        public async Task SearchPlayer_WhenCallWithDisabledTransfer_ReturnError()
        {
            sessionService.UserSession.Returns(new UserSession { DisabledTransfer = true });
            var controller = CreateController();

            var result = await controller.SearchPlayer("") as JsonResult;
            var data = result.Data as ResultInfo;

            Assert.False(data.IsOk);
        }

        [Fact]
        public async Task SubmitTransferMoney_WhenCall_SubmitSuccessfully()
        {
            var param = new TransMoneyRequestViewModel();
            playerTransferBalanceService.SubmitTransferBalanceRequestAsync(param).Returns(Task.FromResult(new ResultInfo { IsOk = true }));
            var controller = CreateController();

            var result = await controller.SubmitTransferMoney(param) as JsonResult;
            var data = result.Data as ResultInfo;

            Assert.True(data.IsOk);
        }

        [Fact]
        public async Task SubmitTransferMoney_WhenCallWithDisabledTransfer_ReturnError()
        {
            var param = new TransMoneyRequestViewModel { SubmitName = "abc", Amount = 0, PaymentAccountExRate = 0.5m, PlayerExRate = 0.25m };
            var controller = CreateController();

            var result = await controller.SubmitTransferMoney(param) as JsonResult;
            var data = result.Data as ResultInfo;

            Assert.False(data.IsOk);
        }

        private PlayerTransferBalanceController CreateController()
            => new PlayerTransferBalanceController(AppSetting, sessionService, null, playerTransferBalanceService, ipLocationService);
    }
}

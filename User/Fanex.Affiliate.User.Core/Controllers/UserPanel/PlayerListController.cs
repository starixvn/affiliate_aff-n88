namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System.Web.Mvc;
    using Fanex.Affiliate.User.Core.BusinessService;
    using Fanex.Affiliate.User.Core.CoreService;
    using Fanex.Affiliate.User.Core.Filters;
    using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
    using Fanex.Affiliate.User.Core.Utilities;
    using Fanex.Affiliate.User.Core.ViewModels.UserPanel;

    public class PlayerListController : BaseController
    {
        private readonly IAppSetting _appSetting;
        private readonly IPlayerListService _playerListService;

        public PlayerListController(
            IAppSetting appSetting,
            ISessionService sessionService,
            IPlayerListService playerListService,
            ILanguageService languageService) : base(sessionService, languageService)
        {
            _appSetting = appSetting;
            _playerListService = playerListService;
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult Index()
        {
            var now = DateTimeHelper.Gmt8Now;
            var viewModel = new PlayerListViewModel
            {
                FromDate = DateTimeHelper.CreateDateTime(now.Year, now.Month, 1),
                ToDate = now
            };
            var viewPath = PathHelper.GetViewPath("UserPanel/AccountOverView/PlayerList", "Index", _appSetting.SiteName);

            return View(viewPath, viewModel);
        }

        [HttpPost]
        [AjaxOnly]
        public ActionResult Index(PlayerListParam param)
        {
            param.AffId = SessionService.UserSession.AffId;
            var result = _playerListService.GetPlayerList(param);
            var viewPath = PathHelper.GetViewPath("UserPanel/AccountOverView/PlayerList", "_Content", _appSetting.SiteName);

            ViewBag.StartRowNumber = (param.PageIndex - 1) * param.PageSize + 1;

            return PartialView(viewPath, result);
        }
    }
}
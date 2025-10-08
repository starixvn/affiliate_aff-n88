namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using DTO;
    using Filters;
    using Resources;
    using Utilities;
    using ViewModels.UserPanel;

    [CustomAuthorize]
    public class PlayerTransferBalanceController : BaseController
    {
        private readonly IAppSetting _appSetting;
        private readonly IPlayerTransferBalanceService _playerTransferBalanceService;

        public PlayerTransferBalanceController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService,
            IPlayerTransferBalanceService playerTransferBalanceService,
            IIpLocationService ipLocationService) 
            : base(sessionService, languageService, ipLocationService)
        {
            _appSetting = appSetting;
            _playerTransferBalanceService = playerTransferBalanceService;
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult Index()
        {
            if (SessionService.UserSession.DisabledTransfer)
            {
                return RedirectToRoute("Default", new
                {
                    controller = "Home",
                    action = "Index",
                });
            }

            var viewPath = PathHelper.GetViewPath("UserPanel/PlayerTransferBalance", "Index", _appSetting.SiteName);
            return View(viewPath);
        }

        [HttpPost]
        [AjaxOnly]
        public async Task<ActionResult> SearchPlayer(string playerName)
        {
            if (SessionService.IsUnauthorized || SessionService.UserSession.DisabledTransfer)
            {
                return Json(new ResultInfo
                {
                    IsOk = false,
                    Message = Lang.ErrAuthorized
                });
            }
            var affId = SessionService.UserSession.AffId;
            var result = await _playerTransferBalanceService.GetPlayerTransferBalanceInfoAsync(affId, playerName);
            return Json(result);
        }

        [HttpPost]
        [AjaxOnly]
        public async Task<ActionResult> SubmitTransferMoney(TransMoneyRequestViewModel param)
        {
            if (SessionService.IsUnauthorized || SessionService.UserSession.DisabledTransfer)
            {
                return Json(new ResultInfo
                {
                    IsOk = false,
                    Message = Lang.ErrAuthorized
                });
            }

            if (param.SearchName != param.SubmitName)
            {
                var result = new ResultInfo
                {
                    IsOk = false,
                    Message = Lang.DiffBetweenSearchAndUpdateName
                };
                return Json(result);
            }

            var submitResult = await _playerTransferBalanceService.SubmitTransferBalanceRequestAsync(param);

            return Json(submitResult);
        }
    }
}

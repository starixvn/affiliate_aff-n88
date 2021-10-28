using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.UserPanel.PlayerTransferBalance;
using Fanex.Affiliate.User.Core.Filters;
using Fanex.Affiliate.User.Core.Resources;
using Fanex.Affiliate.User.Core.ViewModels;
using Fanex.Affiliate.User.Core.ViewModels.UserPanel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    [CustomAuthorize]
    public class PlayerTransferBalanceController : BaseController
    {
        private readonly IPlayerTransferBalanceService _playerTransferBalanceService;

        public PlayerTransferBalanceController(ISessionService sessionService
            , ILanguageService languageService
            , IPlayerTransferBalanceService playerTransferBalanceService) 
            : base(sessionService, languageService)
        {
            _playerTransferBalanceService = playerTransferBalanceService;
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult Index()
        {
            return View("~/Views/UserPanel/PlayerTransferBalance/Index.cshtml");
        }

        [HttpPost]
        [AjaxOnly]
        public async Task<ActionResult> SearchPlayer(string playerName)
        {
            if (SessionService.IsInternal || SessionService.UserSession.DisabledTransfer)
            {
                return Redirect(Url.Content("~/Notify/PageNotFound"));
            }

            var affId = SessionService.UserSession.AffId;
            var result = await _playerTransferBalanceService.GetPlayerTransferBalanceInfoAsync(affId, playerName);
            return Json(result);
        }

        [HttpPost]
        [AjaxOnly]
        public async Task<ActionResult> SubmitTransferMoney(TransMoneyRequestViewModel param)
        {
            var result = new ResultInfo();
            if (param.SearchName != param.SubmitName)
            {
                result.IsOk = false;
                result.Message = Lang.DiffBetweenSearchAndUpdateName;
                return Json(result);
            }

            var submitResult = await _playerTransferBalanceService.SubmitTransferBalanceRequestAsync(param);
            result.IsOk = submitResult.errCode == 0;
            result.Message = submitResult.errMsg;

            return Json(result);
        }
    }
}

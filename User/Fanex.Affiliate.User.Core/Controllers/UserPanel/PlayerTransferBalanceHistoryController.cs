using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.Filters;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.Repository.UserPanel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    [CustomAuthorize]
    public class PlayerTransferBalanceHistoryController : BaseController
    {
        private readonly IPlayerTransferBalanceService _playerTransferService;
        private readonly ICurrencyRepository _currencyRepo;

        public PlayerTransferBalanceHistoryController(ISessionService sessionService,
            ILanguageService languageService,
            ICurrencyRepository currencyRepository,
            IPlayerTransferBalanceService playerTransferBalanceService)
            : base(sessionService, languageService)
        {
            _playerTransferService = playerTransferBalanceService;
            _currencyRepo = currencyRepository;
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult Index()
        {
            return View("~/Views/UserPanel/PlayerTransferBalanceHistory/Index.cshtml");
        }

        [HttpPost]
        [AjaxOnly]
        public ActionResult GetHistory(PlayerTransferBalanceHistoryParam param)
        {
            var baseCurrency = SessionService.UserSession.BaseCurrency;
            var currencies = _currencyRepo.GetBaseCurrencyList();
            var currencyName = currencies.FirstOrDefault(c => c.ExchangeId == baseCurrency)?.Code;
            var affId = SessionService.UserSession.AffId;
            ViewBag.BaseCurrency = currencyName;

            param.AffId = affId;
            param.BaseCurrency = baseCurrency;
            var model = _playerTransferService.GetPlayerTransferBalanceHistory(param);

            ViewBag.StartRowNumber = (param.PageIndex - 1) * param.PageSize + 1;
            return PartialView("~/Views/UserPanel/PlayerTransferBalanceHistory/_Content.cshtml", model);
        }
    }
}

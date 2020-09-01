namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System;
    using System.Web.Mvc;
    using Fanex.Affiliate.User.Core.BusinessService;
    using Fanex.Affiliate.User.Core.CoreService;
    using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
    using Fanex.Affiliate.User.Core.Repository.UserPanel;
    using Fanex.Affiliate.User.Core.ViewModels.UserPanel;
    using Filters;

    [CustomAuthorize]
    public class RevenueReportController : BaseController
    {
        private readonly ISessionService _sessionService;
        private readonly ICommissionReportService _commissionReportService;
        private readonly ICurrencyRepository _currencyRepository;

        public RevenueReportController(
            ISessionService sessionService,
            ILanguageService languageService,
            ICommissionReportService commissionReportService,
            ICurrencyRepository currencyRepository
          ) : base(sessionService, languageService)
        {
            _sessionService = sessionService;
            _commissionReportService = commissionReportService;
            _currencyRepository = currencyRepository;
        }


        [HttpGet]
        [AjaxOnly]
        public ActionResult Index(int? baseCurrency)
        {
            ViewBag.BaseCurrencies = _currencyRepository.GetBaseCurrencyList();
            ViewBag.DefaultBaseCurrency = baseCurrency ?? _sessionService.UserSession.BaseCurrency;
            return View("~/Views/UserPanel/CommissionReport/Index.cshtml", model: _sessionService.UserSession.IsMaxSubLevel);
        }

        [HttpPost]
        [AjaxOnly]
        public ActionResult Index(int year, int baseCurrency = 0)
        {
            var currency = baseCurrency == 0 ? SessionService.UserSession.BaseCurrency : baseCurrency;
            var viewModel = year >= 2009 && year <= DateTime.Now.Year
                ? _commissionReportService.GenerateCommissionReportData(new CommissionReportParam
                {
                    AffId = SessionService.UserSession.AffId,
                    WinLostDate = new DateTime(year, 1, 1),
                    BaseCurrency = currency
                })
                : new CommissionReportDataViewModel();

            return Json(viewModel);
        }
    }
}
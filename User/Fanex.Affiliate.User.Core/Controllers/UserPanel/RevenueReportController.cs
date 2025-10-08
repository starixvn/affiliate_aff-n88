namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System;
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using Filters;
    using MetalModels.UserPanel;
    using Repository.UserPanel;
    using Utilities;
    using ViewModels.UserPanel;

    [CustomAuthorize]
    public class RevenueReportController : BaseController
    {
        private readonly IAppSetting _appSetting;
        private readonly ISessionService _sessionService;
        private readonly ICommissionReportService _commissionReportService;
        private readonly ICurrencyRepository _currencyRepository;

        public RevenueReportController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService,
            ICommissionReportService commissionReportService,
            ICurrencyRepository currencyRepository,
            IIpLocationService ipLocationService
          ) : base(sessionService, languageService, ipLocationService)
        {
            _appSetting = appSetting;
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

            var viewPath = PathHelper.GetViewPath("UserPanel/CommissionReport", "Index", _appSetting.SiteName);
            return View(viewPath, model: _sessionService.UserSession.IsMaxSubLevel);
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
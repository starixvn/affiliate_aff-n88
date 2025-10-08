namespace Fanex.Affiliate.User.Core.Controllers
{
    using System;
    using System.Web.Mvc;
    using BusinessService;
    using Constants;
    using CoreService;
    using Filters;
    using MetalModels.UserPanel;
    using Repository.UserPanel;
    using Utilities;
    using ViewModels.UserPanel;

    [CustomAuthorize]
    public class DailyEarningController : BaseController
    {
        private readonly IAppSetting _appSetting;
        private readonly IStatementHistoryRepository _statementHistoryRepository;
        private readonly ICurrencyRepository _currencyRepository;

        public DailyEarningController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService,
            IStatementHistoryRepository statementHistoryRepository,
            ICurrencyRepository currencyRepository,
            IIpLocationService ipLocationService
            ) : base(sessionService, languageService, ipLocationService)
        {
            _appSetting = appSetting;
            _statementHistoryRepository = statementHistoryRepository;
            _currencyRepository = currencyRepository;
        }

        [AjaxOnly]
        public ActionResult Index(DailyEarningParam param)
        {
            param.AffId = SessionService.UserSession.AffId;
            param.IsInternal = SessionService.IsInternal;
            param.ProductId = param.ProductId ?? Product.Sportsbook;
            param.MonthDate = param.MonthDate ?? DateTime.Now.AddDays(-1);

            var viewModel = new DailyEarningViewModel
            {
                ProductList = param.IsOnlyContent ? null : _statementHistoryRepository.GetProductList(param.IsInternal),
                Data = _statementHistoryRepository.GetDailyEarning(param),
                SelectedProduct = param.ProductId.Value
            };
            ViewBag.MonthDate = param.MonthDate;
            ViewBag.BaseCurrencies = _currencyRepository.GetBaseCurrencyList();
            ViewBag.SelectedBaseCurrency = param.BaseCurrency;
            var viewPath = param.IsOnlyContent ? PathHelper.GetViewPath("UserPanel/StatementHistory/StatementHistoryPartial", "_DailyEarningContent", _appSetting.SiteName) :
                PathHelper.GetViewPath("UserPanel/StatementHistory", "DailyEarning", _appSetting.SiteName);

            return View(viewPath, viewModel);

        }

    }
}
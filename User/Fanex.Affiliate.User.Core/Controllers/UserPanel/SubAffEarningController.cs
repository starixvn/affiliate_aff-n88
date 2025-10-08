namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System;
    using System.Linq;
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
    public class SubAffEarningController : BaseController
    {
        private readonly IAppSetting _appSetting;
        private readonly IStatementHistoryRepository _statementHistoryRepository;
        private readonly ICurrencyRepository _currencyRepository;

        public SubAffEarningController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService,
            IStatementHistoryRepository statementHistoryRepository,
            ICurrencyRepository currencyRepository,
            IIpLocationService ipLocationService) 
            : base(sessionService, languageService, ipLocationService)
        {
            _appSetting = appSetting;
            _statementHistoryRepository = statementHistoryRepository;
            _currencyRepository = currencyRepository;
        }

        [AjaxOnly]
        public ActionResult Index(SubAffComParam param)
        {
            param.AffId = SessionService.UserSession.AffId;
            param.IsInternal = SessionService.IsInternal;
            param.MonthDate = param.MonthDate ?? DateTime.Now.AddDays(-1);

            var subAffComs = _statementHistoryRepository.GetSubAffCommission(param);
            var requestPage = param.RequestPage;
            var vms = subAffComs.Select(s => new SubAffComViewModel
            {
                Commission = s.Commission,
                SubAffCommission = s.SubAffCommission,
                SubAffUserName = s.UserName
            });

            if (!RequestPage.Links.TryGetValue(requestPage, out BreadcrumbViewModel breadcrumb))
            {
                breadcrumb = RequestPage.Links[RequestPage.StatementHistory];
            }

            breadcrumb.Url = $"{breadcrumb.Url}?baseCurrency={param.BaseCurrency}";

            ViewBag.MonthDate = param.MonthDate;
            ViewBag.Breadcrumb = breadcrumb;
            ViewBag.BaseCurrencies = _currencyRepository.GetBaseCurrencyList();
            ViewBag.SelectedBaseCurrency = param.BaseCurrency;
            var path = param.IsOnlyContent
                ? PathHelper.GetViewPath("UserPanel/StatementHistory/StatementHistoryPartial", "_SubAffEarningContent", _appSetting.SiteName)
                : PathHelper.GetViewPath("UserPanel/StatementHistory", "SubAffEarning", _appSetting.SiteName);
            return View(path, vms);
        }
    }
}

namespace Fanex.Affiliate.User.Core.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using BusinessService;
    using Constants;
    using CoreService;
    using DTO.UserPanel;
    using Filters;
    using MetalModels.UserPanel;
    using Repository.UserPanel;
    using Utilities;
    using ViewModels.UserPanel;

    [CustomAuthorize]
    public class StatementHistoryController : BaseController
    {
        private const int DefaultPageSize = 20;
        private readonly IAppSetting _appSetting;
        private readonly ISessionService _sessionService;
        private readonly IStatementHistoryRepository _statementHistoryRepository;
        private readonly ICurrencyRepository _currencyRepository;

        public StatementHistoryController(ISessionService sessionService,
            ILanguageService languageService,
            IAppSetting appSetting,
            IStatementHistoryRepository statementHistoryRepository,
            ICurrencyRepository currencyRepository,
            IIpLocationService ipLocationService)
            : base(sessionService, languageService, ipLocationService)
        {
            _appSetting = appSetting;
            _sessionService = sessionService;
            _statementHistoryRepository = statementHistoryRepository;
            _currencyRepository = currencyRepository;
        }
        [HttpGet]
        [AjaxOnly]
        public ActionResult Index(string baseCurrency)
        {
            var baseCurrencies = _currencyRepository.GetBaseCurrencyList();
            var isClickBreadcumb = false;
            var baseCurrencyId = SessionService.UserSession.BaseCurrency;

            if (!string.IsNullOrEmpty(baseCurrency) && int.TryParse(baseCurrency, out int currencyId) && baseCurrencies.Any(b => b.ExchangeId == currencyId))
            {
                isClickBreadcumb = true;
                baseCurrencyId = currencyId;
            }

            var param = new StatementHistoryParam
            {
                AffId = SessionService.UserSession.AffId,
                IsInternal = SessionService.IsInternal,
                PageSize = DefaultPageSize,
                BaseCurrency = baseCurrencyId
            };

            var statementHistoryList = GetStatementHistoryViewModel(param);
            ViewBag.TotalItem = param.NRows;
            ViewBag.StartRowNumber = 1;
            ViewBag.AvailableFromDate = _appSetting.StatementAvailableFrom;
            ViewBag.BaseCurrencies = baseCurrencies;
            ViewBag.DefaultBaseCurrency = baseCurrencyId;
            ViewBag.IsClickBreadcumb = isClickBreadcumb.ToString();

            var viewPath = PathHelper.GetViewPath("UserPanel/StatementHistory", "Index", _appSetting.SiteName);
            return View(viewPath, statementHistoryList);
        }

        [HttpPost]
        [AjaxOnly]
        public ActionResult Index(StatementHistoryParam param)
        {
            param.AffId = SessionService.UserSession.AffId;
            param.IsInternal = SessionService.IsInternal;
            param.PageSize = param.PageSize ?? DefaultPageSize;

            var statementHistoryList = GetStatementHistoryViewModel(param);
            ViewBag.TotalItem = param.NRows;
            ViewBag.StartRowNumber = (param.PageIndex - 1) * param.PageSize + 1;
            ViewBag.AvailableFromDate = _appSetting.StatementAvailableFrom;

            var viewPath = PathHelper.GetViewPath("UserPanel/StatementHistory/StatementHistoryPartial", "_StatementHistoryContent", _appSetting.SiteName);
            return PartialView(viewPath, statementHistoryList);
        }

        private IEnumerable<StatementHistoryViewModel> GetStatementHistoryViewModel(StatementHistoryParam param)
        {
            var vms = new List<StatementHistoryViewModel>();
            var statementHistoryList = _statementHistoryRepository.GetStatementHistory(param);
            if (_sessionService.UserSession.IsMaxSubLevel)
            {
                foreach (var item in statementHistoryList)
                {
                    vms.Add(CreateViewModelFromStatementHistoryItem(item));
                }

                return vms;
            }

            foreach (var item in statementHistoryList)
            {
                if (item.TransType == TransType.Commission || item.TransType == TransType.SubAffBonus)
                {
                    if (CheckIfExistMonthlyTotal(item.MonthDate, vms))
                    {
                        continue;
                    }
                    vms.Add(CreateMonthlyTotal(item.MonthDate, statementHistoryList));
                }
                else
                {
                    vms.Add(CreateViewModelFromStatementHistoryItem(item));
                }
            }

            return vms;
        }

        private static StatementHistoryViewModel CreateMonthlyTotal(DateTime monthDate, IEnumerable<StatementHistory> statementHistoryList)
        {
            var transItems = statementHistoryList.Where(s => s.MonthDate == monthDate)
                .Where(s => s.TransType == TransType.SubAffBonus || s.TransType == TransType.Commission);

            var monthlyCom = transItems.FirstOrDefault(s => s.TransType == TransType.Commission);
            var children = transItems.Select(s => CreateViewModelFromStatementHistoryItem(s));

            var monthlyTotal = new StatementHistoryViewModel
            {
                Amount = transItems.Sum(s => s.Amount),
                MonthDate = monthDate,
                Children = children,
                Status = monthlyCom?.Status ?? children.FirstOrDefault().Status,
                TransType = TransType.MonthlyTotal,
                CalculatedType = monthlyCom?.CalculatedType ?? children.FirstOrDefault().CalculatedType
            };
            return monthlyTotal;
        }

        private static bool CheckIfExistMonthlyTotal(DateTime monthDate, List<StatementHistoryViewModel> vms)
        {
            return vms.Any(m => m.MonthDate == monthDate && m.TransType == TransType.MonthlyTotal);
        }

        private static StatementHistoryViewModel CreateViewModelFromStatementHistoryItem(StatementHistory item)
        {
            return new StatementHistoryViewModel
            {
                Amount = item.Amount,
                Description = item.Description,
                MonthDate = item.MonthDate,
                Status = item.Status,
                TransType = item.TransType,
                CalculatedType = item.CalculatedType
            };
        }
    }
}
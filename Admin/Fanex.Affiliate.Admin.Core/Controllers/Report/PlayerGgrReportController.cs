using Fanex.Affiliate.Admin.Core.Attributes;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Affiliate.Admin.Core.MetaModels.Report;
using Fanex.Affiliate.Admin.Core.Repository;
using Fanex.Affiliate.Admin.Core.Services.Common;
using Fanex.Affiliate.Admin.Core.Services.Report;
using Fanex.Affiliate.Admin.Core.ViewModels.Report;
using System.Web.Mvc;

namespace Fanex.Affiliate.Admin.Core.Controllers.Report
{
    public class PlayerGgrReportController : BaseController
    {
        private readonly IProductRepository _productRepository;
        private readonly ICurrencyRepository _currencyRepository;
        private readonly IPlayerGgrReportService _playerGgrReportService;

        public PlayerGgrReportController(
            ISessionService sessionService,
            IProductRepository productRepository,
            ICurrencyRepository currencyRepository,
            IPlayerGgrReportService playerGgrReportService) : base(sessionService)
        {
            _productRepository = productRepository;
            _currencyRepository = currencyRepository;
            _playerGgrReportService = playerGgrReportService;
        }


        [HttpGet]
        public ActionResult Index()
        {
            var viewModel = new ReportCommonViewModel
            {
                ProductList = _productRepository.GetProductList(),
                BaseCurrencyList = _currencyRepository.GetBaseCurrencies(),
            };

            return View("~/Areas/Portal/Views/Report/PlayerGgrReport.cshtml", viewModel);
        }


        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetMainData(PlayerGgrReportParam param)
        {
            return new JsonNetResult
            {
                Data = _playerGgrReportService.GetPlayerGgrReportData(param)
            };
        }
    }
}

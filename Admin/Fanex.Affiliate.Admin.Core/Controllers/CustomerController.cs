using Fanex.Affiliate.Admin.Core.Attributes;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.Repository;
using Fanex.Affiliate.Admin.Core.Services;
using Fanex.Affiliate.Admin.Core.Services.Common;
using Fanex.Affiliate.Admin.Core.ViewModels.Customer;
using System.Web.Mvc;

namespace Fanex.Affiliate.Admin.Core.Controllers
{
    [FunctionAuthorize(FunctionName = Function.Affiliate)]
    public class CustomerController : ReadOnlySessionBaseController
    {
        private readonly ISystemService _languageService;
        private readonly IAffTypeService _affTypeService;
        private readonly IProductRepository _productRepository;
        private readonly ICurrencyRepository _currencyRepository;

        public CustomerController(
            ISessionService sessionService,
            ISystemService languageService,
            IAffTypeService affTypeService,
            IProductRepository productRepository,
            ICurrencyRepository currencyRepository) : base(sessionService)
        {
            _languageService = languageService;
            _affTypeService = affTypeService;
            _productRepository = productRepository;
            _currencyRepository = currencyRepository;
        }

        public ActionResult Index(string user)
        {
            var viewModel = new CustomerViewModel
            {
                AffName = user,
                SupportedUiLanguages = _languageService.GetSupportedUiLanguageList(),
                LanguageList = _languageService.GetLanguageList(),
                AffTypeList = _affTypeService.GetAffTypeList(),
                ProductList = _productRepository.GetProductList(),
                CurrencyList = _currencyRepository.GetCurrencies(),
                BaseCurrencyList = _currencyRepository.GetBaseCurrencies()
            };

            if (string.IsNullOrEmpty(user) && !string.IsNullOrEmpty(SessionService.AffName))
            {
                viewModel.AffName = SessionService.AffName;
            }

            return View(viewModel);
        }
    }
}
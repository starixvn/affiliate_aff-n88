namespace Fanex.Affiliate.User.Core.Controllers
{
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using Utilities;
    using ViewModels;

    public class ProductController : BaseLayoutController
    {
        public ProductController(
            IAppSetting appSetting, 
            ISessionService sessionService, 
            ILanguageService languageService,
            IIpLocationService ipLocationService)
            : base(appSetting, sessionService, languageService, ipLocationService)
        {
        }

        [HttpGet]
        public ActionResult Index()
        {
            var viewModel = new ProductPageViewModel
            {
                IsAuthenticated = HttpContext.Request.IsAuthenticated && SessionService.UserSession != null
            };
            AssignBaseLayoutViewModel(viewModel);

            var viewPath = PathHelper.GetViewPath("Product", "Index", AppSetting.SiteName);
            return View(viewPath, viewModel);
        }
    }
}
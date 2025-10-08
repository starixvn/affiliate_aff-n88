namespace Fanex.Affiliate.User.Core.Controllers
{
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using Utilities;
    using ViewModels;

    public class RevenueSharingStructureController : BaseLayoutController
    {
        public RevenueSharingStructureController(
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
            var model = new RevenueSharingStructureViewModel
            {
                DefaultCurrency = AppSetting.DefaultCurrency,
                MaxCommission = AppSetting.MaxCommission
            };
            AssignBaseLayoutViewModel(model);

            return View($"~/Views/CommissionStructure/{AppSetting.SiteName}/Index.cshtml", model);
        }
    }
}
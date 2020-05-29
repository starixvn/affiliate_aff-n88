namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System.Web.Mvc;
    using Fanex.Affiliate.User.Core.BusinessService;
    using Fanex.Affiliate.User.Core.CoreService;
    using Fanex.Affiliate.User.Core.ViewModels.UserPanel;
    using Filters;
    using Repository.UserPanel;

    [CustomAuthorize]
    public class AccountOverviewController : BaseController
    {
        private readonly IAccountOverviewRepository _accountOverviewRepository;
        public AccountOverviewController(ISessionService sessionService,
            ILanguageService languageService,
            IAccountOverviewRepository accountOverviewRepository
            ) : base(sessionService, languageService)
        {
            _accountOverviewRepository = accountOverviewRepository;
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult Index()
        {
            var lastLoginInfo = _accountOverviewRepository.GetLastLoginInfo(SessionService.UserSession.AffId);

            var model = new AccountOverviewViewModel
            {
                LastLoginInfo = lastLoginInfo,
                IsMaxLevel = false
            };

            return View("~/Views/UserPanel/AccountOverView/Index.cshtml", model);
        }
    }
}
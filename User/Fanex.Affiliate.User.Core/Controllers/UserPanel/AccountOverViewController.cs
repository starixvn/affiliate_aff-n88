namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using Filters;
    using Repository.UserPanel;
    using ViewModels.UserPanel;

    [CustomAuthorize]
    public class AccountOverviewController : BaseController
    {
        private readonly IAccountOverviewRepository _accountOverviewRepository;

        private readonly ISessionService _sessionService;

        public AccountOverviewController(ISessionService sessionService,
            ILanguageService languageService,
            IAccountOverviewRepository accountOverviewRepository,
            IIpLocationService ipLocationService
            ) : base(sessionService, languageService, ipLocationService)
        {
            _accountOverviewRepository = accountOverviewRepository;
            _sessionService = sessionService;
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult Index()
        {
            var lastLoginInfo = _accountOverviewRepository.GetLastLoginInfo(SessionService.UserSession.AffId);

            var model = new AccountOverviewViewModel
            {
                LastLoginInfo = lastLoginInfo,
                IsMaxLevel = _sessionService.UserSession.IsMaxSubLevel
            };

            return View("~/Views/UserPanel/AccountOverView/Index.cshtml", model);
        }
    }
}
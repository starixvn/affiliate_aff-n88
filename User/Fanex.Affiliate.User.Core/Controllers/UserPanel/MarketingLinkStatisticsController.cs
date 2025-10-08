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
    using ViewModels.UserPanel.Statistics;

    [CustomAuthorize]
    public class MarketingLinkStatisticsController : BaseController
    {
        private readonly IAppSetting _appSetting;
        private readonly IStatisticsRepository _statisticsRepository;

        public MarketingLinkStatisticsController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService,
            IStatisticsRepository statisticsRepository,
            IIpLocationService ipLocationService
            ) : base(sessionService, languageService, ipLocationService)
        {
            _appSetting = appSetting;
            _statisticsRepository = statisticsRepository;
        }

        public ActionResult Index()
        {
            var now = DateTimeOffset.Now.ToOffset(new TimeSpan(GMT.PlusEight, 0, 0));
            var startMonth = new DateTime(now.Year, now.Month, 1);
            var languages = LanguageService.GetLanguageList(SessionService.IsInternal).Select(l => new SelectListItem
            {
                Text = l.EnglishName,
                Value = l.Code
            });

            var viewModel = new MarketingPageStatisticsViewModel
            {
                FromDate = startMonth,
                ToDate = now.DateTime,
                IncludeInActiveLink = false
            };

            ViewBag.Languages = languages;

            var viewPath = PathHelper.GetViewPath("UserPanel/Statistics/MarketingPageStatistics", "Index", _appSetting.SiteName);
            return View(viewPath, viewModel);
        }

        [HttpPost]
        [AjaxOnly]
        public ActionResult Index(MarketingPageStatisticsViewModel vm)
        {
            var param = new MarketingPageStatisticsParam
            {
                AffId = SessionService.UserSession.AffId,
                FromDate = vm.FromDate,
                ToDate = vm.ToDate,
                IncludedInActive = vm.IncludeInActiveLink,
                LanguageCodes = vm.Language
            };

            var model = _statisticsRepository.GetMarketingPageStatistics(param)
                .GroupBy(s => s.ChannelName);

            var viewPath = PathHelper.GetViewPath("UserPanel/Statistics/StatisticsPartial", "_MarketingPageStatsticsContent", _appSetting.SiteName);
            return PartialView(viewPath, model);
        }
    }
}

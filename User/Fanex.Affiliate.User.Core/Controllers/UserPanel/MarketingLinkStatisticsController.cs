using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.Filters;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.Repository.UserPanel;
using Fanex.Affiliate.User.Core.Utilities;
using Fanex.Affiliate.User.Core.ViewModels.UserPanel.Statistics;
using System;
using System.Linq;
using System.Web.Mvc;

namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    [CustomAuthorize]
    public class MarketingLinkStatisticsController : BaseController
    {
        private readonly IAppSetting _appSetting;
        private readonly IStatisticsRepository _statisticsRepository;

        public MarketingLinkStatisticsController(
            IAppSetting appSetting, 
            ISessionService sessionService, 
            ILanguageService languageService,
            IStatisticsRepository statisticsRepository
            ) : base(sessionService, languageService)
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

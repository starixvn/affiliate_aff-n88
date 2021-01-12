using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.Filters;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.Repository.UserPanel;
using Fanex.Affiliate.User.Core.Resources;
using Fanex.Affiliate.User.Core.ViewModels.UserPanel.Statistics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    public class MarketingLinkStatisticsController : BaseController
    {
        private readonly IStatisticsRepository _statisticsRepository;
        public MarketingLinkStatisticsController(ISessionService sessionService, ILanguageService languageService,
            IStatisticsRepository statisticsRepository
            ) : base(sessionService, languageService)
        {
            _statisticsRepository = statisticsRepository;
        }

        public ActionResult Index()
        {
            var now = DateTime.Now;
            var startMonth = new DateTime(now.Year, now.Month, 1);
            var languages = new List<SelectListItem>
            {
                new SelectListItem{ Text = Lang.All, Value = ""}
            };

            languages.AddRange(LanguageService.GetLanguageList(SessionService.IsInternal).Select(l => new SelectListItem
            {
                Text = l.EnglishName,
                Value = l.Code
            }));

            var viewModel = new MarketingPageStatisticsViewModel
            {
                FromDate = startMonth,
                ToDate = now,
                IncludeInActiveLink = false
                
            };

            ViewBag.Languages = languages;

            return View("~/Views/UserPanel/Statistics/MarketingPageStatistics/Index.cshtml", viewModel);
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


            return PartialView("~/Views/UserPanel/Statistics/StatisticsPartial/_MarketingPageStatsticsContent.cshtml", model);
        }


    }


}

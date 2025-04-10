namespace Fanex.Affiliate.Admin.Core.Controllers.Report
{
    using System.Web.Mvc;
    using Attributes;
    using Constants;
    using Extensions;
    using MetaModels.Report;
    using Services;
    using Services.Common;
    using Services.Report;

    [FunctionAuthorize(FunctionName = Function.AffReport)]
    public class MarketingStatisticsReportController : BaseController
    {
        private readonly ILanguageService _languageService;
        private readonly IMarketingStatisticsService _marketingStatisticsService;

        public MarketingStatisticsReportController(
            ISessionService sessionService,
            ILanguageService languageService,
            IMarketingStatisticsService marketingStatisticsService) : base(sessionService)
        {
            _languageService = languageService;
            _marketingStatisticsService = marketingStatisticsService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var languages = _languageService.GetLanguageList();

            return View("~/Areas/Portal/Views/Report/MarketingPageStatistics.cshtml", languages);
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetReport(MarketingStatisticsParam param)
        {
            if (ModelState.IsValid)
            {
                return new JsonNetResult
                {
                    Data = _marketingStatisticsService.GetReport(param)
                };
            }

            return new JsonNetResult();
        }
    }
}
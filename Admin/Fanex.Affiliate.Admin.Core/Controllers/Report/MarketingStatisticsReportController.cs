namespace Fanex.Affiliate.Admin.Core.Controllers.Report
{
    using System.Web.Mvc;
    using Attributes;
    using Constants;
    using Extensions;
    using MetaModels.Report;
    using Services.Common;
    using Services.Report;

    [FunctionAuthorize(FunctionName = Function.AffReport)]
    public class MarketingStatisticsReportController : ReadOnlySessionBaseController
    {
        private readonly ISystemService _systemService;
        private readonly IMarketingStatisticsService _marketingStatisticsService;

        public MarketingStatisticsReportController(
            ISessionService sessionService,
            ISystemService systemService,
            IMarketingStatisticsService marketingStatisticsService) : base(sessionService)
        {
            _systemService = systemService;
            _marketingStatisticsService = marketingStatisticsService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var languages = _systemService.GetLanguageList();

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
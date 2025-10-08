namespace Fanex.Affiliate.User.Core.Controllers
{
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using Filters;
    using MetalModels.UserPanel;
    using Repository.UserPanel;
    using Utilities;
    using ViewModels.UserPanel.Statistics;

    [CustomAuthorize]
    public class StatisticsController : BaseController
    {
        private readonly IAppSetting _appSetting;
        private readonly IStatisticsRepository _statisticsRepository;

        public StatisticsController(
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

        [HttpPost]
        [AjaxOnly]
        public ActionResult StatisticsDetailBySite(StatisticsDetailBySiteParam statisticsDetailParam)
        {
            statisticsDetailParam.AffId = SessionService.UserSession.AffId;
            statisticsDetailParam.IsInternal = SessionService.IsInternal;

            var viewModel = new ReferrerStatisticsViewModel
            {
                DataList = _statisticsRepository.GetStatisticsDetailBySite(statisticsDetailParam),
                IsDetail = true,
                RowNumber = statisticsDetailParam.NRows
            };

            var viewPath = PathHelper.GetViewPath("UserPanel/Statistics/StatisticsPartial", "_ReferrersStatisticsContent", _appSetting.SiteName);
            return PartialView(viewPath, viewModel);
        }
    }
}
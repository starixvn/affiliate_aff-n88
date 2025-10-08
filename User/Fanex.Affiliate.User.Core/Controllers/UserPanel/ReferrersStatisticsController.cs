namespace Fanex.Affiliate.User.Core.Controllers
{
    using System;
    using System.Web.Mvc;
    using BusinessService;
    using Constants;
    using CoreService;
    using Enum;
    using Filters;
    using MetalModels.UserPanel;
    using Repository.UserPanel;
    using Utilities;
    using ViewModels.UserPanel.Statistics;

    [CustomAuthorize]
    public class ReferrersStatisticsController : BaseController
    {
        private readonly IAppSetting _appSetting;
        private readonly IStatisticsRepository _statisticsRepository;
        public ReferrersStatisticsController(
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


        [HttpGet]
        [AjaxOnly]
        public ActionResult Index()
        {
            var now = DateTimeOffset.Now.ToOffset(new TimeSpan(GMT.PlusEight, 0, 0));
            var referrerStatisticsParam = new ReferrerStatisticsParam
            {
                AffId = SessionService.UserSession.AffId,
                IsInternal = SessionService.IsInternal,
                FromDate = new DateTime(now.Year, now.Month, 1),
                ToDate = now.DateTime,
                DeviceType = (short)DeviceType.PCDevice
            };

            var viewModel = new ReferrerStatisticsViewModel
            {
                DataList = _statisticsRepository.GetReferrerStatistics(referrerStatisticsParam),
                FromDate = referrerStatisticsParam.FromDate,
                ToDate = referrerStatisticsParam.ToDate
            };

            var viewPath = PathHelper.GetViewPath("UserPanel/Statistics/ReferrersStatistics", "Index", _appSetting.SiteName);
            return View(viewPath, viewModel);
        }

        [HttpPost]
        [AjaxOnly]
        public ActionResult Index(ReferrerStatisticsParam referrerStatisticsParam)
        {
            referrerStatisticsParam.AffId = SessionService.UserSession.AffId;
            referrerStatisticsParam.IsInternal = SessionService.IsInternal;

            var viewModel = new ReferrerStatisticsViewModel
            {
                DataList = _statisticsRepository.GetReferrerStatistics(referrerStatisticsParam)
            };

            var viewPath = PathHelper.GetViewPath("UserPanel/Statistics/StatisticsPartial", "_ReferrersStatisticsContent", _appSetting.SiteName);
            return PartialView(viewPath, viewModel);
        }


    }
}
using System.Web.Mvc;
using Fanex.Affiliate.Admin.Core.Attributes;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Affiliate.Admin.Core.Repository.MediaGallery;
using Fanex.Affiliate.Admin.Core.Services.UserPanel;
using Fanex.Affiliate.Admin.Core.Constants;
using ONEbook.UM.AspNetMVC.Filters;

namespace Fanex.Affiliate.Admin.Core.Controllers
{
    [CustomAuthorize]
    [CheckUMFilter]
    [FunctionAuthorize(FunctionName = Function.Affiliate)]
    public class CommonSettingController : Controller
    {
        private readonly ILandingPageRepository _landingPageRepository;
        private readonly ITrackingStatisticsService _trackingStatisticsService;

        public CommonSettingController(
            ILandingPageRepository landingPageRepository,
            ITrackingStatisticsService trackingStatisticsService
            )
        {
            _landingPageRepository = landingPageRepository;
            _trackingStatisticsService = trackingStatisticsService;
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetPageList()
        {
            return new JsonNetResult
            {
                Data = _landingPageRepository.GetLandingPageList()
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetTrackingCodeList(int affId)
        {
            return new JsonNetResult
            {
                Data = _trackingStatisticsService.GetTrackingCodeList(affId)
            };
        }
    }
}
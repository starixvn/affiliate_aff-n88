using ONEbook.UM.Services;
using System.Web.Mvc;

namespace Fanex.Affiliate.Admin.Core.Controllers
{
    public class UnderMaintenanceController : Controller
    {
        private readonly IMaintenanceService _maintenanceService;

        public UnderMaintenanceController(IMaintenanceService maintenanceService)
        {
            _maintenanceService = maintenanceService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            if (_maintenanceService.IsUnderMaintenance())
            {
                var underMaintenanceTime = _maintenanceService.GetUnderMaintenanceTime();

                return View(model: underMaintenanceTime);
            }

            return Redirect("~/Portal/Login");
        }
    }
}

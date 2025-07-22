namespace Affiliate.Banner
{
    using System.Configuration;
    using System.Web.Mvc;

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View(model: ConfigurationManager.AppSettings["SiteName"]);
        }

        public ActionResult Error()
        {
            return View();
        }
    }
}

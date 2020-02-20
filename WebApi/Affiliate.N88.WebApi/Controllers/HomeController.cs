using System.Web.Mvc;

namespace Affiliate.N88.WebApi.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index() =>
            new ContentResult
            {
                Content = $"Home Page <br/> <a href=\"{Url.Content("~/api/test/testmysql")}\" >Test My Sql</a>",
                ContentType = "text/html"
            };
    }
}
using System;
using System.Web.Mvc;

namespace Affiliate.N88.WebApi.Controllers
{
    public class HomeController : Controller
    {
        private string FromDate = new DateTime(2020, 02, 10).ToString("yyyy-MM-dd");
        public ActionResult Index() =>
            new ContentResult
            {
                Content = $"Home Page <br/> <a href=\"{Url.Content("~/api/affiliate/get")}\" >Get Affiliate List</a>" +
                $"<br /> <a href=\"{Url.Content($"~/api/customer/getCustomers?fromDate={FromDate}")}\" >Get Customer List</a>",
                ContentType = "text/html"
            };
    }
}
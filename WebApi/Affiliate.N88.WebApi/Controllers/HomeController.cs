using System;
using System.Configuration;
using System.Web.Mvc;
using Affiliate.N88.DTO;
using Affiliate.N88.SpParams;
using Fanex.Data.Repository;

namespace Affiliate.N88.WebApi.Controllers
{
    public class HomeController : Controller
    {
        private readonly IDynamicRepository dynamicRepository;

        public HomeController(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        public ActionResult Index()
        {
            var connectedMessage = "Database connects successfully";
            try
            {
                dynamicRepository.Fetch<CustomerInfo>(new GetCustomersCriteria(DateTime.Now));
            }
            catch (Exception ex)
            {
                connectedMessage = ex.ToString();
            }

            var env = ConfigurationManager.AppSettings.Get("Enviroment");

            return new ContentResult
            {
                Content = $"Site is running {env} <br/> {connectedMessage}",
                ContentType = "text/html"
            };
        }
    }
}
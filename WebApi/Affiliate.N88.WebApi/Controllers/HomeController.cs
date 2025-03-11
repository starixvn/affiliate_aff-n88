using Affiliate.N88.Models;
using Affiliate.N88.SpParams.Criteria;
using Fanex.Data.Repository;
using System;
using System.Configuration;
using System.Web.Mvc;

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
                dynamicRepository.Fetch<ServerInfo>(new GetServerInfoCriteria("Slave"));
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
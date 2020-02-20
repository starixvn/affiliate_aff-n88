using System.Net.Http.Formatting;
using System.Web.Http;
using Affiliate.N88.WebApi.Filters;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Affiliate.N88.WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }                
            );

            var formaters = GlobalConfiguration.Configuration.Formatters;
            formaters.Clear();
            formaters.Add(new JsonMediaTypeFormatter());

            var jsonFormater = formaters.JsonFormatter;
            jsonFormater.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            jsonFormater.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Serialize;

            // config.Filters.Add(new HmacAuthorizationFilter());
            config.Filters.Add(new GlobalExceptionFilter());
        }
    }
}
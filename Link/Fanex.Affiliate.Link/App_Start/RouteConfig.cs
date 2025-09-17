namespace Fanex.Affiliate.Link
{
    using System.Web.Mvc;
    using System.Web.Routing;

    /// <summary>
    /// Route configuration.
    /// </summary>
    public class RouteConfig
    {
        private const string AFF_CODE_CONSTRAINT = @"\d+";
        private const string LANGUAGE_CONSTRAINT = @"^\w{2}(\w{2})?$";

        /// <summary>
        /// Register Routes.
        /// </summary>
        /// <param name="routes">Route Collection.</param>
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults:
                new
                {
                    controller = "Home",
                    action = "Index",
                    id = UrlParameter.Optional
                });

            routes.MapRoute(
               name: "ChannelLink",
               url: "{pageCode}/AffCode/{affCode}/{lang}/{channel}/index.html",
               defaults:
               new
               {
                   controller = "Home",
                   action = "Link",
                   pageCode = UrlParameter.Optional,
                   affCode = UrlParameter.Optional,
                   lang = UrlParameter.Optional,
                   channel = UrlParameter.Optional
               },
                constraints:
                new
                {
                    affCode = AFF_CODE_CONSTRAINT,
                    lang = LANGUAGE_CONSTRAINT
                });

            routes.MapRoute(
               name: "ChannelLinkWithoutChannel",
               url: "{pageCode}/AffCode/{affCode}/{lang}/index.html",
               defaults:
               new
               {
                   controller = "Home",
                   action = "Link",
                   pageCode = UrlParameter.Optional,
                   affCode = UrlParameter.Optional,
                   lang = UrlParameter.Optional
               },
               constraints:
               new
               {
                   affCode = AFF_CODE_CONSTRAINT,
                   lang = LANGUAGE_CONSTRAINT
               });

            routes.MapRoute(
               name: "NewChannelLink",
               url: "{pageCode}/{affCode}/{lang}/{channel}/index.html",
               defaults:
               new
               {
                   controller = "Home",
                   action = "Link",
                   pageCode = UrlParameter.Optional,
                   affCode = UrlParameter.Optional,
                   lang = UrlParameter.Optional,
                   channel = UrlParameter.Optional
               },
               constraints:
               new
               {
                   affCode = AFF_CODE_CONSTRAINT,
                   lang = LANGUAGE_CONSTRAINT
               });

            routes.MapRoute(
               name: "NewChannelLinkWithoutChannel",
               url: "{pageCode}/{affCode}/{lang}/index.html",
               defaults:
               new
               {
                   controller = "Home",
                   action = "Link",
                   pageCode = UrlParameter.Optional,
                   affCode = UrlParameter.Optional,
                   lang = UrlParameter.Optional
               },
               constraints:
               new
               {
                   affCode = AFF_CODE_CONSTRAINT,
                   lang = LANGUAGE_CONSTRAINT
               });

            routes.IgnoreRoute("go");
        }
    }
}
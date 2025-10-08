namespace Fanex.Affiliate.User.Core.Controllers
{
    using System;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Routing;
    using BusinessService;
    using CoreService;
    using Extensions;
    using ONEbook.UM.AspNetMVC.Filters;
    using Utilities;

    [CheckUMFilter]
    public class BaseController : Controller
    {

        public BaseController(
            ISessionService sessionService,
            ILanguageService languageService,
            IIpLocationService ipLocationService)
        {
            SessionService = sessionService;
            LanguageService = languageService;
            IpLocationService = ipLocationService;
        }

        protected ILanguageService LanguageService { get; }

        protected ISessionService SessionService { get; }

        protected IIpLocationService IpLocationService { get; }

        protected virtual string RouteName => Constants.RouteName.DefaultRoute;

        protected override void Initialize(RequestContext requestContext)
        {
            base.Initialize(requestContext);

            var favoriteLanguage = LanguageService.GetFavoriteLanguage();
            var currentCountry = LanguageService.GetCountry();
            var countryShort = IpLocationService.GetCountryFromIp(requestContext.HttpContext.Request.GetClientIP()).CountrySHORT;

            var sessionLang = SessionService.CurrentLanguage;
            var sessionCountry = SessionService.CurrentCountry;
            var sessionCountryShort = SessionService.CountryShort;

            if (favoriteLanguage != sessionLang)
            {
                requestContext.HttpContext.Response.Cookies.Add(new HttpCookie(AppSetting.Instance.SiteName.ToLowerInvariant() + "_afffavoritelang", favoriteLanguage) { HttpOnly = true });
                SessionService.CurrentLanguage = favoriteLanguage;
            }

            if (currentCountry != sessionCountry)
            {
                SessionService.CurrentCountry = currentCountry;
            }

            if (countryShort != sessionCountryShort)
            {
                SessionService.CountryShort = countryShort;
            }

            LanguageService.SetCulture(favoriteLanguage);
        }

        protected RedirectToRouteResult RedirectToFixedAction(string actionName, object routeValue)
        {
            var routeDic = new RouteValueDictionary(routeValue)
            {
                { "controller", RouteData.Values["controller"] },
                { "action", actionName }
            };
            var result = RedirectToRoute(RouteName, routeDic);
            return result;
        }

        public RedirectResult RedirectToAbsolutePath(string path)
        {
            if (Uri.IsWellFormedUriString(path, UriKind.Absolute))
            {
                return Redirect(path);
            }

            var absolutePath = VirtualPathUtility.ToAbsolute(path);
            return Redirect(absolutePath);
        }
    }
}

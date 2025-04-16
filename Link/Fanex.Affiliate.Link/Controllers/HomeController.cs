using System.Configuration;

namespace Fanex.Affiliate.Link.Controllers
{
    using System;
    using System.Text;
    using System.Web.Mvc;
    using Commands;
    using Fanex.Affiliate.Link.Constants;
    using Fanex.Affiliate.Link.DTOs;
    using Fanex.Affiliate.Link.Extensions;
    using Fanex.Logging;
    using Helpers;
    using Newtonsoft.Json;
    using ONEbook.UM.AspNetMVC.Filters;
    using Services.Impl;
    using Services.Interface;

    /// <summary>
    /// Home controller for affiliate link.
    /// </summary>
    [CheckUMFilter]
    public class HomeController : Controller
    {
        #region Services

        private readonly ITrackingSystemService _trackingSystemService;
        private readonly IAffInfoService _affInfoService;

        private const string LinkIsInvalidMessage = "This link does not exists. Please contact administrator!";
        private const string LinkIsIncorrectMessage = "This link is incorrect. Please contact administrator!";

        #endregion Services

        #region Constructor

        public HomeController()
        {
            _trackingSystemService = new TrackingSystemService();
            _affInfoService = new AffInfoService();
        }

        #endregion Constructor

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Error()
        {
            return View();
        }

        [HttpGet]
        public ActionResult PageNotFound()
        {
            return View();
        }

        public ActionResult Link(string pageCode, string affCode, string lang, string channel)
        {
            try
            {
                var affInfo = _affInfoService.GetAffInfoByAffCode(affCode);
                if (affInfo.AffId == 0 || string.IsNullOrEmpty(lang))
                {
                    ViewBag.Result = LinkIsInvalidMessage;

                    return View("Link");
                }

                return InsertAffiliate(affInfo.AffId, affInfo.AffCode, pageCode, lang, channel);
            }
            catch (Exception ex)
            {
                LogService.Error($"{ex.Message}", ex);
                ViewBag.Result = LinkIsIncorrectMessage;
                return View("Link");
            }
        }

        private ActionResult InsertAffiliate(int affId, string affCode, string pageCode, string lang, string channel)
        {
            if (Request.Url != null)
            {
                var urlReferrer = Request.UrlReferrer?.AbsoluteUri;
                var domainReferrer = Request.UrlReferrer?.Host;

                if (string.IsNullOrEmpty(urlReferrer) && !string.IsNullOrEmpty(Request["ref"]))
                {
                    urlReferrer = Request["ref"];
                    domainReferrer = Common.GetDomainReferrer(urlReferrer);
                }

                var affMediaLink = GetOriginalUrl();
                var affDomain = GetFullAffDomain(affMediaLink, pageCode);

                var command = new TrackingSystemCommand
                {
                    AffDomain = affDomain,
                    AffId = affId,
                    PageCode = pageCode,
                    LanguageCode = lang,
                    ChannelCode = channel,
                    DeviceType = GetDeviceType(),
                    IP = Request.GetClientIP(),
                    Browser = Request.Browser.Browser,
                    URLReferrer = urlReferrer,
                    DomainReferrer = domainReferrer,
                    OS = Common.GetOsName(Request.UserAgent),
                    Device = Common.GetDeviceName(Request.UserAgent),
                    BrowserVersion = Request.Browser.Version,
                    BrowserResolution = Request.Browser.ScreenPixelsWidth + "x" + Request.Browser.ScreenPixelsHeight,
                    BrowserLanguage = string.IsNullOrEmpty(Request.ServerVariables["HTTP_ACCEPT_LANGUAGE"])
                                              ? string.Empty
                                              : Request.ServerVariables["HTTP_ACCEPT_LANGUAGE"],
                    UserAgent = Request.UserAgent,
                    Country = Common.GetCountry(),
                    AffMediaLink = affMediaLink
                };

                var redirectUrl = _trackingSystemService.InsertStatistic(command);

                if (!string.IsNullOrEmpty(redirectUrl))
                {
                    WriteLogInfo(command, affCode);

                    var result = HandleRedirectUrl(redirectUrl, pageCode, command.LanguageCode);

                    return Redirect(result);
                }

                ViewBag.Result = LinkIsInvalidMessage;
            }

            return View("Link");
        }

        private string GetFullAffDomain(string url, string endPointOfAffDomain)
        {
            if (byte.Parse(ConfigurationManager.AppSettings["RemovePortFromUrl"]) == 1)
            {
                var uri = new Uri(url);
                url = url.Replace(":" + uri.Port, string.Empty);
            }

            const string slashString = "://";
            var pos1 = url.IndexOf(slashString, 0, StringComparison.OrdinalIgnoreCase);
            var pos2 = url.IndexOf("/" + endPointOfAffDomain, 0, StringComparison.OrdinalIgnoreCase);

            return url.Substring(pos1 + slashString.Length, pos2 - (pos1 + slashString.Length));
        }

        private string GetOriginalUrl()
        {
            var host = Request.Headers["Host"] ?? Request.Url.Host;
            var scheme = GetOriginalProtocol();
            var path = Request.Url.AbsolutePath;
            return $"{scheme}://{host}{path}";
        }

        private byte GetDeviceType()
        {
            return (byte)(Common.IsMobile() ? 1 : 0);
        }

        private string HandleRedirectUrl(string redirectUrl, string pageCode, string languageCode)
        {
            var mappingCode = MappingLanguageCodeOnMemberSite(languageCode);

            var redirectPattern = ConfigurationManager.AppSettings[$"Redirect_{pageCode.ToLowerInvariant()}_pattern"];
            if (!string.IsNullOrEmpty(redirectPattern))
            {
                var redirectUri = new Uri(redirectUrl);
                var path = redirectPattern.Replace("#language#", mappingCode);
                return $"{redirectUri.Scheme}://{redirectUri.Host}{path}{redirectUri.Query}";
            }
            else
            {
                return redirectUrl.Replace($"/{languageCode}/", $"/{mappingCode}/");
            }
        }

        private static string MappingLanguageCodeOnMemberSite(string languageCode)
        {
            if (Language.MappingShortedCodes.TryGetValue(languageCode.ToLowerInvariant(), out string mappingCode))
            {
                return mappingCode;
            }

            return languageCode;
        }

        private void WriteLogInfo(TrackingSystemCommand command, string affCode)
        {
            if (!command.RedirectPage.Contains(affCode))
            {
                var builder = new StringBuilder().AppendLine($"Link Go Info: {Request.Url}").AppendLine();
                builder.AppendLine("REQUEST INFO")
                       .AppendLine("RawUrl: " + Request.RawUrl)
                       .AppendLine("AffMediaLink: " + command.AffMediaLink)
                       .AppendLine("RedirectPage: " + command.RedirectPage)
                       .AppendLine("AffId: " + command.AffId)
                       .AppendLine("AffDomain: " + command.AffDomain)
                       .AppendLine("AffCode: " + affCode)
                       .AppendLine("PageCode: " + command.PageCode)
                       .AppendLine("ChannelCode: " + command.ChannelCode)
                       .AppendLine("LanguageCode: " + command.LanguageCode)
                       .AppendLine("DeviceType: " + command.DeviceType)
                       .AppendLine("IP: " + command.IP)
                       .AppendLine("Browser: " + command.Browser)
                       .AppendLine("Country: " + command.Country)
                       .AppendLine("Referrer: " + command.URLReferrer)
                       .AppendLine("DomainReferrer: " + command.DomainReferrer);

                LogService.Info(builder.ToString());
            }
        }

        private string GetOriginalProtocol()
        {
            var origProto = string.Empty;
            var cfVisitor = Request.ServerVariables[HeaderKey.HTTP_CF_VISITOR];

            if (!string.IsNullOrEmpty(cfVisitor))
            {
                var cfVisitorInfo = JsonConvert.DeserializeObject<CfVisitorInfo>(cfVisitor);

                origProto = cfVisitorInfo?.Scheme;
            }

            if (!string.IsNullOrEmpty(origProto))
            {
                return origProto;
            }

            var refLink = Request["Referer"];
            var url = string.IsNullOrWhiteSpace(refLink) ? Request.Url : new Uri(refLink);
            var protos = Request.ServerVariables[HeaderKey.HTTP_X_FORWARDED_PROTO]?.Split(',');

            return protos != null && protos.Length > 0 ? protos[0].Trim() : url.Scheme;
        }
    }
}
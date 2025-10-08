using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Optimization;
using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.Utilities;

namespace Fanex.Affiliate.User.Core.Extensions
{
    public static class HtmlHelperExtension
    {
        private const string ScriptTag = "script";
        private const string StyleTag = "style";

        public static IHtmlString InlineScripts(this HtmlHelper htmlHelper, string bundleVirtualPath)
        {
            return htmlHelper.InlineBundle(bundleVirtualPath, htmlTagName: ScriptTag);
        }

        public static IHtmlString InlineStyles(this HtmlHelper htmlHelper, string bundleVirtualPath)
        {
            return htmlHelper.InlineBundle(bundleVirtualPath, htmlTagName: StyleTag);
        }

        public static MvcHtmlString RenderPartialByLanguage(this HtmlHelper htmlHelper, string viewName, string language, object model = null)
        {
            try
            {
                return htmlHelper.Partial($"{viewName}.{language}.cshtml", model);
            }
            catch
            {
                return htmlHelper.Partial($"{viewName}.{AppSetting.Instance.DefaultLanguageCode}.cshtml", model);
            }
        }

        public static MvcHtmlString RenderPartialFilterPhCountry(this HtmlHelper htmlHelper, string viewName, string country, string language, object model = null)
        {
            try
            {
                return country != SystemLanguage.PhilippinesCountryCode 
                    ? RenderPartialByLanguage(htmlHelper, viewName, language, model) 
                    : htmlHelper.Partial($"{viewName}.{SystemLanguage.PhilippinesCountryCode}.{language}.cshtml", model);
            }
            catch
            {
                return htmlHelper.Partial($"{viewName}.{AppSetting.Instance.DefaultLanguageCode}.cshtml", model);
            }
        }

        private static IHtmlString InlineBundle(this HtmlHelper htmlHelper, string bundleVirtualPath, string htmlTagName)
        {
            string bundleContent = LoadBundleContent(htmlHelper.ViewContext.HttpContext, bundleVirtualPath);
            string htmlTag = string.Format("<{0}>{1}</{0}>", htmlTagName, bundleContent);

            return new HtmlString(htmlTag);
        }

        private static string LoadBundleContent(HttpContextBase httpContext, string bundleVirtualPath)
        {
            var bundleContext = new BundleContext(httpContext, BundleTable.Bundles, bundleVirtualPath);
            bundleContext.EnableOptimizations = true;
            var bundle = new Bundle(bundleVirtualPath).Include(bundleVirtualPath);
            var bundleResponse = bundle.GenerateBundleResponse(bundleContext);

            return bundleResponse.Content;
        }
    }
}

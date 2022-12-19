using Fanex.Affiliate.User.Core.Constants;
using System;

namespace Fanex.Affiliate.User.Core.Utilities
{
    public static class PathHelper
    {
        public static string GetLayoutPath(string layoutName, string siteName = null)
        {
            if (string.IsNullOrWhiteSpace(layoutName))
            {
                return layoutName;
            }

            return IsN88(siteName) ? $"~/Views/Shared/{siteName}/{layoutName}.cshtml" : $"~/Views/Shared/{layoutName}.cshtml";
        }

        public static string GetViewPath(string partialPath, string fileName, string siteName = null)
        {
            if (string.IsNullOrWhiteSpace(partialPath))
            {
                return partialPath;
            }

            return IsN88(siteName) ? $"~/Views/{partialPath}/{siteName}/{fileName}.cshtml" : $"~/Views/{partialPath}/{fileName}.cshtml";
        }

        private static bool IsN88(string siteName)
        {
            var validSiteName = GetValidSiteName(siteName);

            return string.Equals(validSiteName, SiteName.N88, StringComparison.CurrentCultureIgnoreCase);
        }

        private static string GetValidSiteName(string siteName)
        {
            if (!string.IsNullOrWhiteSpace(siteName) && SiteName.SupportedSiteNames.ContainsKey(siteName))
            {
                return siteName;
            }

            return AppSetting.Instance.SiteName;
        }
    }
}

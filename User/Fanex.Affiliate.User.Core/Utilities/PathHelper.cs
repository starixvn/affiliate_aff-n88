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

            var (isInclude, validSiteName) = IsIncludeSiteName(siteName);

            return isInclude ? $"~/Views/Shared/{validSiteName}/{layoutName}.cshtml" : $"~/Views/Shared/{layoutName}.cshtml";
        }

        public static string GetViewPath(string partialPath, string fileName, string siteName = null)
        {
            if (string.IsNullOrWhiteSpace(partialPath))
            {
                return partialPath;
            }

            var (isInclude, validSiteName) = IsIncludeSiteName(siteName);

            return isInclude ? $"~/Views/{partialPath}/{validSiteName}/{fileName}.cshtml" : $"~/Views/{partialPath}/{fileName}.cshtml";
        }

        private static (bool, string) IsIncludeSiteName(string siteName)
        {
            var validSiteName = GetValidSiteName(siteName);

            return (string.Equals(validSiteName, SiteName.N88, StringComparison.CurrentCultureIgnoreCase), validSiteName);
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

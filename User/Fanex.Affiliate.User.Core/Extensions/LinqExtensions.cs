namespace Fanex.Affiliate.User.Core.Extensions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Constants;
    using Utilities;

    public static class LinqExtensions
    {
        private static bool IsEqualIgnoreCase(string a, string b) =>
            string.Equals(a, b, StringComparison.InvariantCultureIgnoreCase);

        public static IEnumerable<T> FilterPhCountry<T>(this IEnumerable<T> source, Func<T, string> selector, string code)
        {
            if (AppSetting.Instance.SiteName != SiteName.N88)
            {
                return source;
            }

            const string phCode = SystemLanguage.PhilippinesCountryCode;

            return IsEqualIgnoreCase(code, phCode)
                ? source.Where(x => IsEqualIgnoreCase(selector(x), phCode))
                : source.Where(x => !IsEqualIgnoreCase(selector(x), phCode));
        }

        public static IEnumerable<T> FilterPhLanguage<T>(this IEnumerable<T> source, Func<T, string> selector, string code)
        {
            if (AppSetting.Instance.SiteName != SiteName.N88)
            {
                return source;
            }

            const string phCountryCode = SystemLanguage.PhilippinesCountryCode;
            const string phLanguageCode = SystemLanguage.EnglishLanguageCode;

            return IsEqualIgnoreCase(code, phCountryCode)
                ? source.Where(x => IsEqualIgnoreCase(selector(x), phLanguageCode))
                : source;
        }
    }
}

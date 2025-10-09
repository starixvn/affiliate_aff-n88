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

        public static IEnumerable<T> FilterSpecialCountry<T>(this IEnumerable<T> source, Func<T, string> selector, string code)
        {
            if (AppSetting.Instance.SiteName != SiteName.N88)
            {
                return source;
            }

            if (!string.IsNullOrEmpty(code) && SystemLanguage.SpecialCountry.ContainsKey(code))
            {
                return source.Where(x => IsEqualIgnoreCase(selector(x), code));
            }

            return source.Where(x => !SystemLanguage.SpecialCountry.ContainsKey(selector(x)));
        }

        public static IEnumerable<T> FilterLanguageByCountry<T>(this IEnumerable<T> source, Func<T, string> selector, string code)
        {
            if (AppSetting.Instance.SiteName != SiteName.N88)
            {
                return source;
            }

            if (!string.IsNullOrEmpty(code) && SystemLanguage.SpecialCountry.TryGetValue(code, out var supportLang))
            {
                return source.Where(x => supportLang.Contains(selector(x), StringComparer.OrdinalIgnoreCase));
            }

            return source;
        }
    }
}
namespace Fanex.Affiliate.User.Core.Utilities
{
    using System;
    using System.Text.RegularExpressions;

    public static class RegexHelper
    {
        private const int TimeOutSecond = 2;

        public static bool IsMatch(string input, string pattern)
        {
            return Regex.IsMatch(input, pattern, RegexOptions.None, TimeSpan.FromSeconds(TimeOutSecond));
        }

        public static string Replace(string input, string pattern, string replacement)
        {
            return Regex.Replace(input, pattern, replacement, RegexOptions.None, TimeSpan.FromSeconds(TimeOutSecond));
        }

        public static Match Match(string input, string pattern, RegexOptions regexOptions = RegexOptions.None)
        {
            return Regex.Match(input, pattern, regexOptions, TimeSpan.FromSeconds(TimeOutSecond));
        }

        public static bool IsMatch(string input, string pattern, RegexOptions regexOptions)
        {
            return Regex.IsMatch(input, pattern, regexOptions, TimeSpan.FromSeconds(TimeOutSecond));
        }

        public static string RegexContactApps(string name)
        {
            var regex = @".*";

            if (name == "Telegram")
            {
                regex = @"^(?!\s*$)(@.+)$";
            }

            return regex;
        }

        public static string AddPlaceHolders(string name)
        {
            var placeholder = string.Empty;
            if (name == "Telegram")
            {
                placeholder = "@xxxxxxxx";
            }

            return placeholder;
        }
    }
}

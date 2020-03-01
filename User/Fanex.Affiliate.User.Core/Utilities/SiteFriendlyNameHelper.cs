namespace Fanex.Affiliate.User.Core.Utilities
{
    public static class SiteFriendlyNameHelper
    {
        public static string Replace12Bet(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return text;
            }

            return text
                .Replace("12Bet", AppSetting.Instance.SiteFriendlyName)
                .Replace("12bet", AppSetting.Instance.SiteFriendlyName)
                .Replace("12BET", AppSetting.Instance.SiteFriendlyName);
        }

        public static string ReplaceHardcodeMailContact(this string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return text;
            }

            return text.Replace("affiliates@12csd.com", AppSetting.Instance.MailContact);
        }
    }
}
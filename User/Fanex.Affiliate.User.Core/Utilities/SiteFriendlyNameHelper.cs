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
                .Replace("12BET", AppSetting.Instance.SiteFriendlyName)
                .Replace("N88", AppSetting.Instance.SiteFriendlyName);
        }
    }
}
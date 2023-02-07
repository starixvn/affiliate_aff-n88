using System.Collections.Generic;

namespace Fanex.Affiliate.User.Core.Constants
{
    public static class SiteName
    {
        public const string N88 = "N88";
        public const string N8B = "N8B";
        public const string N8G = "N8G";

        public static IDictionary<string, string> SupportedSiteNames => new Dictionary<string, string>
        {
            [N88] = "N88",
            [N8B] = "N8B",
            [N8G] = "N8G"
        };
    }
}

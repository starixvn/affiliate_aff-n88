using System.Collections.Generic;

namespace Fanex.Affiliate.Link.Constants
{
    public static class Language
    {
        public static readonly IReadOnlyDictionary<string, string> MappingShortedCodes = new Dictionary<string, string>
        {
            { "bn", "bd" },
            { "ms", "my" },
            { "phen", "en" },
        };
    }
}
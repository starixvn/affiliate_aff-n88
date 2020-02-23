using System.Collections.Generic;

namespace Affiliate.N88.Jobs.Configurations
{
    public class LicenseeSiteSetting
    {
        public IEnumerable<string> SupportedSites { get; set; }

        public IEnumerable<LicenseeSiteMapping> LicenseeSiteMapping { get; set; }
    }

    public class LicenseeSiteMapping
    {
        public string SiteName { get; set; }

        public string SettingCodePrefix { get; set; }
    }
}
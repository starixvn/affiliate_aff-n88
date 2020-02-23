using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.Configurations
{
    public class LicenseeSiteSetting
    {
        public IEnumerable<string> SupportedSites  { get; set; }
        public IEnumerable<LicenseeSiteMapping> LicenseeSiteMapping { get; set; }
    }

    public class LicenseeSiteMapping
    {
        public string SiteName { get; set; }
        public string SettingCodePrefix { get; set; }
    }
}

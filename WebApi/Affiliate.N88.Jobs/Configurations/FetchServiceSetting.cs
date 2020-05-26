using System;
using System.Collections.Generic;

namespace Affiliate.N88.Jobs.Configurations
{
    public class FetchServiceSetting
    {
        public string PullInfoCron { get; set; }

        public DateTime DefaultPullDate { get; set; }

        public int AdjustmentTime { get; set; }

        public int MaxTimeRange { get; set; }

        public IEnumerable<string> SupportedPrefix { get; set; }

        public string DataSource { get; set; }
    }
}

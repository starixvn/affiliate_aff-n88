using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.Configurations
{
    public class TimeTrackerSetting
    {
        public IEnumerable<string> SourcePrefix { get; set; }

        public DateTime DefaultTime { get; set; }
    }
}

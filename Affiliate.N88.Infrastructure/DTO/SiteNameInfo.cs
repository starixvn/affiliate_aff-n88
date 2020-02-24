using Affiliate.N88.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.DTO
{
    public class SiteNameInfo : SettingInfo
    {
        public SiteNameInfo(IPrefixProvider prefixProvider) : base(prefixProvider)
        {
        }

        public override string SName => "SiteName";
    }
}

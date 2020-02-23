using Affiliate.N88.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.DTO
{
    public class MemberImportedTimeInfo : SettingInfo
    {
        public MemberImportedTimeInfo(IPrefixProvider prefixProvider) : base(prefixProvider) { }

        public override string SName => "MemberInfoLastImportedTime";
    }
}

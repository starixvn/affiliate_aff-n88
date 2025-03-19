using Affiliate.N88.Core;

namespace Affiliate.N88.DTO
{
    public class MemberImportedTimeInfo : SettingInfo
    {
        public MemberImportedTimeInfo(IPrefixProvider prefixProvider) : base(prefixProvider)
        {
        }

        public override string SName => "MemberInfoLastImportedTime";
    }
}

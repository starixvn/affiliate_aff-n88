using Affiliate.N88.Core;

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
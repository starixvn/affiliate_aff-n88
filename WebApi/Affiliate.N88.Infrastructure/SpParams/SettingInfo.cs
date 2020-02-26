using Affiliate.N88.Core;

namespace Affiliate.N88.DTO
{
    public  class SettingInfo : IdenticalSuffixNonQueryCommand
    {
        public SettingInfo(IPrefixProvider prefixProvider) : base(prefixProvider)
        {
        }

        public virtual string SName { get; set; }

        protected override string SuffixSettingKey => "Task_Aff_GetSetting";

        public override bool IsValid() => true;
    }
}

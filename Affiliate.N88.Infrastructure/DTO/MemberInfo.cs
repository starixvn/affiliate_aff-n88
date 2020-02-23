using Affiliate.N88.Core;
using System;

namespace Affiliate.N88.DTO
{
    public class MemberInfo : IdenticalSuffixNonQueryCommand
    {
        public MemberInfo(IPrefixProvider prefixProvider) : base(prefixProvider)
        { }

        public string XmlData { get; set; }
        public int ErrCode { get; set; } = 0;
        public string ErrMsg { get; set; } = String.Empty;

        protected override string SuffixSettingKey => "Task_Aff_MemberInfo_Import";

        public override bool IsValid() => true;
    }
}

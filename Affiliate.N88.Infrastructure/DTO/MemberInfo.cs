
using Affiliate.N88.Licensee;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Affiliate.N88.DTO
{
    public class MemberInfo<T> : MemberInfo
        where T : class, ILicenseeCodePrefix, new()
    {
        private readonly ILicenseeCodePrefix _prefix;
        private const string _suffix = "Task_Aff_MemberInfo_Import";

        public MemberInfo()
        {
            _prefix = new T();
        }

        public override string GetSettingKey() => $"{_prefix.GetCodePrefix()}_{_suffix}";

        public override bool IsValid() => true;
    }

    public abstract class MemberInfo : NonQueryCommand
    {
        public int SiteId { get; set; }
        public string XmlData { get; set; }
        public int ErrCode { get; set; } = 0;
        public string ErrMsg { get; set; } = String.Empty;
    }
}

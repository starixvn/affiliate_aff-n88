using Affiliate.N88.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.Repository
{
    public interface IMemberImportRepository
    {
        Task ImportMemberAsync(MemberInfo memberInfo);

        Task<DateTime> GetLastedMemberImportedTimeAsync(SettingInfo settingInfo);
    }
}

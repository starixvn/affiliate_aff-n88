using System;
using System.Threading.Tasks;
using Affiliate.N88.DTO;

namespace Affiliate.N88.Repository
{
    public interface IMemberImportRepository
    {
        Task ImportMemberAsync(InsertMemberInfoCommand memberInfo);

        Task<DateTime> GetLastedMemberImportedTimeAsync(MemberImportedTimeInfo settingInfo);

        Task<string> GetSiteNameAsync(SiteNameInfo settingInfo);
    }
}
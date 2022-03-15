using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Member;
using Fanex.Affiliate.Admin.Core.MetaModels.Member;

namespace Fanex.Affiliate.Admin.Core.Services.Member
{
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Major Code Smell", "S125:Sections of code should not be commented out", Justification = "<Pending>")]
    public interface IMemberService
    {
        EntityResult<MemberInfo> GetMemberList(MemberParam param);
    }
}

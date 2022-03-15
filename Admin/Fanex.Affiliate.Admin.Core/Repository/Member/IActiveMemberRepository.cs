using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Member;
using Fanex.Affiliate.Admin.Core.MetaModels.Member;

namespace Fanex.Affiliate.Admin.Core.Repository.Member
{
    public interface IActiveMemberRepository
    {
        AllMemberEntities GetAllMembers(string userNames);
    }
}

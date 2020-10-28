using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.Api;
using Fanex.Affiliate.User.Core.MetalModels;
using Fanex.Affiliate.User.Core.MetalModels.Email;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public interface IAccountService
    {
        Task<ResultInfo> CreateAffiliate(UserSignUpParam signUpParam, EmailBaseParam emailParam);

        MaxLevelInfo GetLevelAffiliate(int affId);

        Task<ResultInfo> CheckPlayerUserNameValid(string userName);

        Task<MemberSiteCustomerInfo> GetMemberSiteCustomer(string userName);
    }
}

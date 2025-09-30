using System.Threading.Tasks;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.Api;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.MetalModels;
using Fanex.Affiliate.User.Core.MetalModels.Email;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public interface IAccountService
    {
        AccountInformation GetAccountInfo(int affId);

        Task<ResultInfo> CreateAffiliateAsync(UserSignUpParam signUpParam, EmailBaseParam emailParam);

        GeneralAffInfo GetGeneralAffInfo(int? affId = null, string affCode = null);

        Task<ResultInfo> CheckAndUnlockUserIfLocked(string userName);

        Task<MemberSiteCustomerInfo> GetMemberSiteCustomer(string userName);
    }
}

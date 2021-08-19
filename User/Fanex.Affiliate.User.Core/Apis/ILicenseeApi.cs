using Fanex.Affiliate.User.Core.DTO.Api;
using Refit;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.Apis
{
    public interface ILicenseeApi
    {
        [Get("/api/customer/GetLoginCustomerInfo")]
        Task<MemberSiteCustomerInfo> GetCustomerInfoAsync(string userName, int siteId);

        [Post("/api/customer/UnlockUser")]
        Task<ApiResultInfo> UnlockUser(int[] userIds);
    }
}

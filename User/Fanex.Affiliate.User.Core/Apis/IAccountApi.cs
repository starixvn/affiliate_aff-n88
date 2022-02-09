using Fanex.Affiliate.User.Core.DTO.Api;
using Fanex.Affiliate.User.Core.MetalModels.Api;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.Apis
{
    public interface IAccountApi
    {
        [Post("/api/Account/SetCustActStatus")]
        Task<AccountApiResult> ActiveCustActStatus([Body] AccountParam account);
    }
}

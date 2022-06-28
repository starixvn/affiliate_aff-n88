using Affiliate.N88.WebApi.Models.Fake;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Controllers
{
    public class FakeController : ApiController
    {
        [HttpPost]
        public SetAccountResult SetCustActStatus(AccountParam param)
        {
            return new SetAccountResult
            {
                Data = false,
                ErrorCode = 99
            };
        }
    }
}

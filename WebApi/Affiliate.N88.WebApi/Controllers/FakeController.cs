using Affiliate.N88.WebApi.Models.Fake;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
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

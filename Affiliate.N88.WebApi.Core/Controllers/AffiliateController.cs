using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Core.Controllers
{
    public class AffiliateController : ApiController
    {
        [HttpGet]
        public async Task<IEnumerable<Affiliate>> TestMySql()
        {
            var leagues = await dynamicRepository.FetchAsync<Affiliate>(new GetAffiliatesCriteria());

            return leagues;
        }
    }
}

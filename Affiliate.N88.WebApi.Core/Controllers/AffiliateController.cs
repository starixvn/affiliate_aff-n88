using Affiliate.N88.WebApi.Core.DataParams;
using Fanex.Data.Repository;
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
        private readonly IDynamicRepository dynamicRepository;

        public AffiliateController(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<AffiliateParam>> Get()
        {
            var leagues = await dynamicRepository.FetchAsync<AffiliateParam>(new GetAffiliatesCriteria());

            return leagues;
        }
    }
}

using Affiliate.N88.Infrastructure.ApiModels;
using Affiliate.N88.Infrastructure.DTO;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Controllers
{
    public class AffiliateController : ApiController
    {
        private readonly IDynamicRepository dynamicRepository;

        public AffiliateController(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<AffiliateInfo>> Get()
        {
            var leagues = await dynamicRepository.FetchAsync<AffiliateInfo>(new GetAffiliatesCriteria());

            return leagues;
        }
    }
}

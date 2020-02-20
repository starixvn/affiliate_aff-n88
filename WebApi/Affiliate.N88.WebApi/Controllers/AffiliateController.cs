using Affiliate.N88.Infrastructure.ApiModels;
using Affiliate.N88.Infrastructure.DTO;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
        public async Task<IEnumerable<AffiliateModel>> Get()
        {
            var leagues = await dynamicRepository.FetchAsync<AffiliateParam>(new GetAffiliatesCriteria());

            return leagues.Select(l => new AffiliateModel 
            {
                AffiliateId = l.AffiliateId,
                CustId = l.CustId,
                SiteId = l.SiteId
            });
        }
    }
}

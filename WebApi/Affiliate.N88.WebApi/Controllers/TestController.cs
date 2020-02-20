using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Fanex.Data.Repository;

namespace Affiliate.N88.WebApi.Controllers
{
    public class TestController : ApiController
    {
        private readonly IDynamicRepository dynamicRepository;

        public TestController(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Affiliate>> TestMySql()
        {
            var leagues = await dynamicRepository.FetchAsync<Affiliate>(new GetAffiliatesCriteria());

            return leagues;
        }
    }

    public class Affiliate
    {
        public Affiliate(string affiliateId, int custId, int siteId)
        {
            AffiliateId = affiliateId;
            CustId = custId;
            SiteId = siteId;
        }


        public string AffiliateId { get; }

        public int CustId { get; }

        public int SiteId { get; }
    }


    public class GetAffiliatesCriteria : CriteriaBase
    {
        public GetAffiliatesCriteria()
        {
        }

        public override string GetSettingKey() => "N8G_AffiliateSel";

        public override bool IsValid() => true;
    }
}
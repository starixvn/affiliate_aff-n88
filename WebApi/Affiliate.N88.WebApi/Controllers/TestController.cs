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
        public async Task<IEnumerable<League>> TestMySql()
        {
            var leagues = await dynamicRepository.FetchAsync<League>(new GetActiveLeaguesCriteria());

            return leagues;
        }
    }

    public class League
    {
        public League()
        {
        }

        public League(string id, string name)
        {
            Id = id;
            Name = name;
        }

        public string Id { get; private set; }

        public string Name { get; private set; }
    }

    public class GetActiveLeaguesCriteria : CriteriaBase
    {
        public GetActiveLeaguesCriteria()
        {
        }

        public string LanguageCode => "en-US";

        public override string GetSettingKey() => "League_GetActive";

        public override bool IsValid() => true;
    }
}
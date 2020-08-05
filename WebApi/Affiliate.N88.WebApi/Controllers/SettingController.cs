using Affiliate.N88.Models;
using Affiliate.N88.SpParams.Criteria;
using Fanex.Data.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Controllers
{
    public class SettingController : ApiController
    {
        private readonly IDynamicRepository _dynamicRepository;

        public SettingController(IDynamicRepository dynamicRepository)
        {
            _dynamicRepository = dynamicRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<ServerInfo>> GetServerInfo()
            => await _dynamicRepository.FetchAsync<ServerInfo>(new GetServerInfoCriteria());

        [HttpGet]
        public async Task<IEnumerable<TpGameTypeInfo>> GetTpGameType()
            => await _dynamicRepository.FetchAsync<TpGameTypeInfo>(new GetTpGameTypeCriteria());
    }
}

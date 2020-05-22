using Affiliate.N88.Models;
using Affiliate.N88.SpParams.Criteria;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Management;

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
        {
            return await _dynamicRepository.FetchAsync<ServerInfo>(new GetServerInfoCriteria());
        }

        [HttpGet]
        public async Task<IEnumerable<TpGameTypeInfo>> GetTpGameType()
        {
            return await _dynamicRepository.FetchAsync<TpGameTypeInfo>(new GetTpGameTypeCriteria());
        }
    }
}

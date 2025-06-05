using Affiliate.N88.Models;
using Affiliate.N88.Params;
using Affiliate.N88.SpParams.Criteria;
using Fanex.Data.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Controllers
{
    public class Product9WController : ApiController
    {

        private readonly IDynamicRepository dynamicRepository;

        public Product9WController(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<TpReport9W>> GetTpReport([FromUri] BatchCountParam param)
            => await dynamicRepository.FetchAsync<TpReport9W>(new GetTpReport9WCriteria
            {
                SQ = param.SQ,
                FromDate = param.FromDate,
                ToDate = param.ToDate,
                BatchCount = param.BatchCount
            });

        [HttpGet]
        public async Task<IEnumerable<TpWager9W>> GetTpWager([FromUri] BatchCountParam param)
            => await dynamicRepository.FetchAsync<TpWager9W>(new GetTpWager9WCriteria
            {
                CreateTime = param.CreateTime,
                FromDate = param.FromDate,
                ToDate = param.ToDate,
                BatchCount = param.BatchCount
            });
    }
}
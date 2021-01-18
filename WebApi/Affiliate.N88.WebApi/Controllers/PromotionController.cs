using Affiliate.N88.Models;
using Affiliate.N88.SpParams.Criteria;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Controllers
{
    public class PromotionController : ApiController
    {
        private IDynamicRepository Repo { get; }
        
        public PromotionController(IDynamicRepository dynamicRepository)
        {
            Repo = dynamicRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<PromotionModel>> GetPromtions(DateTime fromDate, DateTime toDate)
            => await Repo.FetchAsync<PromotionModel>(new GetPromotionCriteria(fromDate, toDate));

        [HttpGet]
        public async Task<IEnumerable<PromotionSpecificModel>> GetPromotionSpecifics(DateTime fromDate, DateTime toDate)
            => await Repo.FetchAsync<PromotionSpecificModel>(new GetPromotionSpecificCriteria(fromDate, toDate));
    }
}

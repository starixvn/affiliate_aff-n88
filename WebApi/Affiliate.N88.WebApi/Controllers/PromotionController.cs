using Affiliate.N88.Models;
using Affiliate.N88.SpParams.Criteria;
using Affiliate.N88.WebApi.Repository;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Controllers
{
    public class PromotionController : ApiController
    {
        private IDynamicRepository DynamicRepo { get; }
        
        public PromotionController(IDynamicRepository dynamicRepository)
        {
            DynamicRepo = dynamicRepository;
        }


        [HttpGet]
        public async Task<IEnumerable<PromotionModel>> GetPromotions(DateTime fromDate, DateTime toDate)
            => await DynamicRepo.FetchAsync<PromotionModel>(new GetPromotionCriteria(fromDate, toDate));

        [HttpGet]
        public async Task<IEnumerable<PromotionSpecificModel>> GetPromotionSpecifics(DateTime fromDate, DateTime toDate)
            => await DynamicRepo.FetchAsync<PromotionSpecificModel>(new GetPromotionSpecificCriteria(fromDate, toDate));
    }
}

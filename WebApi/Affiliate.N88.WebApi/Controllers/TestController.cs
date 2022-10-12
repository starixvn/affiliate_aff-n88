
using Affiliate.N88.Models;
using Affiliate.N88.SpParams.Criteria;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Controllers
{
    [AllowAnonymous]
    public class TestController : ApiController
    {
        private readonly IDynamicRepository dynamicRepository;

        public TestController(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IEnumerable<TransBetRecordInfo>> GetBetRecord(DateTime fromDate, DateTime toDate, int pageIndex, int pageSize = 2000)
        {
            var betlist = await dynamicRepository.FetchAsync<TransBetRecordInfo>(new GetNewTpBetRecond(fromDate, toDate, pageIndex, pageSize));
            return betlist;
        }
    }

    internal class GetNewTpBetRecond : GetBetRecordCriteria
    {
        public GetNewTpBetRecond(DateTime fromDate, DateTime toDate, int pageIdex, int pageSize) : base(fromDate, toDate, pageIdex, pageSize)
        {
        }

        public override string GetSettingKey() => "N88_Get_TpBetRecord_Dynamic";
    }
}
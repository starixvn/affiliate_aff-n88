using Affiliate.N88.Models;
using Affiliate.N88.SpParams.Criteria;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Controllers
{
    public class BetReportController : ApiController
    {
        private readonly IDynamicRepository dynamicRepository;

        public BetReportController(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<BetRecordInfo>> GetBetRecord(DateTime fromDate, DateTime toDate)
        {
            var betlist = await dynamicRepository.FetchAsync<BetRecordInfo>(new GetBetRecordCriteria(fromDate, toDate));
            return betlist;
        }

        [HttpGet]
        public async Task<IEnumerable<TpTransferInfo>> GetTpTransferInfo(int id, int totalRow)
            => await dynamicRepository.FetchAsync<TpTransferInfo>(new GetTpTransferInfoCriteria(id, totalRow));

        [HttpGet]
        public async Task<IEnumerable<DepositInfo>> GetDepositInfo(int id, int totalRow)
            => await dynamicRepository.FetchAsync<DepositInfo>(new GetDepositInfoCriteria(id, totalRow));
    }
}
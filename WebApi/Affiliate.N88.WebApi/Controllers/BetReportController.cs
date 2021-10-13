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
        public async Task<IEnumerable<TransBetRecordInfo>> GetBetRecord(DateTime fromDate, DateTime toDate, int pageIndex, int pageSize = 2000)
        {
            var betlist = await dynamicRepository.FetchAsync<TransBetRecordInfo>(new GetBetRecordCriteria(fromDate, toDate, pageIndex, pageSize));
            return betlist;
        }

        [HttpGet]
        public async Task<IEnumerable<TpTransferInfo>> GetTpTransferInfo(int id, int totalRow)
            => await dynamicRepository.FetchAsync<TpTransferInfo>(new GetTpTransferInfoCriteria(id, totalRow));

        [HttpGet]
        public async Task<IEnumerable<DepositInfo>> GetDepositInfo(int id, int totalRow)
            => await dynamicRepository.FetchAsync<DepositInfo>(new GetDepositInfoCriteria(id, totalRow));

        [HttpGet]
        public async Task<IEnumerable<Bonus>> GetBonusInfo(int id, int batchCount = 2000)
            => await dynamicRepository.FetchAsync<Bonus>(new GetBonusInfoCriteria(id, batchCount));

        [HttpGet]
        public async Task<IEnumerable<Withdrawal>> GetWithdrawalInfo(int id, int batchCount = 2000)
            => await dynamicRepository.FetchAsync<Withdrawal>(new GetWithdrawalInfoCriteria(id, batchCount)); 
    }
}
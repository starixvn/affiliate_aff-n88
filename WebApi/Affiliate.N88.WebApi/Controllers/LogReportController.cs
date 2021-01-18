using Affiliate.N88.Models;
using Affiliate.N88.SpParams.Criteria;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Controllers
{
    public class LogReportController : ApiController
    {
        public IDynamicRepository Repo { get; }

        public LogReportController(IDynamicRepository repo)
        {
            Repo = repo;
        }

        [HttpGet]
        public async Task<IEnumerable<RebateMLogModel>> GetRebateMLogs(DateTime fromDate, DateTime toDate)
            => await Repo.FetchAsync<RebateMLogModel>(new GetRebateMLogCriteria(fromDate, toDate));
    }
}

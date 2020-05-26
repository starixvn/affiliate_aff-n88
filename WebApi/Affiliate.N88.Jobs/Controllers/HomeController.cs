using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.RecurringTasks;
using Affiliate.N88.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ILicenseeApi _licenseeApi;
        private readonly IFetchBetRecordDataTask _fetchBetRecordService;

        public HomeController(ILicenseeApi lincenseeApi, IFetchBetRecordDataTask fetchBetRecordService)
        {
            _licenseeApi = lincenseeApi;
            _fetchBetRecordService = fetchBetRecordService;
        }

        [HttpGet]
        [HttpGet("Index")]
        public Task<string> Index()
        {
            return Task.FromResult("Site is running in api");
        }

        [HttpGet("GetCustomers")]
        public async Task<IEnumerable<AffCustomerModel>> GetAffCustomerAsync(DateTime date)
        {
            return await _licenseeApi.GetAffCustomerAsync(date);
        }

        [HttpGet("GetBetRecord")]
        public async Task<IEnumerable<BetRecordInfo>> GetBetRecord(DateTime fromDate, DateTime toDate)
        {
            return await _licenseeApi.GetBetRecordAsync(fromDate, toDate);
        }

        [HttpGet("PullBetRecord")]
        public async Task<string> PullBetRecord(DateTime fromDate, DateTime toDate)
        {
            await _fetchBetRecordService.FetchDataAsync(fromDate, toDate);
            return "Finished Pull";
        }
    }
}
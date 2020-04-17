using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Affiliate.N88.Jobs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        private readonly ILicenseeApi _licenseeApi;

        public ApiController(ILicenseeApi lincenseeApi)
        {
            _licenseeApi = lincenseeApi;
        }

        [HttpGet]
        public async Task<IEnumerable<CustomerModel>> GetCustomers(DateTime date)
        {
            return await _licenseeApi.GetCustomerAsync(date);
        }

        [HttpGet]
        public async Task<IEnumerable<BetRecordInfo>> GetBetRecord(DateTime fromDate, DateTime toDate)
        {
            return await _licenseeApi.GetBetRecordAsync(fromDate, toDate);
        }
    }
}
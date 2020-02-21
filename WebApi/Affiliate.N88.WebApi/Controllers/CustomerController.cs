using Affiliate.N88.Infrastructure.ApiModels;
using Affiliate.N88.Infrastructure.DTO;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Controllers
{
    public class CustomerController : ApiController
    {
        private readonly IDynamicRepository dynamicRepository;

        public CustomerController(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<CustomerModel>> GetCustomers(DateTime fromDate)
        {
            var customerList = await dynamicRepository.FetchAsync<CustomerInfo>(new GetCustomersCriteria(fromDate));

            return customerList.Select(c => new CustomerModel 
            {
                ActStatus = c.ActStatus,
                AgentId = c.AgentId,
                AllAgentId = c.AllAgentId,
                CurrencyId = c.CurrencyId,
                CustId = c.CustId,
                RegTime = c.RegTime,
                SiteId = c.SiteId,
                Status = c.Status,
                UserName = c.UserName
            });
        }
    }
}
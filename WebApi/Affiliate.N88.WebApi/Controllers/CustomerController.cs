using Affiliate.N88.Infrastructure.DTO;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
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
        public async Task<IEnumerable<CustomerInfo>> GetCustomers(DateTime fromDate)
        {
            var customerList = await dynamicRepository.FetchAsync<CustomerInfo>(new GetCustomersCriteria(fromDate));

            return customerList;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Affiliate.N88.DTO;
using Affiliate.N88.Models;
using Affiliate.N88.SpParams;
using Fanex.Data.Repository;

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
                SiteName = c.SiteName,
                CurrencyId = c.CurrencyId,
                CustId = c.CustId,
                RegTime = c.RegTime,
                SiteId = c.SiteId,
                Status = c.Status,
                UserName = c.UserName,
                AffId = c.AffId,
                FirstDepositDate = c.FirstDepositTime,
                IsTest = c.IsTest
            });
        }
    }
}
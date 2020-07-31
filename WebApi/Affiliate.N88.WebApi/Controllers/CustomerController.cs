using Affiliate.N88.DTO;
using Affiliate.N88.Models;
using Affiliate.N88.SpParams.Commands;
using Affiliate.N88.SpParams.Criteria;
using Fanex.Data.Repository;
using Fanex.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
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
        public async Task<IEnumerable<AffCustomerModel>> GetAffCustomers(DateTime fromDate)
        {
            var customerList = await dynamicRepository.FetchAsync<AffCustomerInfo>(new GetAffCustomersCriteria(fromDate));

            return customerList.Select(c => new AffCustomerModel
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

        [HttpGet]
        public async Task<IEnumerable<CustomerInfo>> GetCustomers(DateTime fromDate)
            => await dynamicRepository.FetchAsync<CustomerInfo>(new GetCustomersCriteria(fromDate));

        [HttpGet]
        public async Task<IEnumerable<CustWalletInfo>> GetCustWallets(DateTime fromDate)
            => await dynamicRepository.FetchAsync<CustWalletInfo>(new GetCustWalletCriteria(fromDate));
            
        [HttpGet]
        public async Task<CustomerInfo> GetLoginCustomerInfo(string userName, int siteId)
            => await dynamicRepository.GetAsync<CustomerInfo>(new GetLoginCustInfoCriteria() { UserName = userName, SiteId = siteId });
            
        [HttpPost]
        public async Task<decimal> UpdateCustomerWallet(PaymentRequestInfo payment)
        {
            await LogService.InfoAsync($"Recevice update wallet request\n" +
                $"Param: {JsonConvert.SerializeObject(payment)}\n" +
                $"RequestIp: ${GetIpAddress()}");
            var criteria = new UpdateCustomerWalletCommand
            {
                Amount = payment.Amount,
                AfterAmount = 0,
                CustId = payment.CustId,
                Memo = payment.Memo,
                RefTransId = payment.RefTransId,
                SiteId = payment.SiteId,
                Type = payment.Type,
                UserName = payment.UserName
            };

            await dynamicRepository.ExecuteAsync(criteria);
            await LogService.InfoAsync($"AfterAmount: {criteria.AfterAmount}");
            return criteria.AfterAmount;
        }

        private string GetIpAddress()
        {
            System.Web.HttpContext context = System.Web.HttpContext.Current;
            string ipAddress = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipAddress))
            {
                string[] addresses = ipAddress.Split(',');
                if (addresses.Length != 0)
                {
                    return addresses[0];
                }
            }

            return context.Request.ServerVariables["REMOTE_ADDR"];
        }
    }
}
using Affiliate.N88.Models;
using Affiliate.N88.Params;
using Affiliate.N88.SpParams.Commands;
using Affiliate.N88.SpParams.Criteria;
using Affiliate.N88.WebApi.Models;
using Fanex.Data.Repository;
using Fanex.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Controllers
{
    public class CustomerController : ApiController
    {
        private const int _Marketing_Cust_ID = -1;
        private readonly IDynamicRepository dynamicRepository;

        public CustomerController(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<AffCustomerModel>> GetAffCustomers(DateTime fromDate, DateTime toDate, int pageIndex, int pageSize = 2000)
        {
            return await dynamicRepository.FetchAsync<AffCustomerModel>(new GetAffCustomersCriteria(fromDate, toDate, pageIndex, pageSize));
        }

        [HttpGet]
        public async Task<IEnumerable<CustomerInfo>> GetCustomers(DateTime fromDate, DateTime toDate, int pageIndex, int pageSize = 2000)
            => await dynamicRepository.FetchAsync<CustomerInfo>(new GetCustomersCriteria(fromDate, toDate, pageIndex, pageSize));

        [HttpGet]
        public async Task<IEnumerable<CustomerInfo>> GetFixedCustomers()
            => await dynamicRepository.FetchAsync<CustomerInfo>(new GetFixedCustomerCriteria());

        [HttpGet]
        public async Task<IEnumerable<CustWalletInfo>> GetCustWallets(DateTime fromDate)
            => await dynamicRepository.FetchAsync<CustWalletInfo>(new GetCustWalletCriteria(fromDate));

        [HttpGet]
        public async Task<CustomerInfo> GetLoginCustomerInfo(string userName, int siteId)
        {
            CustomerInfo cust = null;
            if (!HasNonASCIIChars(userName))
            {
                cust = await dynamicRepository.GetAsync<CustomerInfo>(new GetLoginCustInfoCriteria() { UserName = userName, SiteId = siteId });
            }
            return cust;
        }

        [HttpGet]
        public async Task<IEnumerable<CustRegModel>> GetCustomerRegInfo(long unixTime)
        {
            var infos = await dynamicRepository.FetchAsync<CustRegInfo>(new GetCustRegInfoCriteria(unixTime));
            return infos.Select(i => new CustRegModel
            {
                CustId = i.CustId,
                RegTime = DateTimeOffset.Parse(i.RegTime),
                SignUpUrl = i.SignUpUrl,
                SiteId = i.SiteId
            });
        }

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

        [HttpGet]
        public async Task<IEnumerable<CustBonusRolloverModel>> GetCustBonusRollOvers(int id, int batchCount = 2000)
            => await dynamicRepository.FetchAsync<CustBonusRolloverModel>(new GetCustBonusRolloverCriteria(id, batchCount));

        [HttpGet]
        public async Task<IEnumerable<CustClosingBalanceModel>> GetCustClosingBalance(DateTime lastGetTime, int pageIndex, int pageSize = 2000)
            => await dynamicRepository.FetchAsync<CustClosingBalanceModel>(new GetCustClosingBalanceCriteria(lastGetTime, pageIndex, pageSize));

        [HttpPost]
        public async Task<ResultInfo> UnlockUser(int[] userIds)
        {
            try
            {
                var json = BuildJson(userIds);
                await dynamicRepository.ExecuteAsync(new UnlockUsersCommand { CustIdList = json });
                return new ResultInfo
                {
                    IsSuccess = true
                };
            }
            catch (Exception ex)
            {
                return new ResultInfo
                {
                    IsSuccess = false,
                    ErrMsg = ex.Message
                };
            }
        }

        [HttpPost]
        public async Task<ResultInfo> InsertAffiliateInfo(AffiliateInfoParam affiliate)
        {
            try
            {
                await dynamicRepository.ExecuteAsync(new InsertAffiliateInfoCommand
                {
                    AffiliateId = affiliate.AffiliateId,
                    AffiliateCode = affiliate.AffiliateCode,
                    AffiliateName = affiliate.AffiliateName,
                    CustId = affiliate.CustId == 0 ? _Marketing_Cust_ID : affiliate.CustId,
                    ParentAffiliate = affiliate.ParentAffiliate ?? string.Empty,
                    SiteId = affiliate.SiteId,
                    UserName = affiliate.UserName ?? string.Empty,
                    FirstName = affiliate.FirstName ?? string.Empty,
                    LastName = affiliate.LastName ?? string.Empty,
                    ContactNumber = affiliate.ContactNumber ?? string.Empty,
                    Email = affiliate.Email ?? string.Empty,
                    Status = affiliate.Status ?? string.Empty
                });
                return new ResultInfo { IsSuccess = true };
            }
            catch (Exception ex)
            {
                return new ResultInfo
                {
                    IsSuccess = false,
                    ErrMsg = ex.Message
                };
            }
        }

        [HttpGet]
        public async Task<IEnumerable<CustBalanceInfo>> GetCustBalance([FromUri]int[] ids)
        {
            var json = BuildJson(ids);
            return await dynamicRepository.FetchAsync<CustBalanceInfo>(new GetCustBalanceCriteria(json));
        }

        [HttpGet]
        public async Task<IEnumerable<VipUpgradeReviewInfo>> GetVipUpgradeReviews(DateTime monthDate, int pageIndex, int pageSize)
        {
            var txtMonthDate = monthDate.ToString("yyyyMM");
            return await dynamicRepository.FetchAsync<VipUpgradeReviewInfo>(new GetVipUpgradeReviewCriteria
            {
                MonthDate = txtMonthDate,
                PageIndex = pageIndex,
                PageSize = pageSize
            });
        }

        [HttpPost]
        public async Task<ResultInfo> TransferMoneyToPlayer(TransferMoneyParam param)
        {
            await LogService.InfoAsync($"Receive transfer money request\n" +
                $"Param: {JsonConvert.SerializeObject(param)}\n" +
                $"RequestIp: ${GetIpAddress()}");

            var command = new TransferMoneyToPlayerCommand
            {
                SiteId = param.SiteId,
                ErrCode = 0,
                FromAmount = param.FromAmount,
                FromCustId = param.FromCustId,
                MaxTransferAmount = param.MaxTransferAmount,
                RefTransId = param.RefTransId,
                ToAmount = param.ToAmount,
                ToCustId = param.ToCustId,
            };
            try
            {
                await dynamicRepository.ExecuteAsync(command);
            }
            catch (Exception ex)
            {
                await LogService.ErrorAsync($"{ex.Message}");
                throw;
            }

            await LogService.InfoAsync($"ErrCode: {command.ErrCode}");
            return new ResultInfo
            {
                ErrMsg = command.ErrCode.ToString(),
                IsSuccess = command.ErrCode == 0
            };
        }

        [HttpGet]
        public async Task<IEnumerable<CustVerificationReward>> GetCustVerificationRewards(DateTime lastGetTime, string conditionField, int batchCount = 2000)
            => await dynamicRepository.FetchAsync<CustVerificationReward>(new GetCustVerificationRewardCriteria(lastGetTime, conditionField, batchCount));

        private static string BuildJson(int[] userIds)
            => $"[{string.Join(",", userIds)}]";

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

        private static bool HasNonASCIIChars(string str)
            => Encoding.UTF8.GetByteCount(str) != str.Length;
    }
}
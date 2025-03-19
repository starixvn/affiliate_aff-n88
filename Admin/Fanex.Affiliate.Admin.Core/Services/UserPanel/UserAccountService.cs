using Fanex.Affiliate.Admin.Core.Configurations;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Customer;
using Fanex.Affiliate.Admin.Core.DTO.UserPanel;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Affiliate.Admin.Core.MetaModels.UserPanel;
using Fanex.Affiliate.Admin.Core.Repository.UserPanel;
using Fanex.Affiliate.Admin.Core.Resources;
using Fanex.Affiliate.Admin.Core.Services.ThirdPartyLicensee;
using Fanex.Affiliate.Admin.Core.Utilities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fanex.Affiliate.Admin.Core.Services.UserPanel
{
    public class UserAccountService : IUserAccountService
    {
        private readonly IUserAccountRepository _userAccountRepository;
        private readonly ILicenseeService _licenseeService;
        private readonly IAppSetting _appSetting;
        private readonly IAffiliateService _affiliateService;
        private readonly IThirdPartyLicenseeService _thirdPartyLicenseeService;

        private const int TEST_CURRENCY_ID = 20;

        public UserAccountService(IUserAccountRepository userAccountRepository,
            ILicenseeService licenseeService,
            IAppSetting appSetting,
            IAffiliateService affiliateService,
            IThirdPartyLicenseeService thirdPartyLicenseeService)
        {
            _userAccountRepository = userAccountRepository;
            _licenseeService = licenseeService;
            _appSetting = appSetting;
            _affiliateService = affiliateService;
            _thirdPartyLicenseeService = thirdPartyLicenseeService;
        }

        public UserAccount GetUserAccountInfo(int affId)
        {
            return _userAccountRepository.GetUserAccountInfo(affId);
        }

        public (IEnumerable<PaymentMethodInfo> paymentMethods, decimal minAmount) GetPaymentMethod()
        {
            return _userAccountRepository.GetPaymentMethod();
        }

        public async Task<ResultInfo> UpdateUserAccountAsync(UserAccountParam param)
        {
            var validateWebSite = ValidateWebSite(param);
            if (!validateWebSite.IsSuccessful)
            {
                return validateWebSite;
            }

            var isValidPaymentMethod = ValidatePaymentMethod(param);

            var curUserAccInfo = GetUserAccountInfo(param.AffId);

            if (isValidPaymentMethod)
            {
                if (PaymentMethod.PlayerAccount.Equals(param.PreferredPayment) && curUserAccInfo.PlayerUsername != param.PlayerUsername)
                {
                    var memberSiteId = _appSetting.MemberSiteId;
                    var memberSiteCust = await _licenseeService
                        .GetMemberSiteCustomerInfo(param.PlayerUsername, memberSiteId);

                    var result = _licenseeService.CheckCustomerIsValid(memberSiteCust);

                    if (!result.IsSuccessful)
                    {
                        return result;
                    }
                    param.Player_CustId = memberSiteCust.CustId;
                    param.Player_Currency = memberSiteCust.IsTest.GetValueOrDefault() ? TEST_CURRENCY_ID : memberSiteCust.CurrencyId.GetValueOrDefault();
                }

                var updateResult = _userAccountRepository.UpdateUserAccount(param);

                if(updateResult.IsSuccessful)
                {
                    await SendAffiliateInfoToLicensee(param.AffId, curUserAccInfo);
                }

                return updateResult;
            }

            return new ResultInfo
            {
                Code = ErrCode.GeneralErrorCode,
                Message = Lang.UpdateIsFailed
            };
        }

        private ResultInfo ValidateWebSite(UserAccountParam param)
        {
            if (param.HasWebSite && string.IsNullOrEmpty(param.SiteUrl))
            {
                return new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = "Website URL is required"
                };
            }

            if (!param.HasWebSite && string.IsNullOrEmpty(param.NoSiteDescription))
            {
                return new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = $"Please describe how you would like to promote {_appSetting.SiteFriendlyName} if you don't have the URL is required"
                };
            }

            return new ResultInfo();
        }

        private static bool ValidatePaymentMethod(UserAccountParam param)
        {
            var isPlayerUsername = (PaymentMethod.PlayerAccount.Equals(param.PreferredPayment))
                                        && !string.IsNullOrEmpty(param.PlayerUsername);
            var isMoneybookersEmail = PaymentMethod.Moneybookers.Equals(param.PreferredPayment) && !string.IsNullOrEmpty(param.MoneybookersEmail);
            var isBankTranfer = PaymentMethod.Wire.Equals(param.PreferredPayment) && IsValidWirePaymentMethod(param);

            return isPlayerUsername || isMoneybookersEmail || isBankTranfer;
        }

        private static bool IsValidWirePaymentMethod(UserAccountParam param)
        {
            return !(string.IsNullOrEmpty(param.BankName) || string.IsNullOrEmpty(param.BankAddress) ||
                string.IsNullOrEmpty(param.BankAccountName) || string.IsNullOrEmpty(param.BankAccountNumber));
        }

        private async Task SendAffiliateInfoToLicensee(int affId, UserAccount curInfo)
        {
            try
            {
                var affInfo = _affiliateService.GetAffiliateBasicInfo(affId);

                if (affInfo != null)
                {
                    bool isSameAffInfo = affInfo.FirstName.MatchWith(curInfo.FirstName)
                        && affInfo.LastName.MatchWith(curInfo.LastName)
                        && affInfo.Email.MatchWith(curInfo.Email)
                        && affInfo.ContactNumber.MatchWith(curInfo.Phone);

                    bool isUpdatedSensitiveInfo = !isSameAffInfo || !affInfo.PlayerUsername.MatchWith(curInfo.PlayerUsername);

                    if (isUpdatedSensitiveInfo)
                    {
                        await _thirdPartyLicenseeService.SendAffiliateInfo(affInfo);
                    }
                }
            }
            catch (Exception ex)
            {
                LogHelper.WriteError(ex);
            }
        }
    }
}

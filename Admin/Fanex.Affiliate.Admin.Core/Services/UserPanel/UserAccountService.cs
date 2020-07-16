using Fanex.Affiliate.Admin.Core.Configurations;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.UserPanel;
using Fanex.Affiliate.Admin.Core.MetaModels.UserPanel;
using Fanex.Affiliate.Admin.Core.Repository;
using Fanex.Affiliate.Admin.Core.Repository.UserPanel;
using Fanex.Affiliate.Admin.Core.Resources;

namespace Fanex.Affiliate.Admin.Core.Services.UserPanel
{
    public class UserAccountService : IUserAccountService
    {
        private readonly IUserAccountRepository _userAccountRepository;
        private readonly IAppSetting _appSetting;

        public UserAccountService(IUserAccountRepository userAccountRepository, IAppSetting appSetting)
        {
            _userAccountRepository = userAccountRepository;
            _appSetting = appSetting;
        }

        public UserAccount GetUserAccountInfo(int affId)
        {
            return _userAccountRepository.GetUserAccountInfo(affId);
        }

        public ResultInfo UpdateUserAccount(UserAccountParam param)
        {
            var validateWebSite = ValidateWebSite(param);
            if (!validateWebSite.IsSuccessful)
            {
                return validateWebSite;
            }

            var isValidPaymentMethod = ValidatePaymentMethod(param);
            if(isValidPaymentMethod)
            {
                if(PaymentMethod.PlayerAccount.Equals(param.PreferredPayment))
                {
                    var isValid = _userAccountRepository.CheckPlayerUserName(param.AffId, param.PlayerUsername);

                    if(!isValid)
                    {
                        return new ResultInfo
                        {
                            Code = Code.GeneralErrorCode,
                            Message = $"{_appSetting.SiteFriendlyName} User Name is invalid!."
                        };
                    }
                }
                return _userAccountRepository.UpdateUserAccount(param);
            }

            return new ResultInfo
            {
                Code = Code.GeneralErrorCode,
                Message = Lang.UpdateIsFailed
            };
        }

        private ResultInfo ValidateWebSite(UserAccountParam param)
        {
            if(param.HasWebSite && string.IsNullOrEmpty(param.SiteUrl))
            {
                return new ResultInfo
                {
                    Code = Code.GeneralErrorCode,
                    Message = "Website URL is required"
                };
            }

            if (!param.HasWebSite && string.IsNullOrEmpty(param.NoSiteDescription))
            {
                return new ResultInfo
                {
                    Code = Code.GeneralErrorCode,
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
    }
}

using System.Collections.Generic;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.MetalModels;
using Fanex.Affiliate.User.Core.MetalModels.Email;
using Fanex.Affiliate.User.Core.Repository.UserPanel;
using Fanex.Affiliate.User.Core.Resources;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;

        private readonly IEmailService _emailService;

        private static readonly IDictionary<int, string> MessageByCode = new Dictionary<int, string>
        {
            [101] = Lang.errUserNotFound,
            [102] = Lang.errExistAccount
        };

        public AccountService(IAccountRepository accountRepository, IEmailService emailService)
        {
            _accountRepository = accountRepository;
            _emailService = emailService;
        }

        public ResultInfo CreateAffiliate(UserSignUpParam signUpParam, EmailBaseParam emailParam)
        {
            if (!signUpParam.IsLocal)
            {
                var depositAccount = _accountRepository.GetDepositPlayerAccount(signUpParam.Player_UserName);

                if (!depositAccount.IsValid)
                {
                    return new ResultInfo { IsOk = false, Message = Lang.errDepositDBConnectFailed };
                }
            }

            var result = _accountRepository.CreateAffiliate(signUpParam);
            if (result.IsOk)
            {
                emailParam.MailTo = signUpParam.Email;
                emailParam.User = new UserInfo
                {
                    PreferredLanguage = signUpParam.PreferredLanguage,
                    FirstName = signUpParam.FirstName
                };

                _emailService.SendSignUpEmail(emailParam);

                var csdEmailParam = new NoticeEmailParam
                {
                    MailTo = emailParam.MailContact,
                    MailBcc = emailParam.MailBcc,
                    MailCc = emailParam.MailCc,
                    MailContact = emailParam.MailContact,
                    FirstName = signUpParam.FirstName,
                    LastName = signUpParam.LastName,
                    UserName = signUpParam.UserName,
                    SiteUrl = signUpParam.SiteUrl,
                    MoreSiteUrls = signUpParam.MoreSiteUrls,
                    NoSiteDesc = signUpParam.NoSiteDesc
                };

                _emailService.SendNoticeEmailToCsd(csdEmailParam);
            }

            return result;
        }
    }
}
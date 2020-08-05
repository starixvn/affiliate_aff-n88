using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Affiliate.User.Core.Apis;
using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.MetalModels;
using Fanex.Affiliate.User.Core.MetalModels.Email;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.Repository.UserPanel;
using Fanex.Affiliate.User.Core.Resources;
using Fanex.Affiliate.User.Core.UnitTests.TestHelper;
using Fanex.Affiliate.User.Core.Utilities;
using Moq;
using Newtonsoft.Json;
using Xunit;

namespace Fanex.Affiliate.User.Core.UnitTests.BusinessService
{
    public class AccountServiceTest
    {
        [Theory]
        [InlineData(true)]
        [InlineData(false)]
        public async Task CreateAffiliate_ValidDepositAccountInfo_CallRepositoryByEnvironment(bool isLocalTest)
        {
            // Arrange
            var signUpParam = new UserSignUpParam { IsLocal = isLocalTest };
            var accountRepository = new Mock<IAccountRepository>();
            accountRepository.Setup(ac => ac.GetDepositPlayerAccount(It.IsAny<string>())).Returns(new DepositAccountInfo { Success = 0 });
            accountRepository.Setup(ac => ac.CreateAffiliate(signUpParam)).Returns(new ResultInfo());

            var accountService = CreateAccountService(accountRepository.Object);
            var times = isLocalTest ? Times.Never() : Times.Once();

            // Action
            await accountService.CreateAffiliate(signUpParam, new EmailBaseParam());

            // Assert
            accountRepository.Verify(ac => ac.CreateAffiliate(signUpParam), Times.Once);
            accountRepository.Verify(ac => ac.GetDepositPlayerAccount(It.IsAny<string>()), times);
        }

        [Fact]
        public async Task CreateAffiliate_InvalidPlayerDepositInfo_DoNotCallRepository()
        {
            // Arrange
            const string PlayerUserName = "player";
            var depositAccount = new DepositAccountInfo { Success = 1 };
            var signUpParam = new UserSignUpParam { Player_UserName = PlayerUserName };
            var accountRepository = new Mock<IAccountRepository>();
            accountRepository.Setup(ac => ac.GetDepositPlayerAccount(PlayerUserName)).Returns(depositAccount);
            accountRepository.Setup(ac => ac.CreateAffiliate(signUpParam)).Returns(new ResultInfo { IsOk = false, Message = "Failed" });

            var accountService = CreateAccountService(accountRepository.Object);

            // Action
            await accountService.CreateAffiliate(signUpParam, new EmailBaseParam());

            // Assert
            accountRepository.Verify(ac => ac.CreateAffiliate(signUpParam), Times.Never);
        }

        [Fact]
        public async Task CreateAffiliate_InvalidPlayerDepositInfo_ReturnExpectedResult()
        {
            // Arrange
            var signUpParam = new UserSignUpParam { IsLocal = false };
            var accountRepository = new Mock<IAccountRepository>();
            accountRepository.Setup(ac => ac.GetDepositPlayerAccount(It.IsAny<string>())).Returns(new DepositAccountInfo { Success = 1 });
            accountRepository.Setup(ac => ac.CreateAffiliate(signUpParam)).Returns(new ResultInfo { IsOk = false, Message = "Failed" });

            var accountService = CreateAccountService(accountRepository.Object);

            var expectedResult = new ResultInfo { IsOk = false, Message = Lang.errDepositDBConnectFailed };

            // Action
            var result = await accountService.CreateAffiliate(signUpParam, new EmailBaseParam());

            // Assert
            Assert.Equal(expectedResult.IsOk, result.IsOk);
            Assert.Equal(expectedResult.Message, result.Message);
        }

        [Fact]
        public async Task CreateAffiliate_CreateSuccessfully_ReturnCorrectResult()
        {
            // Arrange
            var expectedResultInfo = new ResultInfo { IsOk = true };
            var signUpParam = new UserSignUpParam { IsLocal = true };
            var accountRepository = new Mock<IAccountRepository>();
            accountRepository.Setup(ac => ac.CreateAffiliate(signUpParam)).Returns(expectedResultInfo);

            var accountService = CreateAccountService(accountRepository.Object);

            // Action
            var result = await accountService.CreateAffiliate(signUpParam, new EmailBaseParam());

            // Assert
            Assert.Equal(expectedResultInfo, result);
        }

        [Fact]
        public async Task CreateAffiliate_CreateSuccessfully_SendEmailToUserWithCorrectParameter()
        {
            // Arrange
            EmailBaseParam passedParam = null;

            var signUpParam = new UserSignUpParam { IsLocal = true, Email = Constant.DefaultMailUser };
            var accountRepository = GetMockAccountRepository(signUpParam: signUpParam);

            var emailService = new Mock<IEmailService>();
            emailService.Setup(e => e.SendSignUpEmail(It.IsAny<EmailBaseParam>())).Callback<EmailBaseParam>(p => passedParam = p);

            var accountService = CreateAccountService(accountRepository, emailService.Object);

            var expectedEmailParam = CreateEmailParam();
            expectedEmailParam.MailTo = signUpParam.Email;
            expectedEmailParam.User = new UserInfo
            {
                PreferredLanguage = signUpParam.PreferredLanguage,
                FirstName = signUpParam.FirstName
            };
            var expectedResult = JsonConvert.SerializeObject(expectedEmailParam);

            var emailParam = CreateEmailParam();

            // Action
            await accountService.CreateAffiliate(signUpParam, emailParam);
            var result = JsonConvert.SerializeObject(passedParam);

            // Assert
            emailService.Verify(e => e.SendSignUpEmail(It.IsAny<EmailBaseParam>()), Times.Once);
            Assert.Equal(expectedResult, result);
        }

        [Fact]
        public async Task CreateAffiliate_CreateSuccessfully_SendEmailToCsdWithCorrectParameter()
        {
            // Arrange
            const string ExpectedCsdEmail = Constant.DefaultMailContact;
            NoticeEmailParam passedParam = null;

            var signUpParam = new UserSignUpParam { IsLocal = true, Email = Constant.DefaultMailUser };
            var accountRepository = GetMockAccountRepository(signUpParam: signUpParam);

            var emailService = new Mock<IEmailService>();
            emailService.Setup(e => e.SendNoticeEmailToCsd(It.IsAny<NoticeEmailParam>()))
                            .Callback<NoticeEmailParam>(p => passedParam = p);

            var accountService = CreateAccountService(accountRepository, emailService.Object);

            var emailParam = CreateEmailParam();

            // Action
            await accountService.CreateAffiliate(signUpParam, emailParam);

            // Assert
            emailService.Verify(e => e.SendNoticeEmailToCsd(It.IsAny<NoticeEmailParam>()), Times.Once);
            Assert.Equal(ExpectedCsdEmail, passedParam.MailTo);
            Assert.Equal(Constant.DefaultUserName, passedParam.UserName);
        }

        private static AccountService CreateAccountService(IAccountRepository repository, IEmailService emailService = null)
        {
            return new AccountService(repository, emailService ?? Mock.Of<IEmailService>(), Mock.Of<ILicenseeApi>(), Mock.Of<IAppSetting>());
        }

        private DepositAccountInfo GetDepositAccount()
        {
            return new DepositAccountInfo
            {
                Success = 0,
                AffiliateId = Constant.DefaultAffId,
                AgentId = 1,
                BonusCode = "Code",
                Country = "Brazil",
                DepositUserId = 2,
                DepositUserName = Constant.DefaultUserName,
                Email = Constant.DefaultMailUser,
                FirstName = "test",
                LastName = "test",
                OddsType = "OddsType",
                Password = "1234aa"
            };
        }

        private IAccountRepository GetMockAccountRepository(UserSignUpParam signUpParam = null)
        {
            var accountRepository = new Mock<IAccountRepository>();
            signUpParam = signUpParam ?? new UserSignUpParam { IsLocal = true };
            accountRepository.Setup(ac => ac.CreateAffiliate(signUpParam))
                    .Returns(new ResultInfo { IsOk = true })
                    .Callback<UserSignUpParam>(p =>
                    {
                        p.UserName = Constant.DefaultUserName;
                    });

            return accountRepository.Object;
        }

        private EmailBaseParam CreateEmailParam()
        {
            return new EmailBaseParam
            {
                MailCc = Constant.DefaultMailCc,
                MailContact = Constant.DefaultMailContact,
                RootDomain = Constant.DefaultRootDomain,
                MailBcc = string.Empty
            };
        }
    }
}
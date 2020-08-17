using System.Threading.Tasks;
using Fanex.Affiliate.User.Core.Apis;
using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.Constants.Apis;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.Api;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.MetalModels;
using Fanex.Affiliate.User.Core.MetalModels.Email;
using Fanex.Affiliate.User.Core.Repository.UserPanel;
using Fanex.Affiliate.User.Core.Resources;
using Fanex.Affiliate.User.Core.UnitTests.TestHelper;
using Fanex.Affiliate.User.Core.Utilities;
using Moq;
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
            accountRepository.Setup(ac => ac.CreateAffiliate(signUpParam)).Returns(new ResultInfo());
            var mockApi = new Mock<ILicenseeApi>();
            mockApi.Setup(a => a.GetCustomerInfoAsync(It.IsAny<string>(), It.IsAny<int>()))
                            .ReturnsAsync(new MemberSiteCustomerInfo { Status = CustomerStatus.RUNNING });

            var accountService = CreateAccountService(accountRepository.Object, mockApi.Object);

            // Action
            await accountService.CreateAffiliateAsync(signUpParam, new EmailBaseParam());

            // Assert
            accountRepository.Verify(ac => ac.CreateAffiliate(signUpParam), Times.Once);
        }

        [Fact]
        public async Task CreateAffiliate_InvalidPlayerDepositInfo_DoNotCallRepository()
        {
            // Arrange
            const string PlayerUserName = "player";
            var signUpParam = new UserSignUpParam { Player_UserName = PlayerUserName };
            var accountRepository = new Mock<IAccountRepository>();
            accountRepository.Setup(ac => ac.CreateAffiliate(signUpParam)).Returns(new ResultInfo { IsOk = false, Message = "Failed" });

            var accountService = CreateAccountService(accountRepository.Object);

            // Action
            await accountService.CreateAffiliateAsync(signUpParam, new EmailBaseParam());

            // Assert
            accountRepository.Verify(ac => ac.CreateAffiliate(signUpParam), Times.Never);
        }

        [Fact]
        public async Task CreateAffiliate_InvalidPlayerDepositInfo_ReturnExpectedResult()
        {
            // Arrange
            var signUpParam = new UserSignUpParam { IsLocal = false };
            var accountRepository = new Mock<IAccountRepository>();
            accountRepository.Setup(ac => ac.CreateAffiliate(signUpParam)).Returns(new ResultInfo { IsOk = false, Message = "Failed" });

            var mockApi = new Mock<ILicenseeApi>();
            mockApi.Setup(a => a.GetCustomerInfoAsync(It.IsAny<string>(), It.IsAny<int>()))
                            .ReturnsAsync(new MemberSiteCustomerInfo { Status = CustomerStatus.CLOSED });

            var expectedResult = new ResultInfo { IsOk = false, Message = Lang.UserNameClosed };

            var accountService = CreateAccountService(accountRepository.Object, mockApi.Object);

            // Action
            var result = await accountService.CreateAffiliateAsync(signUpParam, new EmailBaseParam());

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
            var mockApi = new Mock<ILicenseeApi>();
            accountRepository.Setup(ac => ac.CreateAffiliate(signUpParam)).Returns(expectedResultInfo);
            mockApi.Setup(a => a.GetCustomerInfoAsync(It.IsAny<string>(), It.IsAny<int>()))
                 .ReturnsAsync(new MemberSiteCustomerInfo { Status = CustomerStatus.RUNNING });

            var accountService = CreateAccountService(accountRepository.Object, mockApi.Object);

            // Action
            var result = await accountService.CreateAffiliateAsync(signUpParam, new EmailBaseParam());

            // Assert
            Assert.Equal(expectedResultInfo, result);
        }

        [Fact]
            var mockApi = new Mock<ILicenseeApi>();
            mockApi.Setup(a => a.GetCustomerInfoAsync(It.IsAny<string>(), It.IsAny<int>()))
                .ReturnsAsync(new MemberSiteCustomerInfo { Status = CustomerStatus.RUNNING });
        public async Task CreateAffiliate_CreateSuccessfully_SendEmailToCsdWithCorrectParameter()
        {
            // Arrange
            const string ExpectedCsdEmail = Constant.DefaultMailContact;
            NoticeEmailParam passedParam = null;

            var signUpParam = new UserSignUpParam { IsLocal = true, Email = Constant.DefaultMailUser };
            var accountRepository = GetMockAccountRepository(signUpParam: signUpParam);

            var emailService = new Mock<IEmailService>();
            var mockApi = new Mock<ILicenseeApi>();
            emailService.Setup(e => e.SendNoticeEmailToCsd(It.IsAny<NoticeEmailParam>()))
                            .Callback<NoticeEmailParam>(p => passedParam = p);
            mockApi.Setup(a => a.GetCustomerInfoAsync(It.IsAny<string>(), It.IsAny<int>()))
                            .ReturnsAsync(new MemberSiteCustomerInfo { Status = CustomerStatus.RUNNING });

            var accountService = CreateAccountService(accountRepository, mockApi.Object, emailService.Object);

            var emailParam = CreateEmailParam();

            // Action
            await accountService.CreateAffiliateAsync(signUpParam, emailParam);

            // Assert
            emailService.Verify(e => e.SendNoticeEmailToCsd(It.IsAny<NoticeEmailParam>()), Times.Once);
            Assert.Equal(ExpectedCsdEmail, passedParam.MailTo);
            Assert.Equal(Constant.DefaultUserName, passedParam.UserName);
        }

        private static AccountService CreateAccountService(IAccountRepository repository, ILicenseeApi api = null,IEmailService emailService = null)
        {
            return new AccountService(repository, emailService ?? Mock.Of<IEmailService>(), api ?? Mock.Of<ILicenseeApi>(), Mock.Of<IAppSetting>());
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
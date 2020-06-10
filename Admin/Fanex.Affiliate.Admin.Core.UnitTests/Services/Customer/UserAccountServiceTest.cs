using Fanex.Affiliate.Admin.Core.Configurations;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.UserPanel;
using Fanex.Affiliate.Admin.Core.MetaModels.UserPanel;
using Fanex.Affiliate.Admin.Core.Repository.UserPanel;
using Fanex.Affiliate.Admin.Core.Services.UserPanel;
using Moq;
using System.Collections.Generic;
using Xunit;

namespace Fanex.Affiliate.Admin.Core.UnitTests.Services.Customer
{
    public class UserAccountServiceTest
    {
        [Fact]
        public void GetUserAccountInfo_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var param = 1271808;
            var passedParam = 0;
            var repository = new Mock<IUserAccountRepository>();
            repository.Setup(comm => comm.GetUserAccountInfo(param)).Returns(new UserAccount { AffId = 1271808 }).Callback<int>(p => passedParam = p);
            var service = CreateUserAccountService(repository.Object);

            // Action
            var result = service.GetUserAccountInfo(param);

            // Assert
            Assert.Equal(param, result.AffId);
            Assert.Equal(param, passedParam);
        }

        [Fact]
        public void UpdateUserAccount_WhenCallWithValid_ExcuteSuccessfully()
        {
            // Arrange
            var param = GetUserAccountParam();
            UserAccountParam passedParam = null;
            var repository = new Mock<IUserAccountRepository>();
            repository.Setup(comm => comm.UpdateUserAccount(param)).Returns(new ResultInfo()).Callback<UserAccountParam>(p => passedParam = p);
            var service = CreateUserAccountService(repository.Object);

            // Action
            var result = service.UpdateUserAccount(param);

            // Assert
            Assert.True(result.IsSuccessful);
            Assert.Equal(param, passedParam);
        }

        [Fact]
        public void UpdateUserAccount_WhenCallWithValidPlayerAccount_ExcuteSuccessfully()
        {
            // Arrange
            var repository = new Mock<IUserAccountRepository>();
            repository.Setup(comm => comm.CheckPlayerUserName(It.IsAny<int>(), "123")).Returns(true);
            repository.Setup(comm => comm.UpdateUserAccount(It.IsAny<UserAccountParam>())).Returns(new ResultInfo());
            var service = CreateUserAccountService(repository.Object);

            // Action
            var result = service.UpdateUserAccount(new UserAccountParam { PreferredPayment = "Player", PlayerUsername = "123", NoSiteDescription = "abc" });

            // Assert
            Assert.True(result.IsSuccessful);
        }

        [Fact]
        public void UpdateUserAccount_WhenCallWithInvalidPlayerAccount_ReturnError()
        {
            // Arrange
            var appSetting = new Mock<IAppSetting>();
            appSetting.Setup(ap => ap.SiteFriendlyName).Returns("N88");
            var repository = new Mock<IUserAccountRepository>();
            repository.Setup(comm => comm.CheckPlayerUserName(It.IsAny<int>(), "123")).Returns(false);
            var service = CreateUserAccountService(repository.Object, appSetting.Object);

            // Action
            var result = service.UpdateUserAccount(new UserAccountParam { PreferredPayment = "Player", PlayerUsername = "123", NoSiteDescription = "abc" });

            // Assert
            Assert.False(result.IsSuccessful);
            Assert.Equal("N88 User Name is invalid!.", result.Message);
        }

        [Fact]
        public void UpdateUserAccount_WhenCallWithInvalidNoSiteDescription_ReturnError()
        {
            // Arrange
            var service = CreateUserAccountService();

            // Action
            var result = service.UpdateUserAccount(new UserAccountParam());

            // Assert
            Assert.False(result.IsSuccessful);
            Assert.Equal("Please describe how you would like to promote  if you don't have the URL is required", result.Message);
        }

        [Fact]
        public void UpdateUserAccount_WhenCallWithInvalidSiteUrl_ReturnError()
        {
            // Arrange
            var service = CreateUserAccountService();

            // Action
            var result = service.UpdateUserAccount(new UserAccountParam { HasWebSite = true });

            // Assert
            Assert.False(result.IsSuccessful);
            Assert.Equal("Website URL is required", result.Message);
        }

        [Fact]
        public void UpdateUserAccount_WhenCallWithInvalidPaymentMethod_ReturnError()
        {
            // Arrange
            var service = CreateUserAccountService();

            // Action
            var result = service.UpdateUserAccount(new UserAccountParam { PreferredPayment = "Wire", NoSiteDescription = "abc" });

            // Assert
            Assert.False(result.IsSuccessful);
            Assert.Equal("Update is failed!", result.Message);
        }

        private static UserAccountService CreateUserAccountService(
            IUserAccountRepository userAccountRepository = null,
            IAppSetting appSeting = null)
        {
            var fakeUserAccountRepository = userAccountRepository ?? Mock.Of<IUserAccountRepository>();
            var fakeAppSetting = appSeting ?? Mock.Of<IAppSetting>();

            return new UserAccountService(fakeUserAccountRepository, fakeAppSetting);
        }

        private static UserAccountParam GetUserAccountParam()
        {
            return new UserAccountParam
            {
                AffId = 1271808,
                FirstName = "Hinh",
                LastName = "Lê Văn",
                Gender = false,
                Email = "abc@gmail.com",
                Phone = "01234567899",
                ContactApps = "[{'Name':'MSN / YM / QQ','Value':'@123 Lê Văn','Order':0}]",
                Address = "Test",
                City = "test",
                State = "700000",
                Postcode = "700000",
                Country = "Viet Nam",
                MoreSiteUrls = "www.sportsbookie.com",
                SiteUrl = "https://ha.nexdev.net:7634/N88User/UserPanel/Main/#MyAccount",
                PreferredPayment = "Wire",
                PlayerUsername = "bettingexp",
                NoSiteDescription = "test",
                NetellerAccountId = "1",
                MoneybookersEmail = "abc@gmail.com",
                BankName = "Test",
                BankAddress = "test",
                BankCode = "test",
                BankAccountName = "test",
                BankAccountNumber = "test",
                MailOption = false,
                ContactAppList = new List<ContactApp> { new ContactApp { Name = "MSN/YM/QQ", Value = "@123 Lê Văn", Order = 0 } }
            };
        }
    }
}

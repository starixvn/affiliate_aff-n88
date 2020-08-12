using Fanex.Affiliate.Admin.Core.Apis;
using Fanex.Affiliate.Admin.Core.DTO.Api;
using Fanex.Affiliate.Admin.Core.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Fanex.Affiliate.Admin.Core.UnitTests.Services
{
    public class LicenseeServiceTest
    {

        [Fact]
        public void CheckCustomerIsValid_WhenCall_ReturnTrue()
        {
            // Arrange
            var lisenseeApi = new Mock<ILicenseeApi>();
            lisenseeApi.Setup(l => l.GetCustomerInfoAsync(It.IsAny<string>(), It.IsAny<int>())).Returns(Task.FromResult(new MemberSiteCustomerInfo { Status = 1 }));

            var service = CreateLicenseeService(lisenseeApi.Object);

            // Action
            var result = service.CheckCustomerIsValid("abc", 123);

            // Assert
            Assert.True(result.Result.IsSuccessful);
        }

        [Fact]
        public void CheckCustomerIsValid_WhenCallWithNull_ReturnError()
        {
            // Arrange
            var service = CreateLicenseeService();

            // Action
            var result = service.CheckCustomerIsValid(null);

            // Assert
            Assert.False(result.IsSuccessful);
            Assert.Equal("The payment account you entered does not exist. Please check again.", result.Message);
        }

        [Fact]
        public void CheckCustomerIsValid_WhenCallWithSusspen_ReturnError()
        {
            // Arrange
            var service = CreateLicenseeService();

            // Action
            var result = service.CheckCustomerIsValid(new MemberSiteCustomerInfo { Status = 2 });

            // Assert
            Assert.False(result.IsSuccessful);
            Assert.Equal("The payment account you entered is Suspended. Please check again.", result.Message);
        }

        [Fact]
        public void CheckCustomerIsValid_WhenCallWithClosed_ReturnError()
        {
            // Arrange
            var service = CreateLicenseeService();

            // Action
            var result = service.CheckCustomerIsValid(new MemberSiteCustomerInfo { Status = 3 });

            // Assert
            Assert.False(result.IsSuccessful);
            Assert.Equal("The payment account you entered is Closed. Please check again.", result.Message);
        }

        [Fact]
        public void CheckCustomerIsValid_WhenCallWithInvalidStatus_ReturnError()
        {
            // Arrange
            var service = CreateLicenseeService();

            // Action
            var result = service.CheckCustomerIsValid(new MemberSiteCustomerInfo { Status = 123 });

            // Assert
            Assert.False(result.IsSuccessful);
            Assert.Equal("Have err when call API", result.Message);
        }

        [Fact]
        public void CheckCustomerIsValid_WhenCallWithStatusNull_ReturnError()
        {
            // Arrange
            var service = CreateLicenseeService();

            // Action
            var result = service.CheckCustomerIsValid(new MemberSiteCustomerInfo { Status = null });

            // Assert
            Assert.False(result.IsSuccessful);
        }

        [Fact]
        public void UpdatePaymentRequest_WhenCallWithMountZero_ReturnError()
        {
            // Arrange
            var service = CreateLicenseeService();

            // Action
            var result = service.UpdatePaymentRequest(new PaymentRequestInfo());

            // Assert
            Assert.False(result.Result.IsSuccessful);
        }

        [Fact]
        public void UpdatePaymentRequest_WhenCall_UpdateFailed()
        {
            // Arrange
            var param = new PaymentRequestInfo();
            var lisenseeApi = new Mock<ILicenseeApi>();
            lisenseeApi.Setup(l => l.UpdatePaymentRequestAsync(param)).Returns(Task.FromResult(-10m));

            var service = CreateLicenseeService(lisenseeApi.Object);

            // Action
            var result = service.UpdatePaymentRequest(param);

            // Assert
            Assert.False(result.Result.IsSuccessful);
        }

        [Fact]
        public void UpdatePaymentRequest_WhenCall_UpdateSuccessfully()
        {
            // Arrange
            var param = new PaymentRequestInfo { Amount = 100m };
            var lisenseeApi = new Mock<ILicenseeApi>();
            lisenseeApi.Setup(l => l.UpdatePaymentRequestAsync(param)).Returns(Task.FromResult(100m));

            var service = CreateLicenseeService(lisenseeApi.Object);

            // Action
            var result = service.UpdatePaymentRequest(param);

            // Assert
            Assert.True(result.Result.IsSuccessful);
        }

        private static LicenseeService CreateLicenseeService(ILicenseeApi licenseeApi = null)
        {
            var fakeLicenseeApi = licenseeApi ?? Mock.Of<ILicenseeApi>();

            return new LicenseeService(fakeLicenseeApi);
        }
    }
}

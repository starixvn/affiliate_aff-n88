using Fanex.Affiliate.Admin.Core.DTO.Common;
using Fanex.Affiliate.Admin.Core.Services.Common;
using Fanex.Affiliate.Admin.Core.UnitTests.Common;
using System.Collections.Generic;
using System.Web;
using System.Web.SessionState;
using Xunit;

namespace Fanex.Affiliate.Admin.Core.UnitTests.Services.Common
{
    public class SessionServiceTest
    {
        [Fact]
        public void PropertyUserId_WhenCall_UserIdCorrectly()
        {
            MockSession.SetUpHttpContextSession();
            var service = CreateService();
            var userId = 123;

            service.UserId = userId;

            Assert.Equal(userId, service.UserId);
        }

        [Fact]
        public void PropertyUserId_WhenCall_ReturnZero()
        {
            MockSession.SetUpHttpContextSession();
            var service = CreateService();

            Assert.Equal(0, service.UserId);
        }

        [Fact]
        public void PropertyOnUserId_WhenCall_OnUserIdCorrectly()
        {
            MockSession.SetUpHttpContextSession();
            var service = CreateService();
            var onUserId = 123;

            service.OnUserId = onUserId;

            Assert.Equal(onUserId, service.OnUserId);
        }

        [Fact]
        public void PropertyOnUserId_WhenCall_ReturnZero()
        {
            MockSession.SetUpHttpContextSession();
            var service = CreateService();

            Assert.Equal(0, service.OnUserId);
        }

        [Fact]
        public void PropertyAffName_WhenCall_AffIdCorrectly()
        {
            MockSession.SetUpHttpContextSession();
            var service = CreateService();
            var affName = "abc";

            service.AffName = affName;

            Assert.Equal(affName, service.AffName);
        }

        [Fact]
        public void PropertyAffName_WhenCall_ReturnEmpty()
        {
            MockSession.SetUpHttpContextSession();
            var service = CreateService();

            Assert.Equal(string.Empty, service.AffName);
        }

        [Fact]
        public void PropertyUserPermissionList_WhenCall_UserPermissionListCorrectly()
        {
            MockSession.SetUpHttpContextSession();
            var service = CreateService();

            service.UserPermissionList = new List<UserPermission> { new UserPermission() };

            Assert.Single(service.UserPermissionList);
        }

        [Fact]
        public void PropertyUserPermissionList_WhenCall_ReturnEmpty()
        {
            MockSession.SetUpHttpContextSession();
            var service = CreateService();

            Assert.Empty(service.UserPermissionList);
        }

        private static SessionService CreateService() => new SessionService();
    }
}

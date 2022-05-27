using Autofac;
using Autofac.Integration.Mvc;
using Fanex.Affiliate.Admin.Core.Configurations;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Email;
using Fanex.Affiliate.Admin.Core.MetaModels.Affiliate;
using Fanex.Affiliate.Admin.Core.MetaModels.CommissionGroup;
using Fanex.Affiliate.Admin.Core.Repository;
using Fanex.Affiliate.Admin.Core.Services;
using Fanex.Affiliate.Admin.Core.Services.CommGroup;
using Fanex.Affiliate.Admin.Core.UnitTests.TestHelper;
using Moq;
using System.Collections.Generic;
using System.Web.Mvc;
using Xunit;

namespace Fanex.Affiliate.Admin.Core.UnitTests.Services.CommGroup
{
    public class CommGroupAssignmentServiceTest
    {
        private ILifetimeScopeProvider scopeProvider;

        [Fact]
        public void GetNormalCommGroupList_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var param = new GetGroupListParam();
            var expectedResult = new List<SelectItem>
            {
                new SelectItem
                {
                    Id = "133",
                    Name = "New Test"
                }
            };
            var commGroupRepository = new Mock<ICommissionGroupRepository>();
            commGroupRepository.Setup(comm => comm.GetNormalCommGroupList(param)).Returns(expectedResult);
            var service = CreateCommGroupAssignmentService(commGroupRepository.Object);

            // Action
            var result = service.GetNormalCommGroupList(param);

            // Assert
            Assert.Single(result);
        }

        [Fact]
        public void AssignGroup_WhenCallWithAssignComm_ExcuteCorrect()
        {
            // Arrange
            var param = new AssignGroupParam();
            var affInfo = new AffInfoParam { GroupId = 123 };
            var emailParam = new AffInformationEmail();

            var expectedResult = new ResultInfo();
            var commGroupRepository = new Mock<ICommissionGroupRepository>();
            commGroupRepository.Setup(comm => comm.AssignGroup(param)).Returns(expectedResult);

            var service = CreateCommGroupAssignmentService(commGroupRepository.Object);

            // Action
            var result = service.AssignGroup(param, affInfo, emailParam);

            // Assert
            Assert.True(result.IsSuccessful);
        }

        [Fact]
        public void AssignGroup_WhenCallWithApprovedComm_ExcuteUnsuccesful()
        {
            // Arrange
            var param = new AssignGroupParam();
            var affInfo = new AffInfoParam { AffType = 3 };
            var emailParam = new AffInformationEmail();

            var expectedResult = new ResultInfo();
            var commGroupRepository = new Mock<ICommissionGroupRepository>();
            commGroupRepository.Setup(comm => comm.AssignGroup(param)).Returns(expectedResult);

            var affiliateService = new Mock<IAffiliateService>();
            affiliateService.Setup(aff => aff.ApproveAffiliate(It.IsAny<ApproveAffiliateParam>())).Returns((new ResultInfo { Code = 999 }, "12345"));

            var service = CreateCommGroupAssignmentService(commGroupRepository.Object, affiliateService.Object);

            // Action
            var result = service.AssignGroup(param, affInfo, emailParam);

            // Assert
            Assert.False(result.IsSuccessful);
        }

        [Fact]
        public void AssignGroup_WhenCallWithApprovedComm_ExcuteSuccessful()
        {
            // Arrange
            var appSetting = new Mock<IAppSetting>();
            appSetting.Setup(a => a.EuropeanAffSiteUrl).Returns("https://aff-b2c.nexdev.net/N88User");

            var builder = new ContainerBuilder();
            builder.RegisterInstance(appSetting.Object).As<IAppSetting>();
            var container = builder.Build();

            this.scopeProvider = new SimpleLifetimeScopeProvider(container);
            var resolver = new AutofacDependencyResolver(container, scopeProvider);
            DependencyResolver.SetResolver(resolver);

            var param = new AssignGroupParam();
            var affInfo = new AffInfoParam { AffType = 3 };
            var emailParam = new AffInformationEmail();

            var expectedResult = new ResultInfo();
            var commGroupRepository = new Mock<ICommissionGroupRepository>();
            commGroupRepository.Setup(comm => comm.AssignGroup(param)).Returns(expectedResult);

            var affiliateService = new Mock<IAffiliateService>();
            affiliateService.Setup(aff => aff.ApproveAffiliate(It.IsAny<ApproveAffiliateParam>())).Returns((expectedResult, "12345"));

            var service = CreateCommGroupAssignmentService(commGroupRepository.Object, affiliateService.Object);

            // Action
            var result = service.AssignGroup(param, affInfo, emailParam);

            // Assert
            Assert.True(result.IsSuccessful);
        }

        [Fact]
        public void AssignPrivateGroup_WhenCall_ExcuteCreateCommIsFailed()
        {
            // Arrange
            var param = CreateValidCreateUpdateCommissionGroupParam();
            var affInfo = new AffInfoParam();
            var emailParam = new AffInformationEmail();

            var expectedResult = new ResultInfo
            {
                Code = 999,
                Message = "Create Commission Group is failed!"
            };

            var commGroupCommonService = new Mock<ICommGroupCommonService>();
            commGroupCommonService.Setup(comm => comm.CreateCommissionGroup(param)).Returns(expectedResult);

            var service = CreateCommGroupAssignmentService(commGroupCommonService: commGroupCommonService.Object);

            // Action
            var result = service.AssignPrivateGroup(param, affInfo, emailParam);

            // Assert
            Assert.False(result.IsSuccessful);
        }

        [Fact]
        public void AssignPrivateGroup_WhenCall_ExcuteUpdateCommIsFailed()
        {
            // Arrange
            var param = CreateValidCreateUpdateCommissionGroupParam();
            param.GroupId = 123;
            var affInfo = new AffInfoParam { GroupId = 123 };
            var emailParam = new AffInformationEmail();

            var expectedResult = new ResultInfo
            {
                Code = 999,
                Message = "Update Commission Group is failed!"
            };

            var commGroupCommonService = new Mock<ICommGroupCommonService>();
            commGroupCommonService.Setup(comm => comm.UpdateCommissionGroup(param)).Returns(expectedResult);

            var service = CreateCommGroupAssignmentService(commGroupCommonService: commGroupCommonService.Object);

            // Action
            var result = service.AssignPrivateGroup(param, affInfo, emailParam);

            // Assert
            Assert.False(result.IsSuccessful);
        }

        [Fact]
        public void AssignPrivateGroup_WhenCall_ExcuteWithAssignGroupFail()
        {
            // Arrange
            var param = CreateValidCreateUpdateCommissionGroupParam();
            var affInfo = new AffInfoParam();
            var emailParam = new AffInformationEmail();

            var expectedResult = new ResultInfo();

            var commGroupCommonService = new Mock<ICommGroupCommonService>();
            commGroupCommonService.Setup(comm => comm.CreateCommissionGroup(param)).Returns(expectedResult);

            var commGroupRepository = new Mock<ICommissionGroupRepository>();
            commGroupRepository.Setup(comm => comm.AssignGroup(It.IsAny<AssignGroupParam>())).Returns(new ResultInfo { Code = 999 });

            var service = CreateCommGroupAssignmentService(commGroupRepository.Object, null, null, commGroupCommonService.Object);

            // Action
            var result = service.AssignPrivateGroup(param, affInfo, emailParam);

            // Assert
            Assert.False(result.IsSuccessful);
        }

        [Fact]
        public void AssignPrivateGroup_WhenCall_ExcuteWithApproveFaild()
        {
            // Arrange
            var param = CreateValidCreateUpdateCommissionGroupParam();
            var affInfo = new AffInfoParam();
            var emailParam = new AffInformationEmail();

            var expectedResult = new ResultInfo();

            var commGroupCommonService = new Mock<ICommGroupCommonService>();
            commGroupCommonService.Setup(comm => comm.CreateCommissionGroup(param)).Returns(expectedResult);

            var commGroupRepository = new Mock<ICommissionGroupRepository>();
            commGroupRepository.Setup(comm => comm.AssignGroup(It.IsAny<AssignGroupParam>())).Returns(expectedResult);

            var affiliateService = new Mock<IAffiliateService>();
            affiliateService.Setup(aff => aff.ApproveAffiliate(It.IsAny<ApproveAffiliateParam>())).Returns((new ResultInfo { Code = 999 }, "12345"));

            var service = CreateCommGroupAssignmentService(commGroupRepository.Object, affiliateService.Object, null, commGroupCommonService.Object);

            // Action
            var result = service.AssignPrivateGroup(param, affInfo, emailParam);

            // Assert
            Assert.False(result.IsSuccessful);
        }

        [Fact]
        public void AssignPrivateGroup_WhenCall_ExcuteCorrectWithCreateAndApprovedPrivateComm()
        {
            // Arrange
            var appSetting = new Mock<IAppSetting>();
            appSetting.Setup(a => a.AsianAffSiteUrl).Returns("https://aff-b2c.nexdev.net/N88User");

            var builder = new ContainerBuilder();
            builder.RegisterInstance(appSetting.Object).As<IAppSetting>();
            var container = builder.Build();

            this.scopeProvider = new SimpleLifetimeScopeProvider(container);
            var resolver = new AutofacDependencyResolver(container, scopeProvider);
            DependencyResolver.SetResolver(resolver);

            var param = CreateValidCreateUpdateCommissionGroupParam();
            var affInfo = new AffInfoParam { AffType = 3, PreferredLanguage = "US" };
            var emailParam = new AffInformationEmail();

            var expectedResult = new ResultInfo();

            var commGroupCommonService = new Mock<ICommGroupCommonService>();
            commGroupCommonService.Setup(comm => comm.CreateCommissionGroup(param)).Returns(expectedResult);

            var commGroupRepository = new Mock<ICommissionGroupRepository>();
            commGroupRepository.Setup(comm => comm.AssignGroup(It.IsAny<AssignGroupParam>())).Returns(expectedResult);

            var affiliateService = new Mock<IAffiliateService>();
            affiliateService.Setup(aff => aff.ApproveAffiliate(It.IsAny<ApproveAffiliateParam>())).Returns((expectedResult, "12345"));

            var service = CreateCommGroupAssignmentService(commGroupRepository.Object, affiliateService.Object, null, commGroupCommonService.Object);

            // Action
            var result = service.AssignPrivateGroup(param, affInfo, emailParam);

            // Assert
            Assert.True(result.IsSuccessful);
        }

        [Fact]
        public void AssignPrivateGroup_WhenCall_ExcuteCorrectWithUpdatePrivateComm()
        {
            // Arrange
            var param = CreateValidCreateUpdateCommissionGroupParam();
            param.GroupId = 123;
            var affInfo = new AffInfoParam { GroupId = 123 };
            var emailParam = new AffInformationEmail();

            var expectedResult = new ResultInfo();
            var commGroupCommonService = new Mock<ICommGroupCommonService>();
            commGroupCommonService.Setup(comm => comm.UpdateCommissionGroup(param)).Returns(expectedResult);

            var commGroupRepository = new Mock<ICommissionGroupRepository>();
            commGroupRepository.Setup(comm => comm.AssignGroup(It.IsAny<AssignGroupParam>())).Returns(expectedResult);

            var service = CreateCommGroupAssignmentService(commGroupRepository.Object, null, null, commGroupCommonService.Object);

            // Action
            var result = service.AssignPrivateGroup(param, affInfo, emailParam);

            // Assert
            Assert.True(result.IsSuccessful);
        }

        private static CommGroupAssignmentService CreateCommGroupAssignmentService(
            ICommissionGroupRepository commGroupRepository = null,
            IAffiliateService affiliateService = null,
            IEmailService emailService = null,
            ICommGroupCommonService commGroupCommonService = null)
        {

            var fakeCommGroupRepository = commGroupRepository ?? Mock.Of<ICommissionGroupRepository>();
            var fakeAffiliateService = affiliateService ?? Mock.Of<IAffiliateService>();
            var fakeEmailService = emailService ?? Mock.Of<IEmailService>();
            var fakeCommGroupCommonService = commGroupCommonService ?? Mock.Of<ICommGroupCommonService>();

            return new CommGroupAssignmentService(fakeCommGroupRepository, fakeAffiliateService, fakeEmailService, fakeCommGroupCommonService);
        }

        private static CreateUpdateCommissionGroupParam CreateValidCreateUpdateCommissionGroupParam()
        {
            return new CreateUpdateCommissionGroupParam();
        }
    }
}
using Fanex.Affiliate.Admin.Core.MetaModels.Domain;
using Fanex.Affiliate.Admin.Core.Services.Domain;
using Fanex.Affiliate.Admin.Core.UnitTests.TestHelper;
using Fanex.Data;
using Moq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Xunit;

namespace Fanex.Affiliate.Admin.Core.UnitTests.Services.Domain
{
    public class SubAffDomainServiceTest
    {
        [Fact]
        public void GetSubAffDomainList_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var service = new Mock<SubAffDomainService> { CallBase = true };
            var objectDb = new Mock<IObjectDb>();
            var dataReader = new Mock<IDataReader>();
            dataReader.SetupSequence(d => d.Read()).Returns(true).Returns(false);

            ReaderHelper.MapReaderData(dataReader, GetSubAffDomainList());
            objectDb.Setup(o => o.ExecuteReader()).Returns(dataReader.Object);
            service.Setup(r => r.GetObjectDb("Aff_Admin_SubAffiliateDomain_Sel", 120)).Returns(objectDb.Object);

            // Action
            var result = service.Object.GetSubAffDomainList();
            var item = result.FirstOrDefault();

            // Assert
            Assert.Single(result);
            Assert.Equal("09/10/2020", item.CreatedDateText);
        }

        [Fact]
        public void GetSubAffDomainList_WhenCall_ReturnCorrectDataHasNull()
        {
            // Arrange
            var service = new Mock<SubAffDomainService> { CallBase = true };
            var objectDb = new Mock<IObjectDb>();
            var dataReader = new Mock<IDataReader>();
            dataReader.SetupSequence(d => d.Read()).Returns(true).Returns(false);

            ReaderHelper.MapReaderData(dataReader, GetSubAffDomainListHasNull());
            objectDb.Setup(o => o.ExecuteReader()).Returns(dataReader.Object);
            service.Setup(r => r.GetObjectDb("Aff_Admin_SubAffiliateDomain_Sel", 120)).Returns(objectDb.Object);

            // Action
            var result = service.Object.GetSubAffDomainList();
            var item = result.FirstOrDefault();

            // Assert
            Assert.Single(result);
            Assert.Null(item.CreatedDateText);
        }

        [Fact]
        public void GetSubAffDomainList_WhenCall_ReturnNullData()
        {
            // Arrange
            var service = new Mock<SubAffDomainService> { CallBase = true };
            var objectDb = new Mock<IObjectDb>();
            var dataReader = new Mock<IDataReader>();
            dataReader.SetupSequence(d => d.Read()).Returns(false).Returns(false);

            objectDb.Setup(o => o.ExecuteReader()).Returns(dataReader.Object);
            service.Setup(r => r.GetObjectDb("Aff_Admin_SubAffiliateDomain_Sel", 120)).Returns(objectDb.Object);

            // Action
            var result = service.Object.GetSubAffDomainList();

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public void InsertSubAffDomain_WhenCallWithValidParam_InsertSuccessfully()
        {
            // Arrange
            var service = new Mock<SubAffDomainService> { CallBase = true };
            var objectDb = new Mock<IObjectDb>();
            objectDb.Setup(obj => obj.ExecuteNonQuery()).Returns(0);
            objectDb.Setup(obj => obj.GetParameterValue("ErrCode")).Returns(DBNull.Value);
            objectDb.Setup(obj => obj.GetParameterValue("ErrMsg")).Returns(string.Empty);
            service.Setup(re => re.GetObjectDb("Aff_Admin_SubAffiliateDomain_Ins", 120)).Returns(objectDb.Object);

            // Action
            var result = service.Object.InsertSubAffDomain(new InsertUpdateDomainParam());

            // Assert
            Assert.True(result.IsSuccessful);
        }

        [Fact]
        public void InsertSubAffDomain_WhenCallWithInvalidParam_InsertIsFailed()
        {
            // Arrange
            var message = "Insert Sub-Affiliate Domain is failed.";
            var service = new Mock<SubAffDomainService> { CallBase = true };
            var objectDb = new Mock<IObjectDb>();
            objectDb.Setup(obj => obj.ExecuteNonQuery()).Returns(0);
            objectDb.Setup(obj => obj.GetParameterValue("ErrCode")).Returns(-999);
            objectDb.Setup(obj => obj.GetParameterValue("ErrMsg")).Returns(message);
            service.Setup(re => re.GetObjectDb("Aff_Admin_SubAffiliateDomain_Ins", 120)).Returns(objectDb.Object);

            // Action
            var result = service.Object.InsertSubAffDomain(new InsertUpdateDomainParam());

            // Assert
            Assert.False(result.IsSuccessful);
            Assert.Equal(message, result.Message);
        }

        [Fact]
        public void UpdateSubAffDomain_WhenCallWithValidParam_UpdateSuccessfully()
        {
            // Arrange
            var service = new Mock<SubAffDomainService> { CallBase = true };
            var objectDb = new Mock<IObjectDb>();
            objectDb.Setup(obj => obj.ExecuteNonQuery()).Returns(0);
            objectDb.Setup(obj => obj.GetParameterValue("ErrCode")).Returns(DBNull.Value);
            objectDb.Setup(obj => obj.GetParameterValue("ErrMsg")).Returns(string.Empty);
            service.Setup(re => re.GetObjectDb("Aff_Admin_SubAffiliateDomain_Upd", 120)).Returns(objectDb.Object);

            // Action
            var result = service.Object.UpdateSubAffDomain(new InsertUpdateDomainParam { IsAffDomain = true });

            // Assert
            Assert.True(result.IsSuccessful);
        }

        [Fact]
        public void UpdateSubAffDomain_WhenCallWithInvalidParam_UpdateIsFailed()
        {
            // Arrange
            var message = "Update Sub-Affiliate Domain is failed.";
            var service = new Mock<SubAffDomainService> { CallBase = true };
            var objectDb = new Mock<IObjectDb>();
            objectDb.Setup(obj => obj.ExecuteNonQuery()).Returns(0);
            objectDb.Setup(obj => obj.GetParameterValue("ErrCode")).Returns(-999);
            objectDb.Setup(obj => obj.GetParameterValue("ErrMsg")).Returns(message);
            service.Setup(re => re.GetObjectDb("Aff_Admin_SubAffiliateDomain_Upd", 120)).Returns(objectDb.Object);

            // Action
            var result = service.Object.UpdateSubAffDomain(new InsertUpdateDomainParam());

            // Assert
            Assert.False(result.IsSuccessful);
            Assert.Equal(message, result.Message);
        }

        [Fact]
        public void DeleteSubAffDomain_WhenCallWithValidParam_DeleteSuccessfully()
        {
            // Arrange
            var service = new Mock<SubAffDomainService> { CallBase = true };
            var objectDb = new Mock<IObjectDb>();
            objectDb.Setup(obj => obj.ExecuteNonQuery()).Returns(0);
            objectDb.Setup(obj => obj.GetParameterValue("ErrCode")).Returns(DBNull.Value);
            objectDb.Setup(obj => obj.GetParameterValue("ErrMsg")).Returns(string.Empty);
            service.Setup(re => re.GetObjectDb("Aff_Admin_SubAffiliateDomain_Del", 120)).Returns(objectDb.Object);

            // Action
            var result = service.Object.DeleteSubAffDomain(new DeleteDomainParam());

            // Assert
            Assert.True(result.IsSuccessful);
        }

        [Fact]
        public void DeleteSubAffDomain_WhenCallWithInvalidParam_DeleteIsFailed()
        {
            // Arrange
            var message = "Delete Sub-Affiliate Domain is failed.";
            var service = new Mock<SubAffDomainService> { CallBase = true };
            var objectDb = new Mock<IObjectDb>();
            objectDb.Setup(obj => obj.ExecuteNonQuery()).Returns(0);
            objectDb.Setup(obj => obj.GetParameterValue("ErrCode")).Returns(-999);
            objectDb.Setup(obj => obj.GetParameterValue("ErrMsg")).Returns(message);
            service.Setup(re => re.GetObjectDb("Aff_Admin_SubAffiliateDomain_Del", 120)).Returns(objectDb.Object);

            // Action
            var result = service.Object.DeleteSubAffDomain(new DeleteDomainParam());

            // Assert
            Assert.False(result.IsSuccessful);
            Assert.Equal(message, result.Message);
        }

        private IDictionary<string, object> GetSubAffDomainList()
        {
            return new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase)
            {
                ["DomainId"] = 123,
                ["DomainName"] = "abc.com",
                ["IsSSL"] = true,
                ["Creator"] = "sa",
                ["CreateDate"] = new DateTime(2020, 09, 10)
            };
        }

        private IDictionary<string, object> GetSubAffDomainListHasNull()
        {
            return new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase)
            {
                ["DomainId"] = 123,
                ["DomainName"] = "abc.com",
                ["IsSSL"] = true,
                ["Creator"] = "sa",
                ["CreateDate"] = DBNull.Value
            };
        }
    }
}

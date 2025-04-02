namespace Fanex.Affiliate.Admin.Core.UnitTests.Repository.Report
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using Data;
    using Fanex.Affiliate.Admin.Core.MetaModels.Report;
    using Fanex.Affiliate.Admin.Core.Repository.Report;
    using Moq;
    using TestHelper;
    using Xunit;

    public class MarketingStatisticsRepositoryTest
    {
        private const string _sp_GetMarketingStatistics = "Aff_Admin_Rpt_MarketingPage_Statistics";

        [Fact]
        public void GetReport_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var repository = new Mock<MarketingStatisticsRepository> { CallBase = true };
            var objectDb = new Mock<IObjectDb>();
            var dataReader = new Mock<IDataReader>();

            // Setup sequence for Read()
            dataReader.SetupSequence(d => d.Read())
                .Returns(true) // First record
                .Returns(false) // End of first result set
                .Returns(true);  // Total record

            // Setup sequence for NextResult()
            dataReader.SetupSequence(d => d.NextResult()).Returns(true).Returns(false);

            // Setup data for first record
            var firstRecordData = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase)
            {
                ["AffUserName"] = "user1",
                ["ChannelName"] = "channel1",
                ["AffMediaLink"] = "link1",
                ["MarketName"] = "market1",
                ["TotalClick"] = 100,
                ["UniqueClick"] = 50,
                ["SignUps"] = 10,
                ["FDM"] = 5
            };
            ReaderHelper.MapReaderData(dataReader, firstRecordData);

            objectDb.Setup(o => o.ExecuteReader(null, null)).Returns(dataReader.Object);
            objectDb.Setup(obj => obj.GetParameterValue("NRows")).Returns(2);
            repository.Setup(r => r.GetObjectDb(_sp_GetMarketingStatistics, 120)).Returns(objectDb.Object);

            // Action
            var result = repository.Object.GetReport(GetMarketingStatisticsParam());

            var firstItem = result.MainData.FirstOrDefault();

            // Assert
            Assert.Equal(2, result.TotalItem);
            Assert.NotNull(result.Total);

            // Verify first record
            Assert.Equal("user1", firstItem.AffUserName);
            Assert.Equal("channel1", firstItem.ChannelName);
            Assert.Equal("link1", firstItem.AffMediaLink);
            Assert.Equal("market1", firstItem.MarketName);
            Assert.Equal(100, firstItem.TotalClick);
            Assert.Equal(50, firstItem.UniqueClick);
            Assert.Equal(10, firstItem.SignUps);
            Assert.Equal(5, firstItem.Fdm);
        }

        [Fact]
        public void GetReport_WhenCall_ReturnCorrectDataHasNull()
        {
            // Arrange
            var repository = new Mock<MarketingStatisticsRepository> { CallBase = true };
            var objectDb = new Mock<IObjectDb>();
            var dataReader = new Mock<IDataReader>();
            dataReader.SetupSequence(d => d.Read())
                .Returns(true) // First record
                .Returns(false) // End of first result set
                .Returns(true);  // Total record
            dataReader.SetupSequence(d => d.NextResult()).Returns(true).Returns(false);

            ReaderHelper.MapReaderData(dataReader, GetMarketingStatisticsDataHasNull());
            objectDb.Setup(o => o.ExecuteReader(null, null)).Returns(dataReader.Object);
            objectDb.Setup(obj => obj.GetParameterValue("NRows")).Returns(1);
            repository.Setup(r => r.GetObjectDb(_sp_GetMarketingStatistics, 120)).Returns(objectDb.Object);

            // Action
            var result = repository.Object.GetReport(GetMarketingStatisticsParam());

            var item = result.MainData.FirstOrDefault();

            // Assert
            Assert.Single(result.MainData);
            Assert.Equal(0, item.TotalClick);
            Assert.Equal(0, item.UniqueClick);
            Assert.Equal(0, item.SignUps);
            Assert.Equal(0, item.Fdm);
        }

        [Fact]
        public void GetReport_WhenCall_ReturnNullData()
        {
            // Arrange
            var repository = new Mock<MarketingStatisticsRepository> { CallBase = true };
            var objectDb = new Mock<IObjectDb>();
            var dataReader = new Mock<IDataReader>();
            dataReader.SetupSequence(d => d.Read()).Returns(false).Returns(false);

            objectDb.Setup(o => o.ExecuteReader(null, null)).Returns(dataReader.Object);
            objectDb.Setup(obj => obj.GetParameterValue("NRows")).Returns(DBNull.Value);
            repository.Setup(r => r.GetObjectDb(_sp_GetMarketingStatistics, 120)).Returns(objectDb.Object);

            // Action
            var result = repository.Object.GetReport(GetMarketingStatisticsParam());

            // Assert
            Assert.Empty(result.MainData);
            Assert.Null(result.Total);
            Assert.Equal(0, result.TotalItem);
        }

        private static IDictionary<string, object> GetMarketingStatisticsDataHasNull()
        {
            return new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase)
            {
                ["AffUserName"] = "user1",
                ["ChannelName"] = "channel1",
                ["AffMediaLink"] = "link1",
                ["MarketName"] = "market1",
                ["TotalClick"] = DBNull.Value,
                ["UniqueClick"] = DBNull.Value,
                ["SignUps"] = DBNull.Value,
                ["FDM"] = DBNull.Value
            };
        }

        private static MarketingStatisticsParam GetMarketingStatisticsParam()
        {
            return new MarketingStatisticsParam
            {
                AffUsername = "testuser",
                FromDate = DateTimeOffset.Now.DateTime.AddDays(-7),
                ToDate = DateTimeOffset.Now.DateTime,
                LanguageCode = "en",
                PageIndex = 1,
                PageSize = 10,
                IncludedInActive = true
            };
        }
    }
}
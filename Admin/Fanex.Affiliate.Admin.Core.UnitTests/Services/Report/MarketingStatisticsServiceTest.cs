namespace Fanex.Affiliate.Admin.Core.UnitTests.Services.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using DTO;
    using Fanex.Affiliate.Admin.Core.DTO.Report;
    using Fanex.Affiliate.Admin.Core.MetaModels.Report;
    using Fanex.Affiliate.Admin.Core.Repository.Report;
    using Fanex.Affiliate.Admin.Core.Services.Report;
    using Moq;
    using Xunit;

    public class MarketingStatisticsServiceTest
    {
        private readonly Mock<IMarketingStatisticsRepository> _repositoryMock;
        private readonly MarketingStatisticsService _service;
        private readonly MarketingStatisticsParam _defaultParam;

        public MarketingStatisticsServiceTest()
        {
            _repositoryMock = new Mock<IMarketingStatisticsRepository>();
            _service = new MarketingStatisticsService(_repositoryMock.Object);
            _defaultParam = new MarketingStatisticsParam
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

        [Fact]
        public void GetReport_WhenCall_ShouldReturnCorrectData()
        {
            // Arrange
            var repositoryResult = CreateRepositoryResultWithData();
            _repositoryMock.Setup(r => r.GetReport(_defaultParam)).Returns(repositoryResult);

            // Action
            var result = _service.GetReport(_defaultParam);

            // Assert
            AssertResult(result, repositoryResult);
            AssertAggregatedData(result.MainData.First(), 300, 150, 30, 15);
            AssertChannelLinks(result.MainData.First().ChannelLink);
        }

        [Fact]
        public void GetReport_WhenNoData_ShouldReturnEmptyResult()
        {
            // Arrange
            var repositoryResult = CreateEmptyRepositoryResult();
            _repositoryMock.Setup(r => r.GetReport(_defaultParam)).Returns(repositoryResult);

            // Action
            var result = _service.GetReport(_defaultParam);

            // Assert
            AssertEmptyResult(result);
        }

        [Fact]
        public void GetReport_WhenMultipleChannels_ShouldAggregateCorrectly()
        {
            // Arrange
            var repositoryResult = CreateRepositoryResultWithMultipleChannels();
            _repositoryMock.Setup(r => r.GetReport(_defaultParam)).Returns(repositoryResult);

            // Action
            var result = _service.GetReport(_defaultParam);

            // Assert
            AssertResult(result, repositoryResult);
            AssertMultipleChannels(result.MainData);
        }

        private static EntityResult<MarketingStatistics> CreateRepositoryResultWithData()
        {
            return new EntityResult<MarketingStatistics>
            {
                MainData = new List<MarketingStatistics>
                {
                    CreateMarketingStatistics("user1", "channel1", "market1", "link1", 100, 50, 10, 5),
                    CreateMarketingStatistics("user1", "channel1", "market2", "link2", 200, 100, 20, 10)
                },
                Total = CreateMarketingStatistics(null, null, null, null, 300, 150, 30, 15),
                TotalItem = 2
            };
        }

        private static EntityResult<MarketingStatistics> CreateEmptyRepositoryResult()
        {
            return new EntityResult<MarketingStatistics>
            {
                MainData = new List<MarketingStatistics>(),
                Total = new MarketingStatistics(),
                TotalItem = 0
            };
        }

        private static EntityResult<MarketingStatistics> CreateRepositoryResultWithMultipleChannels()
        {
            return new EntityResult<MarketingStatistics>
            {
                MainData = new List<MarketingStatistics>
                {
                    CreateMarketingStatistics("user1", "channel1", "market1", "link1", 100, 50, 10, 5),
                    CreateMarketingStatistics("user1", "channel2", "market2", "link2", 200, 100, 20, 10)
                },
                Total = CreateMarketingStatistics(null, null, null, null, 300, 150, 30, 15),
                TotalItem = 2
            };
        }

        private static MarketingStatistics CreateMarketingStatistics(
            string affUserName, string channelName, string marketName, string affMediaLink,
            int totalClick, int uniqueClick, int signUps, int fdm)
        {
            return new MarketingStatistics
            {
                AffUserName = affUserName,
                ChannelName = channelName,
                MarketName = marketName,
                AffMediaLink = affMediaLink,
                TotalClick = totalClick,
                UniqueClick = uniqueClick,
                SignUps = signUps,
                Fdm = fdm
            };
        }

        private static void AssertResult(EntityResult<MarketingStatistics> result, EntityResult<MarketingStatistics> expected)
        {
            Assert.NotNull(result);
            Assert.Equal(expected.TotalItem, result.TotalItem);
            Assert.NotNull(result.Total);
            Assert.Equal(expected.Total.TotalClick, result.Total.TotalClick);
            Assert.Equal(expected.Total.UniqueClick, result.Total.UniqueClick);
            Assert.Equal(expected.Total.SignUps, result.Total.SignUps);
            Assert.Equal(expected.Total.Fdm, result.Total.Fdm);
        }

        private static void AssertEmptyResult(EntityResult<MarketingStatistics> result)
        {
            Assert.NotNull(result);
            Assert.Empty(result.MainData);
            Assert.NotNull(result.Total);
            Assert.Equal(0, result.TotalItem);
        }

        private static void AssertAggregatedData(MarketingStatistics data, int totalClick, int uniqueClick, int signUps, int fdm)
        {
            Assert.NotNull(data);
            Assert.Equal("user1", data.AffUserName);
            Assert.Equal("channel1", data.ChannelName);
            Assert.Equal(totalClick, data.TotalClick);
            Assert.Equal(uniqueClick, data.UniqueClick);
            Assert.Equal(signUps, data.SignUps);
            Assert.Equal(fdm, data.Fdm);
        }

        private static void AssertChannelLinks(List<MarketingStatistics> channelLinks)
        {
            Assert.Equal(2, channelLinks.Count);

            var firstLink = channelLinks.First();
            Assert.Equal("market1", firstLink.MarketName);
            Assert.Equal("link1", firstLink.AffMediaLink);
            Assert.Equal(100, firstLink.TotalClick);
            Assert.Equal(50, firstLink.UniqueClick);
            Assert.Equal(10, firstLink.SignUps);
            Assert.Equal(5, firstLink.Fdm);

            var secondLink = channelLinks.Skip(1).First();
            Assert.Equal("market2", secondLink.MarketName);
            Assert.Equal("link2", secondLink.AffMediaLink);
            Assert.Equal(200, secondLink.TotalClick);
            Assert.Equal(100, secondLink.UniqueClick);
            Assert.Equal(20, secondLink.SignUps);
            Assert.Equal(10, secondLink.Fdm);
        }

        private static void AssertMultipleChannels(IEnumerable<MarketingStatistics> data)
        {
            Assert.Equal(2, data.Count());

            var firstChannel = data.First();
            Assert.Equal("user1", firstChannel.AffUserName);
            Assert.Equal("channel1", firstChannel.ChannelName);
            Assert.Equal(100, firstChannel.TotalClick);
            Assert.Equal(50, firstChannel.UniqueClick);
            Assert.Equal(10, firstChannel.SignUps);
            Assert.Equal(5, firstChannel.Fdm);
            Assert.Single(firstChannel.ChannelLink);

            var secondChannel = data.Skip(1).First();
            Assert.Equal("user1", secondChannel.AffUserName);
            Assert.Equal("channel2", secondChannel.ChannelName);
            Assert.Equal(200, secondChannel.TotalClick);
            Assert.Equal(100, secondChannel.UniqueClick);
            Assert.Equal(20, secondChannel.SignUps);
            Assert.Equal(10, secondChannel.Fdm);
            Assert.Single(secondChannel.ChannelLink);
        }
    }
}
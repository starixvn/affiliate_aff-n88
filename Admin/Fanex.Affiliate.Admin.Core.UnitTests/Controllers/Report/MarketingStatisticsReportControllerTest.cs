namespace Fanex.Affiliate.Admin.Core.UnitTests.Controllers.Report
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using DTO;
    using Fanex.Affiliate.Admin.Core.Controllers.Report;
    using Fanex.Affiliate.Admin.Core.DTO.Report;
    using Fanex.Affiliate.Admin.Core.Extensions;
    using Fanex.Affiliate.Admin.Core.MetaModels.Report;
    using Fanex.Affiliate.Admin.Core.Services;
    using Fanex.Affiliate.Admin.Core.Services.Common;
    using Fanex.Affiliate.Admin.Core.Services.Report;
    using Moq;
    using Xunit;

    public class MarketingStatisticsReportControllerTest
    {
        private readonly Mock<ILanguageService> _languageServiceMock;
        private readonly Mock<IMarketingStatisticsService> _marketingStatisticsServiceMock;
        private readonly MarketingStatisticsReportController _controller;
        private readonly MarketingStatisticsParam _defaultParam;

        public MarketingStatisticsReportControllerTest()
        {
            var sessionServiceMock = new Mock<ISessionService>();
            _languageServiceMock = new Mock<ILanguageService>();
            _marketingStatisticsServiceMock = new Mock<IMarketingStatisticsService>();
            _controller = new MarketingStatisticsReportController(
                sessionServiceMock.Object,
                _languageServiceMock.Object,
                _marketingStatisticsServiceMock.Object);

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
        public void Index_WhenCall_ShouldReturnViewWithLanguages()
        {
            // Arrange
            var languages = CreateLanguages();
            _languageServiceMock.Setup(s => s.GetLanguageList()).Returns(languages);

            // Action
            var result = _controller.Index() as ViewResult;

            // Assert
            AssertViewResult(result, languages);
        }

        [Fact]
        public void GetReport_WhenModelStateIsValid_ShouldReturnJsonResultWithData()
        {
            // Arrange
            var expectedResult = CreateExpectedResult();
            _marketingStatisticsServiceMock.Setup(s => s.GetReport(_defaultParam)).Returns(expectedResult);

            // Action
            var result = _controller.GetReport(_defaultParam) as JsonNetResult;

            // Assert
            AssertJsonResultWithData(result, expectedResult);
        }

        [Fact]
        public void GetReport_WhenModelStateIsInvalid_ShouldReturnEmptyJsonResult()
        {
            // Arrange
            _controller.ModelState.AddModelError("AffUsername", "Required");

            // Action
            var result = _controller.GetReport(_defaultParam) as JsonNetResult;

            // Assert
            AssertEmptyJsonResult(result);
        }


        private static List<Language> CreateLanguages()
        {
            return new List<Language>
            {
                new Language { LanguageCode = "en", LanguageName = "English" },
                new Language {LanguageCode = "vi", LanguageName = "Vietnamese"}
            };
        }

        private static EntityResult<MarketingStatistics> CreateExpectedResult()
        {
            return new EntityResult<MarketingStatistics>
            {
                MainData = new List<MarketingStatistics>
                {
                    CreateMarketingStatistics("user1", "channel1", "market1", "link1", 100, 50, 10, 5)
                },
                Total = CreateMarketingStatistics(null, null, null, null, 100, 50, 10, 5),
                TotalItem = 1
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

        private static void AssertViewResult(ViewResult result, List<Language> expectedLanguages)
        {
            Assert.NotNull(result);
            Assert.Equal("~/Areas/Portal/Views/Report/MarketingPageStatistics.cshtml", result.ViewName);
            Assert.Equal(expectedLanguages, result.Model);
        }

        private static void AssertJsonResultWithData(JsonNetResult result, EntityResult<MarketingStatistics> expectedData)
        {
            Assert.NotNull(result);
            Assert.Equal(expectedData, result.Data);
        }

        private static void AssertEmptyJsonResult(JsonNetResult result)
        {
            Assert.NotNull(result);
            Assert.Null(result.Data);
        }
    }
}
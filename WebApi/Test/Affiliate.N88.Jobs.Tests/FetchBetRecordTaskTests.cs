using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Constants;
using Affiliate.N88.Jobs.RecurringTasks;
using Affiliate.N88.Models;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Affiliate.N88.SpParams.Commands;
using Fanex.Logging;
using Microsoft.Extensions.Options;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Xml;
using Xunit;

namespace Affiliate.N88.Jobs.Tests
{
    public class FetchBetRecordTaskTests
    {
        private readonly ILicenseeApi Api;
        private readonly ITimeTrackerService TimeTrackerService;
        private readonly ILogger Logger;
        private readonly IOptionsSnapshot<FetchServiceSetting> Configuration;
        private readonly IThirdPartyImportRepository Repo;

        public FetchBetRecordTaskTests()
        {
            TimeTrackerService = Substitute.For<ITimeTrackerService>();
            Logger = Substitute.For<ILogger>();
            Configuration = Substitute.For<IOptionsSnapshot<FetchServiceSetting>>();
            Repo = Substitute.For<IThirdPartyImportRepository>();
            Api = Substitute.For<ILicenseeApi>();
        }

        private FetchBetRecordDataTask CreateFetchTask()
        {
            return new FetchBetRecordDataTask(Api, Repo, Logger, TimeTrackerService, Configuration);
        }

        private void SetUpStubConfiguration(int? maxTimeRange = null)
        {
            var config = FetchBetRecordTaskTestsHelper.GetConfiguration();
            config.MaxTimeRange = maxTimeRange ?? config.MaxTimeRange;
            Configuration.Get(ServiceConfigName.PULL_BET_RECORD_SETTING).Returns(config);
        }

        [Theory]
        [MemberData(nameof(FetchBetRecordTaskTestsHelper.TimeTrackerExceptionCannotHandle), MemberType = typeof(FetchBetRecordTaskTestsHelper))]
        public async Task FetchDataAsync_WhenCall_LoggerLogExceptionWhenTimeTrackerServiceThrowException(Exception ex)
        {
            SetUpStubConfiguration();
            var fetchTask = CreateFetchTask();
            TimeTrackerService.When(x => x.GetTimeAsync(Arg.Any<string>())).Do(x => throw ex);
            await fetchTask.FetchDataAsync();
            Logger.Received().Error(Arg.Is<string>(m => m.Contains(ex.Message)));
        }

        [Theory]
        [MemberData(nameof(FetchBetRecordTaskTestsHelper.TimeTrackerHandlableException), MemberType = typeof(FetchBetRecordTaskTestsHelper))]
        public async Task FetchDataAsync_WhenCall_ReceiveDefaultTimeIfTimeTrackerThrowHandlableException(Exception ex)
        {
            var defaultDate = FetchBetRecordTaskTestsHelper.GetConfiguration().DefaultPullDate;
            SetUpStubConfiguration();
            var fetchTask = CreateFetchTask();
            TimeTrackerService.When(x => x.GetTimeAsync(Arg.Any<string>())).Do(x => throw ex);
            await fetchTask.FetchDataAsync();
            await Api.Received().GetBetRecordAsync(Arg.Is<DateTime>(defaultDate), Arg.Any<DateTime>());
        }

        [Theory]
        [MemberData(nameof(FetchBetRecordTaskTestsHelper.LicenseeCalls), MemberType = typeof(FetchBetRecordTaskTestsHelper))]
        public async Task FetchDataAsync_WhenCall_NumberOfApiCallBaseOnMaxTimeRange(DateTime fromDate, DateTime toDate, int maxTimeRange, int numberOfTimeApiCall)
        {
            SetUpStubConfiguration(maxTimeRange);
            var reponse = FetchBetRecordTaskTestsHelper.GenerateApiResponse();
            Api.GetBetRecordAsync(Arg.Any<DateTime>(), Arg.Any<DateTime>()).Returns(reponse);
            var fetchTask = CreateFetchTask();
            await fetchTask.FetchDataAsync(fromDate, toDate);
            await Api.ReceivedWithAnyArgs(numberOfTimeApiCall).GetBetRecordAsync(Arg.Any<DateTime>(), Arg.Any<DateTime>());
        }

        [Theory]
        [MemberData(nameof(FetchBetRecordTaskTestsHelper.NoBetRecordItem), MemberType = typeof(FetchBetRecordTaskTestsHelper))]
        public async Task FetchDataAsync_WhenCallWithApiReturnNoItem_TimeTrackerNotSave(IEnumerable<BetRecordInfo> data)
        {
            SetUpStubConfiguration();
            Api.GetBetRecordAsync(Arg.Any<DateTime>(), Arg.Any<DateTime>()).Returns(data);
            var fetchTask = CreateFetchTask();
            var fromDate = new DateTime(2020, 2, 2, 0, 0, 0);
            var toDate = new DateTime(2020, 2, 2, 0, 30, 0);
            await fetchTask.FetchDataAsync(fromDate, toDate);
            await TimeTrackerService.DidNotReceiveWithAnyArgs().SaveTimeAsync(Arg.Any<string>(), Arg.Any<DateTime>());
        }
        
        [Fact]
        public async Task FetchDataAsync_WhenCallWithApiReturnDataNeedPaging_InsertPagingDataMultipleTime()
        {
            var data = FetchBetRecordTaskTestsHelper.GenerateApiResponse(4000);
            var fromDate = new DateTime(2020, 2, 2, 0, 0, 0);
            var toDate = new DateTime(2020, 2, 2, 0, 30, 0);

            SetUpStubConfiguration();
            Api.GetBetRecordAsync(Arg.Any<DateTime>(), Arg.Any<DateTime>()).Returns(data);
            var fetchTask = CreateFetchTask();

            await fetchTask.FetchDataAsync(fromDate, toDate);

            await Repo.Received(2).ImportBetRecordAsync(Arg.Is<InsertBetRecodInfoCommand>(r => CheckXmlElementIsLowerString(r.XmlData)));
            await TimeTrackerService.Received().SaveTimeAsync(Arg.Any<string>(), toDate);
        }

        private bool CheckXmlElementIsLowerString(string xmlData)
        {
            var props = typeof(BetRecordInfo).GetProperties();
            foreach (var pro in props)
            {
                if (!xmlData.Contains(pro.Name.ToLowerInvariant()))
                    return false;
            }
            return true;
        }
    }

    public static class FetchBetRecordTaskTestsHelper
    {
        public static IEnumerable<object[]> TimeTrackerExceptionCannotHandle => new List<object[]>
        {
            new object[]{ new Exception() },
            new object[]{ new InvalidCastException() }
        };

        public static IEnumerable<object[]> TimeTrackerHandlableException => new List<object[]>
        {
            new object[]{ new XmlException() },
            new object[]{ new FileNotFoundException() },
        };

        public static IEnumerable<object[]> LicenseeCalls => new List<object[]>
        {
            new object[] { new DateTime(2020, 2, 2, 0, 0, 0), new DateTime(2020, 2, 2, 0, 10, 0), 30, 0 },
            new object[] { new DateTime (2020, 2, 2, 0, 0, 0), new DateTime(2020, 2, 2, 1, 0, 0), 30, 2 },
            new object[] { new DateTime (2020, 2, 2, 0, 0, 0), new DateTime(2020, 2, 2, 1, 20, 0), 30, 2 }
        };


        public static IEnumerable<object[]> NoBetRecordItem => new List<object[]>
        {
            new object[] { null },
            new object[] { new List<BetRecordInfo>() }
        };

        public static FetchServiceSetting GetConfiguration() => new FetchServiceSetting
        {
            AdjustmentTime = 0,
            DefaultPullDate = new DateTime(2020, 2, 2, 0, 0, 0),
            MaxTimeRange = 30,
            PullInfoCron = "*/30 * * * *",
        };

        public static IEnumerable<BetRecordInfo> GenerateApiResponse(int count = 1)
        {
            var random = new Random();
            for (int i = 0; i < count; i++)
            {
                yield return new BetRecordInfo
                {
                    TpId = random.Next(100),
                    GameType = random.Next(10)
                };
            }
        }
    }

}

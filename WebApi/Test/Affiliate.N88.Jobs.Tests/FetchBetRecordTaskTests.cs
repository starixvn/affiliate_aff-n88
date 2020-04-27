using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.RecurringTasks;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Fanex.Logging;
using Microsoft.Extensions.Configuration;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Affiliate.N88.Jobs.Tests
{
    public class FetchBetRecordTaskTests
    {
        private readonly ILicenseeApi Api;
        private readonly ITimeTrackerService TimeTrackerService;
        private readonly ILogger Logger;
        private readonly IConfiguration Configuration;
        private readonly IThirdPartyImportRepository Repo;

        public FetchBetRecordTaskTests()
        {
            TimeTrackerService = Substitute.For<ITimeTrackerService>();
            Logger = Substitute.For<Logger>();
            Configuration = Substitute.For<IConfiguration>();
            Repo = Substitute.For<IThirdPartyImportRepository>();
        }

        private FetchBetRecordDataTask CreateFetchTask()
        {
            return new FetchBetRecordDataTask(Api, Repo, Logger, TimeTrackerService, Configuration);
        }



        [Theory]
        [MemberData(nameof(FetchBetRecordTaskTestsHelper.NotPassTimeTrackerExcteion), MemberType = typeof(FetchBetRecordTaskTestsHelper))]
        public async Task FetchDataAsync_WhenCall_LoggerLogExceptionWhenTimeTrackerServiceThrowException(Exception ex)
        {
            var fetchTask = CreateFetchTask();
            
        }


    }

    public static class FetchBetRecordTaskTestsHelper
    {
        public static IEnumerable<object[]> NotPassTimeTrackerExcteion => new List<object[]>
        {
            new object[]{ new Exception() },
            new object[]{ new InvalidCastException() }
        };

        public static FetchServiceSetting GetConfiguration() => new FetchServiceSetting
        {
            AdjustmentTime = 0,
            DefaultPullDate = new DateTime(2020, 2, 2),
            MaxTimeRange = 30,
            PullInfoCron = "*/30 * * * *",
        };
    }

}

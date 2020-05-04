using Affiliate.N88.DTO;
using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.RecurringTasks;
using Affiliate.N88.Repository;
using Fanex.Logging;
using Microsoft.Extensions.Options;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Affiliate.N88.Jobs.UnitTests
{
    public class FetchCustomerDataTaskTests
    {
        private readonly IMemberImportRepository Repo;
        private readonly ILicenseeApi Api;
        private readonly ILogger Logger;
        private readonly IOptions<LicenseeSiteSetting> Config;

        public FetchCustomerDataTaskTests()
        {
            Repo = Substitute.For<IMemberImportRepository>();
            Api = Substitute.For<ILicenseeApi>();
            Logger = Substitute.For<ILogger>();
            Config = Substitute.For<IOptions<LicenseeSiteSetting>>();
        }

        private FetchCustomerDataTask CreateFetchTask()
        {
            return new FetchCustomerDataTask(Api, Repo, Logger, Config);
        }

        [Theory]
        [MemberData(nameof(FetchCustomerDataTaskTestsHelper.NotConfigSupportedSiteConfiguration), MemberType = typeof(FetchCustomerDataTaskTestsHelper))]
        public async Task FetchDataAsync_WhenCallWithNoHaveSupportSite_NotThrowAnyThing(LicenseeSiteSetting setting)
        {
            var fetchTask = CreateFetchTask();
            Config.Value.Returns(setting);
            await fetchTask.FetchDataAsync();
            Assert.True(true);
        }

        [Fact]
        public async Task FetchDataAsync_WhenCallWithNoLastedDateQueryFromRepo_LoggerLogInvalidOperationException()
        {
            var fetchTask = CreateFetchTask();
            Config.Value.Returns(FetchCustomerDataTaskTestsHelper.ConfigurationSetting);
            Repo.When(r => r.GetLastedMemberImportedTimeAsync(Arg.Any<MemberImportedTimeInfo>()))
                .Do(x =>  throw new Exception("test"));
            await fetchTask.FetchDataAsync();


            Logger.Received().Error(Arg.Is<string>(s => s.Contains("Can't find lasted importing member date"))
                , Arg.Is<Exception>(ex => ex.GetType() == typeof(InvalidOperationException)));
        }
    }

    internal static class FetchCustomerDataTaskTestsHelper
    {
        public static IEnumerable<object[]> NotConfigSupportedSiteConfiguration = new List<object[]>
        {
            new object[] { new LicenseeSiteSetting { SupportedSites = null } },
            new object[] { new LicenseeSiteSetting { SupportedSites = new List<string> ()} }
        };

        public static LicenseeSiteSetting ConfigurationSetting => new LicenseeSiteSetting
        {
            SupportedSites = new List<string> { "Bwing", "Goal123" },
            LicenseeSiteMapping = new List<LicenseeSiteMapping>
                {
                    new LicenseeSiteMapping { SettingCodePrefix = "N8B", SiteName = "Bwing" },
                    new LicenseeSiteMapping { SettingCodePrefix = "N8G", SiteName = "Goal123"}
                }
        };
    }
}

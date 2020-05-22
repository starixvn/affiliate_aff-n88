using System;

namespace Affiliate.N88.Jobs.Configurations
{
    public class AppSettings
    {
        public string SentryDsn { get; set; }

        public string LicenseeDataAPI { get; set; }

        public string SpPath { get; set; }

        public string SaveConfigPath { get; set; }

        public string AuthenticationKey { get; set; }

        public string PullCustomerInfoCron { get; set; }

        public FetchServiceSetting PullBetRecordSetting { get; set; }

        public FetchServiceSetting PullCustomerSetting { get; set; }

        public FetchServiceSetting PullServerInfoSetting { get; set; }

        public FetchServiceSetting PullGameTypeSetting { get; set; }

        public bool IsRunFetchTask { get; set; }

        public bool RunAsService { get; set; }
    }
}
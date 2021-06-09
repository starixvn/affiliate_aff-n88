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

        public FetchServiceSetting PullDepositInfoSetting { get; set; }

        public FetchServiceSetting PullTpTransferInfoSetting { get; set; }

        public FetchServiceSetting PullBonusInfoSetting { get; set; }

        public FetchServiceSetting PullCustRegInfoSetting { get; set; }

        public FetchServiceSetting PullWithdrawalInfoSetting { get; set; }

        public FetchServiceSetting PullPromotionSetting { get; set; }

        public FetchServiceSetting PullPromotionSpecificSetting { get; set; }

        public FetchServiceSetting PullRebateMLogSetting { get; set; }

        public FetchServiceSetting PullCustBonusRolloverSetting { get; set; }

        public FetchServiceSetting PullCustClosingBalanceSetting { get; set; }

        public bool IsRunFetchTask { get; set; }

        public bool RunAsService { get; set; }

        public ProxySetting ProxySetting { get; set; }
    }
}
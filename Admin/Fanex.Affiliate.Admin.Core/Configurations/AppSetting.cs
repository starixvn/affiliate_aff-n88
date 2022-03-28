using Fanex.Affiliate.Admin.Core.Resources;
using System;
using System.Configuration;
using System.Diagnostics.CodeAnalysis;

namespace Fanex.Affiliate.Admin.Core.Configurations
{
    public class AppSetting : IAppSetting
    {
        public static IAppSetting Instance { get; } = new AppSetting();

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        public string InternalAsianAffiliateUrl => GetValue("internalAsianAffiliateURL");

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        public string InternalEuropeanAffiliateUrl => GetValue("internalEuropeanAffiliateURL");

        public string Environment => GetValue("Environment");

        public bool IsProduction => Environment.Equals("PRODUCTION", StringComparison.OrdinalIgnoreCase);

        public string CcMail => GetValue("ccMail");

        public string BccMail => GetValue("bccMail");

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        public string EuropeanAffSiteUrl => GetValue("EuropeanAffiliateURL");

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        public string AsianAffSiteUrl => GetValue("AsianAffiliateURL");

        public string JsVersion => GetValue("JsVersion");

        public bool IsLocal => Environment.Equals("LOCAL", StringComparison.OrdinalIgnoreCase);

        public string GetValue(string key) => ConfigurationManager.AppSettings[key];

        public string MailContact => GetValue("MailContact");

        public string GetMailContactByShortedLanguageCode(string shortedLanguageCode) => GetValue("MailContact" + shortedLanguageCode) ?? MailContact;

        public string AppMailId => GetValue("app_mail_id");

        public string GetAppMailIdByShortedLanguageCode(string shortedLanguageCode) => GetValue("app_mail_id_" + shortedLanguageCode) ?? AppMailId;

        public string SentryDsn => GetValue("Dsn");

        public string LoggingCategory => GetValue("LoggingCategory");

        public string RabbitMQConnectionString => GetValue("RabbitMQConnectionString");

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        public string BannerRootUrl => GetValue("BannerUrl");

        public string[] BannerFolders => GetValue("BannerFolders").Split(';');

        public int ImageSize => Convert.ToInt32(GetValue("imagesize"));

        public string ServerId => GetValue("ServerID");

        public string SiteName => GetValue("SiteName");

        public string SiteFriendlyName => Lang.ResourceManager.GetString(GetValue("SiteFriendlyName"));

        public string DefaultLanguage => GetValue("DefaultLanguage");

        public string DefaultLanguageCode => GetValue("DefaultLanguageCode");

        public string DefaultShortedLanguageCode => GetValue("DefaultShortedLanguageCode");

        public string DefaultCurrency => GetValue("DefaultCurrency");

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        public string MemberSiteApiUrl => GetValue("MemberSiteApiUrl");

        public int MemberSiteId => Convert.ToInt32(GetValue("MemberSiteId"));

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        public string MemberSiteProxyUrl => GetValue("MemberSiteProxyUrl");

        public string MemberSiteApiAuthenticationKey => GetValue("MemberSiteApiAuthenticationKey");

        public bool IsUseMemberSiteProxy => Convert.ToBoolean(GetValue("IsUseProxyToGetMemberSiteApi"));

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        public string AffSiteUrl => GetValue("AffSiteUrl");

        [SuppressMessage("Major Code Smell", "S3995:URI return values should not be strings", Justification = "Reviewed. Suppression is OK here.")]
        public string GetAffSiteUrlByShortedLanguageCode(string shortedLanguageCode) => GetValue("AffSiteUrl_" + shortedLanguageCode) ?? AffSiteUrl;

    }
}

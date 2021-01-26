using System.Diagnostics.CodeAnalysis;

namespace Fanex.Affiliate.Admin.Core.Configurations
{
    public interface IAppSetting
    {
        string GetValue(string key);

        string MailContact { get; }

        string GetMailContactByShortedLanguageCode(string shortedLanguageCode);

        string AppMailId { get; }

        string GetAppMailIdByShortedLanguageCode(string shortedLanguageCode);

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        string InternalEuropeanAffiliateUrl { get; }

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        string InternalAsianAffiliateUrl { get; }

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        string EuropeanAffSiteUrl { get; }

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        string AsianAffSiteUrl { get; }

        string Environment { get; }

        bool IsProduction { get; }

        bool IsLocal { get; }

        string CcMail { get; }

        string BccMail { get; }

        string JsVersion { get; }

        string SentryDsn { get; }

        string LoggingCategory { get; }

        string RabbitMQConnectionString { get; }

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        string BannerRootUrl { get; }

        string[] BannerFolders { get; }

        int ImageSize { get; }

        string ServerId { get; }

        string SiteName { get; }

        string SiteFriendlyName { get; }

        string DefaultLanguage { get; }

        string DefaultLanguageCode { get; }

        string DefaultShortedLanguageCode { get; }

        string DefaultCurrency { get; }

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        string MemberSiteApiUrl { get; }

        int MemberSiteId { get; }

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        string MemberSiteProxyUrl { get; }

        string MemberSiteApiAuthenticationKey { get; }

        bool IsUseMemberSiteProxy { get; }

    }
}

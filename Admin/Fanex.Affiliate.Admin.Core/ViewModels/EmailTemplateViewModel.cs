using System.Diagnostics.CodeAnalysis;
using Fanex.Affiliate.Admin.Core.Configurations;

namespace Fanex.Affiliate.Admin.Core.ViewModels
{
    public class EmailTemplateViewModel
    {
        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        public string RootUrl { get; set; }

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        public string UserSiteUrl { get; set; }

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        public string ImageRootUrl { get; set; }

        public string Language { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        [SuppressMessage("Minor Code Smell", "S2325:Methods and properties that don't access instance data should be static", Justification = "<Pending>")]
        public string SiteFriendlyName => AppSetting.Instance.SiteFriendlyName;

        [SuppressMessage("Minor Code Smell", "S2325:Methods and properties that don't access instance data should be static", Justification = "<Pending>")]
        public string SiteName => AppSetting.Instance.SiteName;

    }
}

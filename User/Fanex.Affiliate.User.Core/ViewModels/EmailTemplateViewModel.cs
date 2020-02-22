using System.Diagnostics.CodeAnalysis;
using Fanex.Affiliate.User.Core.Utilities;

namespace Fanex.Affiliate.User.Core.ViewModels
{
    public class EmailTemplateViewModel
    {
        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        public string RootUrl { get; set; }

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings", Justification = "Reviewed. Suppression is OK here.")]
        public string ImageRootUrl { get; set; }

        public string Language { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string SiteFriendlyName => AppSetting.Instance.SiteFriendlyName;
    }
}

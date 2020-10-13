using System.Diagnostics.CodeAnalysis;
using Fanex.Affiliate.User.Core.Resources;
using Fanex.Affiliate.User.Core.Utilities;

namespace Fanex.Affiliate.User.Core.ViewModels
{
    public class EmailTemplateViewModel
    {
        private static readonly IAppSetting _appSetting = AppSetting.Instance;

        public string RootUrl { get; set; }

        public string ImageRootUrl { get; set; }

        public string Language { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        [SuppressMessage("Minor Code Smell", "S2325:Methods and properties that don't access instance data should be static", Justification = "<Pending>")]
        public string Copyright => SiteFriendlyNameHelper.Replace12Bet(Lang.Copyright);

        [SuppressMessage("Minor Code Smell", "S2325:Methods and properties that don't access instance data should be static", Justification = "<Pending>")]
        public string SiteName => AppSetting.Instance.SiteName;
    }
}

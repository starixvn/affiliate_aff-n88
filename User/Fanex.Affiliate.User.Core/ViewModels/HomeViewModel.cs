using Fanex.Affiliate.User.Core.Utilities;

namespace Fanex.Affiliate.User.Core.ViewModels
{
    public class HomeViewModel
    {
        public bool IsAuthenticated { get; set; }

        public string SignUpLink { get; set; }

        public string BannerLink { get; set; }

        public string PromotionB2CLink { get; set; }

        public string Language { get; set; }

        public string ShortedLanguageCode { get; set; }

        public string SiteFriendlyName { get; set; }
    }
}

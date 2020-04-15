
using Fanex.Affiliate.User.Core.Constants;

namespace Fanex.Affiliate.User.Core.MetalModels.UserPanel
{
    public class QrCodeParam
    {
        public string SelectedLanguage { get; set; }

        public string SelectedPage { get; set; }

        public int? SelectedDomainId { get; set; }

        public int TargetId { get; set; } = TargetSite.TargetToMember;
    }
}

using Fanex.Affiliate.User.Core.DTO.UserPanel;

namespace Fanex.Affiliate.User.Core.ViewModels.UserPanel
{
    public class AccountOverviewViewModel
    {
        public int AffId { get; set; }

        public LastLoginInfo LastLoginInfo { get; set; }

        public bool IsMaxLevel { get; set; }
    }
}

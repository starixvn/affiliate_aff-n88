namespace Fanex.Affiliate.Admin.Core.ViewModels.Affiliate
{
    using System.Collections.Generic;
    using DTO;
    using Fanex.Affiliate.Admin.Core.DTO.CommissionGroup;
    using Fanex.Affiliate.Admin.Core.DTO.Common;

    public class MarketingAccountViewModel
    {
        public IEnumerable<Language> LanguageList { get; set; }

        public IEnumerable<TargetCountry> TargetCountryList { get; set; }

        public IEnumerable<SubMenu> SubMenuList { get; set; }

        public IEnumerable<NormalCommGroup> DealList { get; set; }
    }
}
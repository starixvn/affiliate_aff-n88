using System.Collections.Generic;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.CommissionGroup;
using Fanex.Affiliate.Admin.Core.DTO.Common;
using Fanex.Affiliate.Admin.Core.MetaModels;

namespace Fanex.Affiliate.Admin.Core.ViewModels.Affiliate
{
    public class AffiliateInfoViewModel
    {
        public IEnumerable<NormalCommGroup> CommGroupList { get; set; }

        public IEnumerable<TargetCountry> TargetCountryList { get; set; }

        public IEnumerable<Language> LanguageList { get; set; }

        public int SelectedGroupId { get; set; }

        public ParamFromHome Param { get; set; }

        public IEnumerable<SubMenu> SubMenuList { get; set; }
    }
}

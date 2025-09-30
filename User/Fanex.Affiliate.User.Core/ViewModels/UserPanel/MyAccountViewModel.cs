using System.Collections.Generic;
using System.Web.Mvc;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.UserPanel;

namespace Fanex.Affiliate.User.Core.ViewModels.UserPanel
{
    public class MyAccountViewModel
    {
        public bool IsMarketingAccount { get; set; }

        public AccountInformation AccountInformation { get; set; }

        public IEnumerable<SelectListItem> BaseCurrencyList { get; set; }

        public IEnumerable<TargetCountry> TargetCountryList { get; set; }
    }
}

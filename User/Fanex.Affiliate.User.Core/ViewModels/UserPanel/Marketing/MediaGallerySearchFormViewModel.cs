using System.Collections.Generic;
using System.Web.Mvc;

namespace Fanex.Affiliate.User.Core.ViewModels.UserPanel.Marketing
{
    public class MediaGallerySearchFormViewModel : CommonSearchFormViewModel
    {
        public IEnumerable<SelectListItem> CurrencyList { get; set; }

        public IEnumerable<SelectListItem> DeviceList { get; set; }
    }
}

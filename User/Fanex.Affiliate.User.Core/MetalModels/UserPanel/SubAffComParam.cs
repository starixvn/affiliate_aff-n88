using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.MetalModels.UserPanel
{
    public class SubAffComParam : BaseParam
    {
        public int AffId { get; set; }

        public DateTime? MonthDate { get; set; }

        public int BaseCurrency { get; set; }
    }
}

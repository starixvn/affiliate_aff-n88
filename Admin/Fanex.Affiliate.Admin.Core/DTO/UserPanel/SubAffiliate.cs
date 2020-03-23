using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.Admin.Core.DTO.UserPanel
{
    public class SubAffiliate
    {
        public int AffId { get; set; }

        public string AffName { get; set; }

        public decimal Commission { get; set; }

        public decimal SubAffCommission { get; set; }
    }
}

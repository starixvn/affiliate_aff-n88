using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.MetalModels.Api
{
    public class TransferMoneyParam
    {
        public int SiteId { get; set; }

        public string RefTransId { get; set; }

        public int FromCustId { get; set; }

        public decimal FromAmount { get; set; }

        public int ToCustId { get; set; }

        public decimal ToAmount { get; set; }

        public decimal MaxTransferAmount { get; set; }
    }
}

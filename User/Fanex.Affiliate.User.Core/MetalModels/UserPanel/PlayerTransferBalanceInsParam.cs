using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.MetalModels.UserPanel
{
    public class PlayerTransferBalanceInsParam
    {
        public int AffId { get; set; }

        public int Player_CustId { get; set; }

        public int Player_Currency { get; set; }

        public int CustId { get; set; }

        public int Currency { get; set; }

        public decimal Amount { get; set; }

        public double ExRate { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.DTO.UserPanel.PlayerTransferBalance
{
    public class PlayerTransferBalanceHistoryResult
    {
        public IEnumerable<PlayerTransferBalanceHistoryInfo> Items { get; set; }

        public int TotalRow { get; set; }

        public decimal TotalBaseAmount { get; set; }
    }
}

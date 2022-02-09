using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.MetalModels.UserPanel
{
    public class PlayerTransferBalanceHistoryParam
    {
        public int AffId { get; set; }

        public string PlayerName { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int BaseCurrency { get; set; }

        public int  PageIndex { get; set; }

        public int PageSize { get; set; }
    }
}

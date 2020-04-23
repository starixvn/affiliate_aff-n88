using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.Models
{
    public class BetRecordInfo
    {
        public int TpId { get; set; }

        public string TransId { get; set; }

        public int GameType { get; set; }

        public string CustId { get; set; }

        public string UserName { get; set; }

        public int? CurrencyId { get; set; }

        public int? SiteId { get; set; }

        public string TpUserName { get; set; }

        public DateTime TransTime { get; set; }

        public DateTime SettledTime { get; set; }

        public decimal? Stake { get; set; }

        public decimal? WinlostAmount { get; set; }

        public int? SettlementType { get; set; }

        public int? TicketStatus { get; set; }

        public string OriginalState { get; set; }

        public int? TicketKey { get; set; }

        public DateTime? CreateTime { get; set; }
    }
}

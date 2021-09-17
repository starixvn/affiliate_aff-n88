using System;
using System.Collections.Generic;

namespace Fanex.Affiliate.Admin.Core.DTO.Report
{
    public class PlayerGgrReport
    {
        public string AffName { get; set; }

        public string PlayerName { get; set; }

        public DateTime RegistrationDate { get; set; }

        public DateTime FdmDate { get; set; }

        public decimal TotalTurnover { get; set; }

        public decimal TotalGgr { get; set; }

        public IDictionary<string, PlayerGgrProductInfo> ProductReportList { get; set; }
    }
}

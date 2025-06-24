namespace Fanex.Affiliate.Admin.Core.DTO.Report
{
    using System;
    using Newtonsoft.Json;

    public class AffiliateReportDaily : AffiliateReportBase
    {
        [JsonIgnore]
        public DateTime WinLostDate { get; set; }

        public decimal DepositAmount { get; set; }

        public decimal WithdrawalAmount { get; set; }

        public string DateText => WinLostDate.ToString("dd-MMM-yyyy");
    }
}

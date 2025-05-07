namespace Fanex.Affiliate.Admin.Core.DTO.Report
{
    public class AffiliateReportBase
    {
        public int AffId { get; set; }

        public string UserName { get; set; }

        public string PaymentCurrency { get; set; }

        public int TotalClick { get; set; }

        public int UniqueClick { get; set; }

        public int Signup { get; set; }

        public int Fdm { get; set; }

        public int ActiveMember { get; set; }

        public int NoOfSubAff { get; set; }

        public decimal Deposit { get; set; }
    }
}

using System;

namespace Affiliate.N88.ApiModels
{
    public class CustomerModel
    {
        public int SiteId { get; set; }

        public string SiteName { get; set; }

        public int CustId { get; set; }

        public string UserName { get; set; }

        public int CurrencyId { get; set; }

        public int ActStatus { get; set; }

        public DateTime RegTime { get; set; }

        public DateTime? FirstDepositDate { get; set; }

        public int Status { get; set; }

        public int? AffId { get; set; }
    }
}
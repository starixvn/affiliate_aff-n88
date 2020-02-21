using Fanex.Data.Repository;
using System;

namespace Affiliate.N88.Infrastructure.DTO
{
    public class CustomerInfo
    {
        public int CustId { get; set; }

        public int SiteId { get; set; }

        public string UserName { get; set; }

        public string Userpwd { get; set; }

        public int CurrencyId { get; set; }

        public string UserLang { get; set; }

        public byte ActStatus { get; set; }

        public int AgentId { get; set; }

        public string AllAgentId { get; set; }

        public byte UserLevel { get; set; }

        public DateTime LastLoginTime { get; set; }

        public DateTime RegTime { get; set; }

        public bool IsTest { get; set; }

        public bool IsKyc { get; set; }

        public bool IsRisk { get; set; }

        public bool Status { get; set; }
    }

    public class GetCustomersCriteria : CriteriaBase
    {
        public GetCustomersCriteria(DateTime fromDate) => FromDate = fromDate;

        public override string GetSettingKey() => "N8B_CustomerSel";

        public override bool IsValid() => true;

        public DateTime FromDate { get; }
    }
}

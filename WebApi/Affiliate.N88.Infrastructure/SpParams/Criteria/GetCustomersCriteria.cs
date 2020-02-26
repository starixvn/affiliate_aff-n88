using System;
using Fanex.Data.Repository;

namespace Affiliate.N88.SpParams
{
    public class GetCustomersCriteria : CriteriaBase
    {
        public GetCustomersCriteria(DateTime fromDate) => FromDate = fromDate;

        public override string GetSettingKey() => "N88_CustomerSel";

        public override bool IsValid() => true;

        public DateTime FromDate { get; }
    }
}
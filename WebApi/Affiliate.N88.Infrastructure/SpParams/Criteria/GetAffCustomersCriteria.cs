using Fanex.Data.Repository;
using System;

namespace Affiliate.N88.SpParams.Criteria
{
    public class GetAffCustomersCriteria : CriteriaBase
    {
        public GetAffCustomersCriteria(DateTime fromDate) => FromDate = fromDate;

        public override string GetSettingKey() => "Aff_CustomerSel";

        public override bool IsValid() => true;

        public DateTime FromDate { get; }
    }
}
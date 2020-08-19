using Fanex.Data.Repository;
using System;

namespace Affiliate.N88.SpParams.Criteria
{
    public class GetCustomersCriteria : CriteriaBase
    {
        public GetCustomersCriteria(DateTime fromDate) => FromDate = fromDate;

        public override string GetSettingKey() => "N88_Get_Customer";

        public override bool IsValid() => true;

        public DateTime FromDate { get; }
    }
}

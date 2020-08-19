using Fanex.Data.Repository;
using System;

namespace Affiliate.N88.SpParams.Criteria
{
    public class GetCustRegInfoCriteria : CriteriaBase
    {
        public DateTime FromDate { get; }

        public GetCustRegInfoCriteria(DateTime fromDate)
            => FromDate = fromDate;

        public override string GetSettingKey()
            => "API_CustRegInfo_Get";

        public override bool IsValid()
            => true;

    }
}

using Fanex.Data.Repository;
using System;

namespace Affiliate.N88.SpParams.Criteria
{
    public class GetBetRecordCriteria : CriteriaBase
    {
        public GetBetRecordCriteria(DateTime fromDate, DateTime toDate)
        {
            FromDate = fromDate;
            ToDate = toDate;
        }

        public override string GetSettingKey() => "N88_Get_TpBetRecord";

        public override bool IsValid() => true;

        public DateTime FromDate { get; }

        public DateTime ToDate { get; }
    }
}

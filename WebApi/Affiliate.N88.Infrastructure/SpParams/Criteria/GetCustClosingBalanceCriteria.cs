using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.SpParams.Criteria
{
    public class GetCustClosingBalanceCriteria : CriteriaBase
    {
        public GetCustClosingBalanceCriteria(DateTime lastGetTime, int batchCount)
        {
            LastGetTime = lastGetTime;
            BatchCount = batchCount;
        }

        public override string GetSettingKey() => "API_CustClosingBalance_Get";

        public override bool IsValid() => true;

        public DateTime LastGetTime { get; set; }

        public int BatchCount { get; set; }
    }
}

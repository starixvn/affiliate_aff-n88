using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.SpParams.Criteria
{
    public class BonusInfoCriteria : CriteriaBase
    {
        public int Id { get; }

        public int BatchCount { get; }

        public BonusInfoCriteria(int id, int batchCount)
        {
            Id = id;
            BatchCount = batchCount;
        }

        public override string GetSettingKey() => "API_BonusInfo_Get";

        public override bool IsValid() => true;
    }
}

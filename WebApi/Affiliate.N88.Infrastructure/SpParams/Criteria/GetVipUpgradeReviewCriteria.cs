using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.SpParams.Criteria
{
    public class GetVipUpgradeReviewCriteria : CriteriaBase
    {
        public override string GetSettingKey()
            => "API_VipUpgradeReview_Get";

        public override bool IsValid()
            => true;
    }
}

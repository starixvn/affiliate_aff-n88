using System.Collections.Generic;

namespace Fanex.Affiliate.Admin.Core.DTO.CommissionGroup
{
    public class CommissionGroupResultEntity
    {
        public IEnumerable<CommGroup> CommGroupList { get; set; }

        public IEnumerable<TierSetting> TierSettingList { get; set; }

        public IEnumerable<DeductionSetting> TierDeductionSettingList { get; set; }

        public IEnumerable<P2pDeductionSetting> P2pDeductionSettingList { get; set; }
    }
}
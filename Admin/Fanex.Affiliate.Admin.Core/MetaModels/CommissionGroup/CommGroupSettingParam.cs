using Fanex.Affiliate.Admin.Core.Constants;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Fanex.Affiliate.Admin.Core.MetaModels.CommissionGroup
{
    public class CommGroupSettingParam
    {
        public int GroupId { get; set; }

        public string GroupName { get; set; }

        [MaxLength(Validation.MaxLengthCommGroupDescription, ErrorMessage = "Description should shorter than 100 characters!")]
        public string Description { get; set; }

        [Required]
        public IEnumerable<TierSettingParam> TierSettingList { get; set; }

        [Required]
        public IEnumerable<P2pDeductionSettingParam> P2pDeductionList { get; set; }

        [Required]
        public IEnumerable<TierDeductionSettingParam> PlatformFeeList { get; set; }

        [Required]
        public TierDeductionSettingParam OperationalFee { get; set; }

        [Required]
        public TierDeductionSettingParam DepositFee { get; set; }

        [Required]
        public TierDeductionSettingParam WithdrawalFee { get; set; }
    }
}

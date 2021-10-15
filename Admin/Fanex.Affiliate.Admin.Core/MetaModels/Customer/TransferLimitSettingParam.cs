using Fanex.Affiliate.Admin.Core.Constants;
using System.ComponentModel.DataAnnotations;

namespace Fanex.Affiliate.Admin.Core.MetaModels.Customer
{
    public class TransferLimitSettingParam : AffiliateBasicInfoParam
    {
        [Range(1, Money.AllowedMaxValue, ErrorMessage = "Limit exceeds the allowable limit.")]
        [RegularExpression("^\\d*$", ErrorMessage = "Limit must be a whole positive number.")]
        public decimal TransferLimit { get; set; }

        public bool DisabledTransfer { get; set; }
    }
}

using Fanex.Affiliate.Admin.Core.Constants;
using System.ComponentModel.DataAnnotations;

namespace Fanex.Affiliate.Admin.Core.DTO.CommissionGroup
{
    public class TierSetting
    {
        public int GroupId { get; set; }

        [Range(Validation.MinId, Validation.MaxId, ErrorMessage = "TierId not exists!")]
        public int TierId { get; set; }

        [Range(0, (double)Validation.InfinityAmount, ErrorMessage = "Min Amount not valid!")]
        public decimal MinAmount { get; set; }

        [Range(0, (double)Validation.InfinityAmount, ErrorMessage = "Max Amount not valid!")]
        public decimal MaxAmount { get; set; }

        [Range(0, Validation.InfinityQualifiedMember, ErrorMessage = "Min Actived Members not valid!")]
        public int MinAm { get; set; }

        [Range(0, Validation.InfinityQualifiedMember, ErrorMessage = "Max Actived Members not valid!")]
        public int MaxAm { get; set; }

        public decimal Commission { get; set; }
    }
}

using Fanex.Affiliate.Admin.Core.Constants;
using System.ComponentModel.DataAnnotations;

namespace Fanex.Affiliate.Admin.Core.MetaModels.CommissionGroup
{
    public class CommGroupInfoParam
    {
        public int GroupId { get; set; }

        public string GroupName { get; set; }

        public string Creator { get; set; }

        [MaxLength(Validation.MaxLengthCommGroupDescription, ErrorMessage = "Description should shorter than 100 characters!")]
        public string Description { get; set; }
    }
}

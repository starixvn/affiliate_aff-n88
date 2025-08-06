
using System.ComponentModel.DataAnnotations;

namespace Fanex.Affiliate.Admin.Core.MetaModels.Domain
{
    public class InsertDomainParam : UserInfoParam
    {
        [Required]
        public string DomainName { get; set; }

        public bool IsSSL { get; set; }

        public bool IsAffDomain { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string BlockTargetCountry { get; set; }
    }
}

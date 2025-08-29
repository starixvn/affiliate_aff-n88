using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.MetalModels.Attributes;
using Fanex.Affiliate.User.Core.Resources;
using Fanex.Data;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Fanex.Affiliate.User.Core.MetalModels
{
    public class UserSignUpParam
    {
        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "FirstNameIsRequired")]
        [MaxLength(Number.Fifty, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "FirstNameMaxLength")]
        public string FirstName { get; set; }

        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "LastNameIsRequired")]
        [MaxLength(Number.Fifty, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "LastNameMaxLength")]
        public string LastName { get; set; }

        public bool Gender { get; set; }

        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "EmailAddressIsRequired")]
        [RegularExpression(@"(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|""(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*"")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])", ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "EmailAddressIsInvalid")]
        [MaxLength(Number.Fifty, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "EmailMaxLength")]
        public string Email { get; set; }

        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "errContactNumberEmpty")]
        [MaxLength(Number.Fifty, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "PhoneMaxLength")]
        public string Phone { get; set; }

        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "AddressIsRequired")]
        [MaxLength(Number.TwoFiveZero, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "AddressMaxLength")]
        public string Address { get; set; }

        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "CityIsRequired")]
        [MaxLength(Number.TwoFiveZero, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "CityMaxLength")]
        public string City { get; set; }

        public string State { get; set; } = string.Empty;

        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "PostcodeZiIsRequired")]
        [MaxLength(Number.Fifty, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "PostalMaxLength")]
        public string Postal { get; set; }

        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "CountryErr")]
        public string Country { get; set; }

        [RequiredByChecked(DependentPropertyName = "HasWebSite", IsChecked = true, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "WebsiteURLIsRequired")]

        [MaxLength(Number.OneHundred, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "SiteUrlMaxLength")]
        public string SiteUrl { get; set; } = string.Empty;

        public string MoreSiteUrls { get; set; }

        [RequiredByChecked(DependentPropertyName = "HasWebSite", IsChecked = false, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "DescWebsite")]
        [MaxLength(Number.OneThousand, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "NoSiteDescMaxLength")]
        public string NoSiteDesc { get; set; }

        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "PreferLangErr")]
        public string PreferredLanguage { get; set; }

        public static string PreferredPayment => "Player";

        [RequiredReplaceB2C(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "BETUserNameIsRequired")]
        [MaxLength(Number.Thirdty, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "UserNameMaxLength30")]
        public string Player_UserName { get; set; }

        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "errSecQuestionEmpty")]
        public byte QuestionId { get; set; }

        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "errYourAnswer")]
        [MaxLength(Number.ThreeHundred, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "AnswerMaxLength")]
        public string Answer { get; set; }

        public string ContactApps { get; set; }

        public string Ip { get; set; }

        public string Language { get; set; }

        public string UserName { get; set; }

        public string AffType { get; set; }

        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }

        public string AffParentCode { get; set; }

        public int Player_CustId { get; set; }

        public int Player_Currency { get; set; }

        [SpParam(Ignored = true)]
        public IEnumerable<ContactApp> ContactAppList { get; set; }

        [SpParam(Ignored = true)]
        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "VerifyEmailAddressIsRequired")]
        [Compare("Email", ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "Emailaddressest")]
        public string VerifyEmail { get; set; }

        [SpParam(Ignored = true)]
        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "ErrmsgEntryValidCode")]
        public string Captcha { get; set; }

        [SpParam(Ignored = true)]
        public bool IsLocal { get; set; }

        [SpParam(Ignored = true)]
        public bool HasWebSite { get; set; } = true;

        [SpParam(Ignored = true)]
        public bool IsValidParentCode { get; set; } = true;

        [SpParam(Ignored = true)]
        public string DetectedCountryCode { get; set; }
    }
}

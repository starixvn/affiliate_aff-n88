namespace Fanex.Affiliate.User.Core.MetalModels
{
    using Fanex.Affiliate.User.Core.Constants;
    using Fanex.Affiliate.User.Core.Resources;
    using System.ComponentModel.DataAnnotations;

    public class ContactUsParam
    {
        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "FirstNameIsRequired")]
        [MaxLength(Number.Fifty, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "FirstNameMaxLength")]
        public string FirstName { get; set; }

        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "LastNameIsRequired")]
        [MaxLength(Number.Fifty, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "LastNameMaxLength")]
        public string LastName { get; set; }

        [Required(ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "EmailAddressIsRequired")]
        [RegularExpression(
            @"^(?![.])(?!.*\.\.)[A-Za-z0-9][A-Za-z0-9._-]*(?<![._-])@(?!xn--)(?!-)[A-Za-z0-9-]+(?<!-)(\.(?!-)[A-Za-z0-9-]+(?<!-))*\.[A-Za-z]{1,24}$",
            ErrorMessageResourceType = typeof(Lang),
            ErrorMessageResourceName = "EmailAddressIsInvalid")]
        [MaxLength(Number.Fifty, ErrorMessageResourceType = typeof(Lang), ErrorMessageResourceName = "EmailMaxLength")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter the subject of your message.")]
        [StringLength(Number.OneHundred, ErrorMessage = "Please enter the subject of your message.")]
        public string Subject { get; set; }

        [Required(ErrorMessage = "Please enter your message.")]
        [StringLength(Number.FiveThousand, ErrorMessage = "Please enter your message.")]
        public string Message { get; set; }

        public string ReceiverEmail { get; set; }
    }
}

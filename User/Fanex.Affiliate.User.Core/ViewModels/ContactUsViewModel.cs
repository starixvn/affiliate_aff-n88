namespace Fanex.Affiliate.User.Core.ViewModels
{
    using Fanex.Affiliate.User.Core.DTO;
    using Fanex.Affiliate.User.Core.MetalModels;
    using System.Collections.Generic;

    public class ContactUsViewModel : BaseLayoutViewModel
    {
        public IEnumerable<ContactChannel> ContactChannels { get; set; }

        public ContactUsParam ContactForm { get; set; }

        public ContactUsViewModel()
        {
            ContactForm = new ContactUsParam();
            ContactChannels = new List<ContactChannel>();
        }
    }
}

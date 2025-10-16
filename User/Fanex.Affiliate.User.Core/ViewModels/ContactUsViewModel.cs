namespace Fanex.Affiliate.User.Core.ViewModels
{
    using Fanex.Affiliate.User.Core.MetalModels;

    public class ContactUsViewModel : BaseLayoutViewModel
    {
        public ContactUsParam ContactForm { get; set; }

        public string Email { get; set; }
        public string Telegram { get; set; }
        public string Whatsapp { get; set; }
        public string Zalo { get; set; }

        public ContactUsViewModel()
        {
            ContactForm = new ContactUsParam();
        }
    }
}

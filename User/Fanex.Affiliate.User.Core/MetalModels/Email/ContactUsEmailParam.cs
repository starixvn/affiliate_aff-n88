namespace Fanex.Affiliate.User.Core.MetalModels.Email
{
    using System;

    public class ContactUsEmailParam : EmailBaseParam
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Sender { get; set; }

        public string Subject { get; set; }

        public string Message { get; set; }

        public DateTime SubmittedDateTime { get; set; }

        public string Receiver { get; set; }
    }
}
namespace Fanex.Affiliate.User.Core.Repository
{
    using Constants;
    using DTO;
    using System.Collections.Generic;

    public class ContactUsRepository : IContactUsRepository
    {
        private readonly IObjectDBBuilder _builder;

        public ContactUsRepository(IObjectDBBuilder builder)
        {
            _builder = builder;
        }

        public IEnumerable<ContactChannel> GetContactChannels()
        {
            const string uSpKey = "Aff_User_ContactUs_Detail_Sel";

            using (var db = _builder.Build(uSpKey))
            {
                return db.Query<ContactChannel>();
            }
        }
    }
}

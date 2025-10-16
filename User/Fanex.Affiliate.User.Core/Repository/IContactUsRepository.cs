namespace Fanex.Affiliate.User.Core.Repository
{
    using DTO;
    using System.Collections.Generic;

    public interface IContactUsRepository
    {
        IEnumerable<ContactChannel> GetContactChannels();
    }
}

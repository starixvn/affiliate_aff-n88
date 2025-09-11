namespace Fanex.Affiliate.User.Core.Repository
{
    using Fanex.Affiliate.User.Core.DTO;

    public interface IIpLocationRepository
    {
        IpLocationInfo GetCountryFromIp(string ip);
    }
}

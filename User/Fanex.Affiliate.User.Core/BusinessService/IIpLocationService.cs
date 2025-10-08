namespace Fanex.Affiliate.User.Core.BusinessService
{
    using DTO;

    public interface IIpLocationService
    {
        IpLocationInfo GetCountryFromIp(string ip);
    }
}

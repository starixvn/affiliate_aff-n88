namespace Fanex.Affiliate.User.Core.BusinessService
{
    using Fanex.Affiliate.User.Core.DTO;

    public interface IIpLocationService
    {
        IpLocationInfo GetCountryFromIp(string ip);
    }
}

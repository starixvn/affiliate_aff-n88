namespace Fanex.Affiliate.User.Core.BusinessService
{
    public interface IIpLocationService
    {
        string GetCountryFromIp(string ip);
    }
}

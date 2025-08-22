namespace Fanex.Affiliate.User.Core.Repository
{
    public interface IIpLocationRepository
    {
        string GetCountryFromIp(string ip);
    }
}

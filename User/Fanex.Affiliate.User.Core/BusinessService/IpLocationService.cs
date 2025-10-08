namespace Fanex.Affiliate.User.Core.BusinessService
{
    using DTO;
    using Repository;

    public class IpLocationService : IIpLocationService
    {
        private readonly IIpLocationRepository _ipLocationRepository;

        public IpLocationService(IIpLocationRepository ipLocationRepository)
        {
            _ipLocationRepository = ipLocationRepository;
        }

        public IpLocationInfo GetCountryFromIp(string ip)
        {
            return _ipLocationRepository.GetCountryFromIp(ip);
        }
    }
}

namespace Fanex.Affiliate.User.Core.BusinessService
{
    using Fanex.Affiliate.User.Core.Repository;
    using Fanex.Affiliate.User.Core.DTO;

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

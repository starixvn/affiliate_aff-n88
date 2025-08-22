using Fanex.Affiliate.User.Core.Repository;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public class IpLocationService : IIpLocationService
    {
        private readonly IIpLocationRepository _ipLocationRepository;

        public IpLocationService(IIpLocationRepository ipLocationRepository)
        {
            _ipLocationRepository = ipLocationRepository;
        }

        public string GetCountryFromIp(string ip)
        {
            return _ipLocationRepository.GetCountryFromIp(ip);
        }
    }
}

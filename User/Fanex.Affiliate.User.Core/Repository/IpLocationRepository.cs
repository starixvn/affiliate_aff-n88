using Fanex.Affiliate.User.Core.Repository.UserPanel;

namespace Fanex.Affiliate.User.Core.Repository
{
    public class IpLocationRepository : BaseRepository, IIpLocationRepository
    {
        private readonly IObjectDBBuilder _builder;

        public IpLocationRepository(IObjectDBBuilder builder)
        {
            _builder = builder;
        }

        public string GetCountryFromIp(string ip)
        {
            const string uSpKey = "Acc_GetIPInfo_Full";

            using (var objectDb = _builder.Build(uSpKey))
            {
                return objectDb.QueryEntity<string>(new { ip });
            }
        }
    }
}

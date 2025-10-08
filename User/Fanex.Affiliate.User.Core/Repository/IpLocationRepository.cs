namespace Fanex.Affiliate.User.Core.Repository
{
    using System.Data;
    using DTO;

    public class IpLocationRepository : IIpLocationRepository
    {
        private readonly IObjectDBBuilder _builder;

        public IpLocationRepository(IObjectDBBuilder builder)
        {
            _builder = builder;
        }

        public IpLocationInfo GetCountryFromIp(string ip)
        {
            const string uSpKey = "Acc_GetIPInfo_Full";

            using (var objectDb = _builder.Build(uSpKey))
            {
                using (var reader = objectDb.ExecuteReader(new { ip }))
                {
                    var firstResultSet = GetIpLocationInfo(reader);
                    if (firstResultSet != null)
                    {
                        return firstResultSet;
                    }

                    var secondResultSet = GetIpLocationRange(reader);
                    if (secondResultSet != null)
                    {
                        return new IpLocationInfo
                        {
                            CountrySHORT = secondResultSet.CountrySHORT,
                            CountryLONG = secondResultSet.CountryLONG,
                            IpRegion = secondResultSet.IpRegion,
                            IpCity = secondResultSet.IpCity
                        };
                    }
                }
            }

            return null;
        }

        private IpLocationInfo GetIpLocationInfo(IDataReader reader)
        {
            if (reader.Read())
            {
                return new IpLocationInfo
                {
                    CountrySHORT = reader["CountrySHORT"]?.ToString(),
                    CountryLONG = reader["CountryLONG"]?.ToString(),
                    IpRegion = reader["IpRegion"]?.ToString(),
                    IpCity = reader["IpCity"]?.ToString()
                };
            }
            reader.NextResult();
            return null;
        }

        private IpLocationRange GetIpLocationRange(IDataReader reader)
        {
            if (reader.Read())
            {
                return new IpLocationRange
                {
                    IpKeyFrom = reader["IpKeyFrom"]?.ToString(),
                    IpKeyTo = reader["IpKeyTo"]?.ToString(),
                    IpFrom = reader["IpFrom"]?.ToString(),
                    IpTo = reader["IpTo"]?.ToString(),
                    CountrySHORT = reader["CountrySHORT"]?.ToString(),
                    CountryLONG = reader["CountryLONG"]?.ToString(),
                    IpRegion = reader["IpRegion"]?.ToString(),
                    IpCity = reader["IpCity"]?.ToString()
                };
            }
            return null;
        }
    }
}

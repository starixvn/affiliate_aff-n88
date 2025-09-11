namespace Fanex.Affiliate.User.Core.DTO
{
    public class IpLocationInfo
    {
        public string CountrySHORT { get; set; }
        public string CountryLONG { get; set; }
        public string IpRegion { get; set; }
        public string IpCity { get; set; }
    }

    public class IpLocationRange
    {
        public string IpKeyFrom { get; set; }
        public string IpKeyTo { get; set; }
        public string IpFrom { get; set; }
        public string IpTo { get; set; }
        public string CountrySHORT { get; set; }
        public string CountryLONG { get; set; }
        public string IpRegion { get; set; }
        public string IpCity { get; set; }
    }
}

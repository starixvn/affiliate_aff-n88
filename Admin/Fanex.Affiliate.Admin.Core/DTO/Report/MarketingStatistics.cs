namespace Fanex.Affiliate.Admin.Core.DTO.Report
{
    using System.Collections.Generic;

    public class MarketingStatistics
    {
        public string AffUserName { get; set; }

        public string ChannelName { get; set; }

        public int TotalClick { get; set; }

        public int UniqueClick { get; set; }

        public int SignUps { get; set; }

        public int Fdm { get; set; }

        public string AffMediaLink { get; set; }

        public string MarketName { get; set; }

        public List<MarketingStatistics> ChannelLink { get; set; }
    }
}

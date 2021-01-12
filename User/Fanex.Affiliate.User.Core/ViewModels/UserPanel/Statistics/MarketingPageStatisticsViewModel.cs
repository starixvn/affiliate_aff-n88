using Fanex.Affiliate.User.Core.DTO.UserPanel;
using System;
using System.Linq;

namespace Fanex.Affiliate.User.Core.ViewModels.UserPanel.Statistics
{
    public class MarketingPageStatisticsViewModel
    {
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string Language { get; set; }

        public bool IncludeInActiveLink { get; set; }

        public IGrouping<string, MarketingPageStatistics> Datas { get; set; }
    }
}

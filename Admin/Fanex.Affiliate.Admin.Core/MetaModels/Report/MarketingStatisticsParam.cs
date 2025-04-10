namespace Fanex.Affiliate.Admin.Core.MetaModels.Report
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class MarketingStatisticsParam
    {
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string AffUsername { get; set; }

        [Required]
        public DateTime FromDate { get; set; }

        [Required]
        public DateTime ToDate { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string LanguageCode { get; set; }

        public bool IncludedInActive { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; } = 20;
    }
}
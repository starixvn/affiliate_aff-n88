using System;
using System.ComponentModel.DataAnnotations;

namespace Fanex.Affiliate.Admin.Core.MetaModels.Report
{
    public class PlayerGgrReportParam
    {
        [MaxLength(30, ErrorMessage = "Affiliate must shorter than 30 characters!")]
        public string AffName { get; set; }

        [MaxLength(30, ErrorMessage = "Player must shorter than 30 characters!")]
        public string PlayerName { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        [Required]
        public string ProductIds { get; set; }

        public int BaseCurrencyId { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public bool IsExportExcel { get; set; }
    }
}

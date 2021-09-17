using System;
using System.ComponentModel.DataAnnotations;

namespace Fanex.Affiliate.Admin.Core.MetaModels.Report
{
    public class PlayerGgrReportParam
    {
        public string AffName { get; set; }

        public string PlayerName { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string ProductIds { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public int BaseCurrencyId { get; set; }

        public bool IsExportExcel { get; set; }
    }
}

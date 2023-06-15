using System;
using System.Collections.Generic;
using Fanex.Affiliate.Admin.Core.DTO;

namespace Fanex.Affiliate.Admin.Core.ViewModels.Report
{
    public class AffiliateReportViewModel : ReportCommonViewModel
    {
        public IEnumerable<Language> LanguageList { get; set; }

        public IEnumerable<Currency> CurrencyList { get; set; }

        public IEnumerable<Currency> PaymentCurrencyList { get; set; }

        public IEnumerable<SelectItem> CommGroupList { get; set; }

        public DateTime ReportCutOffDate { get; set; }
    }
}

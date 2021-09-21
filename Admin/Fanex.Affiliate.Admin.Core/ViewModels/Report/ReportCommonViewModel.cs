using System.Collections.Generic;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.MetaModels.Report;

namespace Fanex.Affiliate.Admin.Core.ViewModels.Report
{
    public class ReportCommonViewModel
    {
        public IEnumerable<Product> ProductList { get; set; }

        public IEnumerable<Currency> BaseCurrencyList { get; set; }
    }
}

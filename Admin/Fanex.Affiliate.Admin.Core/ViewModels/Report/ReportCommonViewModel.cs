using System.Collections.Generic;
using Fanex.Affiliate.Admin.Core.DTO;

namespace Fanex.Affiliate.Admin.Core.ViewModels.Report
{
    public class ReportCommonViewModel
    {
        public IEnumerable<Product> ProductList { get; set; }

        public IEnumerable<Currency> BaseCurrencyList { get; set; }
    }
}

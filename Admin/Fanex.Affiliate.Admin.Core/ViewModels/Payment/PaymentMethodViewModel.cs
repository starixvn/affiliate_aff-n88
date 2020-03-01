using Fanex.Affiliate.Admin.Core.DTO.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.Admin.Core.ViewModels.Payment
{
    public class PaymentMethodViewModel
    {
        public IEnumerable<KeyValuePair<string,string>> PaymentMethods { get; set; }

        public decimal MinAmount { get; set; }
    }
}

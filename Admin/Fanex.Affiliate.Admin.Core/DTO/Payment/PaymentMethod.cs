using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.Admin.Core.DTO.Payment
{
    public class PaymentMethodInfo
    {
        public IEnumerable<string> PaymentMethods { get; set; }

        public decimal MinAmount { get; set; }
    }
}

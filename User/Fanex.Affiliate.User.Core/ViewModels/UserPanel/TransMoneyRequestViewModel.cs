using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.ViewModels.UserPanel
{
    public class TransMoneyRequestViewModel
    {
        public string SubmitName { get; set; }

        public string SearchName { get; set; }

        public decimal Amount { get; set; }

        public decimal PaymentAccountExRate { get; set; }

        public decimal PlayerExRate { get; set; }
    }
}

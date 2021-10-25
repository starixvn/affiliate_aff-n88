using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.DTO.Api
{
    public class CustomerBalanceInfo
    {
        public int CustId { get; set; }

        public string UserName { get; set; }

        public int CurrencyId { get; set; }

        public int Status { get; set; }

        public decimal Balance { get; set; }
    }
}

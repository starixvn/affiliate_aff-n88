using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.DTO.UserPanel.PlayerTransferBalance
{
    public class PlayerTransferBalanceInfo
    {
        public int PaymentAccountId { get; set; }

        public string PaymentAccountName { get; set; }

        public int PaymentAccountCurrencyId { get; set; }

        public string PaymentAccountCurrency { get; set; }

        public int PlayerId { get; set; }

        public int PlayerCurrencyId { get; set; }

        public string PlayerCurrency { get; set; }

        public double ExchangeRate { get; set; }

        public decimal TransferLimit { get; set; }

        public decimal Balance { get; set; }


    }
}

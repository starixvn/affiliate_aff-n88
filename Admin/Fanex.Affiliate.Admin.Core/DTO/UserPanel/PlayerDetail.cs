using System;

namespace Fanex.Affiliate.Admin.Core.DTO.UserPanel
{
    public class PlayerDetail
    {
        public string IbcUserName { get; set; }

        public string UserName { get; set; }

        public DateTime? RegisteredDate { get; set; }

        public decimal Deposit { get; set; }

        public decimal Withdrawal { get; set; }

        public decimal DepositFee { get; set; }

        public decimal WithdrawalFee { get; set; }

        public decimal Bonus { get; set; }

        public decimal Rebate { get; set; }

        public decimal Turnover { get; set; }

        public decimal Winloss { get; set; }

        public string RegisteredDateText => RegisteredDate?.ToString("MM/dd/yyyy HH:mm:ss") ?? string.Empty;
    }
}

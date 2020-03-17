using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.ViewModels.UserPanel
{
    public class StatementHistoryViewModel
    {
        public DateTime MonthDate { get; set; }

        public byte TransType { get; set; }

        public decimal Amount { get; set; }

        public string Status { get; set; }

        public string Description { get; set; }

        public int? ParentId { get; set; }

        public string DateString
        {
            get
            {
                return TransType == (byte)Enum.TransType.Payment
                    || TransType == (byte)Enum.TransType.Adjustment
                    || TransType == (byte)Enum.TransType.SubAffBonus
                    ? MonthDate.ToString("MM-dd-yyyy")
                    : MonthDate.ToString("MMMM-yyyy");
            }
        }

        public string DisplayStatus
        {
            get
            {
                switch (Status.ToLowerInvariant())
                {
                    case "running":
                    case "pending":
                        return Resources.Lang.Proccessing;

                    case "completed":
                        return Resources.Lang.Approved;

                    case "cancelled":
                        return Resources.Lang.Cancelled;

                    case "approved":
                        return Resources.Lang.Approved;

                    case "rejected":
                        return Resources.Lang.Rejected;

                    case "current":
                        return Resources.Lang.Current;

                    default:
                        return Status;
                }
            }
        }

        public string TransTypeString
        {
            get
            {
                switch (TransType)
                {
                    case Constants.TransType.Adjustment:
                        return Resources.Lang.Adjustment;
                    case Constants.TransType.Commission:
                        return Resources.Lang.MonthlyWinlost;
                    case Constants.TransType.Payment:
                        return Resources.Lang.PaymentRequest;
                    case Constants.TransType.SubAffBonus:
                        return Resources.Lang.SubAffiliate;
                    default:
                        return Resources.Lang.Transaction;
                }
            }
        }
    }
}

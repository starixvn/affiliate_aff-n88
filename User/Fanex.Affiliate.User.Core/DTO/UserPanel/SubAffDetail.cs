using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.DTO.UserPanel
{
    public class SubAffDetail
    {
        public int AffId { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime ApprovedDate { get; set; }

        public bool IsSuspended { get; set; }

        public DateTime SuspendedDate { get; set; }

        public decimal Turnover { get; set; }

        public decimal Winloss { get; set; }

        public decimal Commission { get; set; }

        public int ActivePlayer { get; set; }
    }
}

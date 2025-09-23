using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.MetalModels.UserPanel
{
    public class PlayerListParam
    {
        public int AffId { get; set; }

        public int MemberType { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public bool IsGetAll { get; set; }
    }
}

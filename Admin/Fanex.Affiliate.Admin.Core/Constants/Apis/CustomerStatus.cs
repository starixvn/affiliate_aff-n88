using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.Admin.Core.Constants.Apis
{
    public static class CustomerStatus
    {
        public const int RUNNING = 1;
        public const int SUSPENDED = 2;
        public const int CLOSED = 3;
        public const int LOCKED = 5;
        public const int NO_STATUS_CODE = 1000;
        public const int INTERNAL_ERR = 500;
    }
}

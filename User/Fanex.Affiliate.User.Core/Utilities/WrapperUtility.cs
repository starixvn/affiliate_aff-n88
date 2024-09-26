using System;

namespace Fanex.Affiliate.User.Core.Utilities
{
    public class WrapperUtility : IWrapperUtility
    {
        public DateTime GetNowDateTime()
        {
            return DateTimeHelper.NowDateTime;
        }
    }
}

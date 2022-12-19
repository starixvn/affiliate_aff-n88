using Fanex.Affiliate.User.Core.Resources;
using System.Collections.Generic;

namespace Fanex.Affiliate.User.Core.Constants
{
    public static class Menu
    {
        public static IDictionary<string, string> RevenueSharingMenuList => new Dictionary<string, string>
        {
            { "WhatWeHave", Lang.WhatWeHave },
            { "WhatWeOffer", Lang.WhatWeOffer },
            { "OurPlan", Lang.OurPlan },
            { "RevenueSharePayoutExample", Lang.RevenueSharePayoutExample },
            { "HowWePay", Lang.HowWePay }
        };
    }
}

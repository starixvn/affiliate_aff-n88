using System;

namespace Fanex.Affiliate.Admin.Core.MetaModels.Member
{
    public class UpdateMemberParam : UserInfoParam
    {
        public int MemberId { get; set; }

        public DateTime FromDate { get; set; }
    }
}

namespace Fanex.Affiliate.Admin.Core.MetaModels.Member
{
    public class UpdateMemberParam : UserInfoParam
    {
        public int MemberId { get; set; }

        public bool IsRemoved { get; set; }

        public bool IsInclude { get; set; }
    }
}

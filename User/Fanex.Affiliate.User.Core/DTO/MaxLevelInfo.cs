namespace Fanex.Affiliate.User.Core.DTO
{
    public class MaxLevelInfo
    {
        public int AffId { get; set; }

        public bool IsMaxSubLevel { get; set; }

        public bool IsValidAff => AffId > 0 && !IsMaxSubLevel;
    }
}

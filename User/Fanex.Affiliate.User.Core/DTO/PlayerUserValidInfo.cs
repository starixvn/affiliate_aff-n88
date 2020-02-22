using Fanex.Data;

namespace Fanex.Affiliate.User.Core.DTO
{
    public class PlayerUserValidInfo
    {
        public int AffId { get; set; }

        [SpParam(SqlParamName = "Player_Username")]
        public string PlayerUserName { get; set; }
        public bool IsValid { get; set; }
    }
}

namespace Fanex.Affiliate.User.Core.DTO.UserPanel
{
    using System.Collections.Generic;

    public class PlayerListResult
    {
        public IEnumerable<PlayerDetail> Items { get; set; }

        public int TotalRow { get; set; }
    }
}
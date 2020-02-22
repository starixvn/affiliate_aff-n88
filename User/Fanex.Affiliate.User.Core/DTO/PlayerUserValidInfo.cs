using Fanex.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.DTO
{
    public class PlayerUserValidInfo
    {
        [SpParam(SqlParamName = "Player_Username")]
        public string PlayerUserName { get; set; }
        public bool IsValid { get; set; }
    }
}

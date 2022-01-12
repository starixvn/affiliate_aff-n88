using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.DTO.Api
{
    public class AccountApiResult
    {
        public bool Data { get; set; }

        public int ErrorCode { get; set; }

        public string Message { get; set; }

        public string RawErrorCode { get; set; }

        public string RawMessage { get; set; }
    }
}

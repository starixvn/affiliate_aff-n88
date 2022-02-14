using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Affiliate.N88.WebApi.Models.Fake
{
    public class SetAccountResult
    {
        public bool Data { get; set; }

        public int ErrorCode { get; set; }

        public string Message { get; set; }

        public string RawErrorCode { get; set; }

        public string RawMessage { get; set; }
    }
}
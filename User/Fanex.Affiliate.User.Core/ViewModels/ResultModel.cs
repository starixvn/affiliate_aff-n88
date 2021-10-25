using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.ViewModels
{
    public class ResultModel
    {
        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }

        public object Item { get; set; }

        public bool IsSuccess => ErrCode == 0;
    }
}

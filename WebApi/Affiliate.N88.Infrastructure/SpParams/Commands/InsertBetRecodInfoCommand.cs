using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.SpParams.Commands
{
    public class InsertBetRecodInfoCommand : NonQueryCommand
    {
        public override string GetSettingKey() => "Task_Product3rd_ImportQueue";

        public override bool IsValid() => true;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string XmlData { get; set; }

        public int ErrCode { get; set; } = 0;

        public string ErrMsg { get; set; } = String.Empty;
    }
}

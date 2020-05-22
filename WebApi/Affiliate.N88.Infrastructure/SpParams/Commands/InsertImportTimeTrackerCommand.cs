using Affiliate.N88.Core;
using Affiliate.N88.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.SpParams.Commands
{
    public class InsertImportTimeTrackerCommand : IdenticalSuffixNonQueryCommand
    {
        public InsertImportTimeTrackerCommand(IPrefixProvider prefixProvider = null) : base(prefixProvider) { }
        protected override string SuffixSettingKey => "Task_API_TimeTracker_Import";

        public override bool IsValid() => true;

        public string DataSource { get; set; }

        public DateTime CalledTime { get; set; }

        public int ErrCode { get; set; } = 0;

        public string ErrMsg { get; set; } = String.Empty;
    }
}

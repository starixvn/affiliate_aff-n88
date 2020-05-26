using Affiliate.N88.Core;
using System;

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

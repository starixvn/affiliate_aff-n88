

using Affiliate.N88.Core;
using Affiliate.N88.SpParams.Criteria;

namespace Affiliate.N88.SpParams
{
    public class DataTrackerCriteria : IdenticalSurfixCriteriaBase
    {
        public int PushDataType { get; set; }

        public int StatusId { get; set; }

        public DataTrackerCriteria(IPrefixProvider prefixProvider) : base(prefixProvider)
        {
        }

        protected override string SuffixSettingKey => "Task_API_PushDataTracker_Sel";

        public override bool IsValid()
            => true;
    }
}

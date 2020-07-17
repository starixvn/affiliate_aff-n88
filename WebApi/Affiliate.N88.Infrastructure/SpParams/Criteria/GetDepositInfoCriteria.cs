using Fanex.Data.Repository;

namespace Affiliate.N88.SpParams.Criteria
{
    public class GetDepositInfoCriteria : CriteriaBase
    {
        public GetDepositInfoCriteria(int depositId, int batchCount = 2000)
        {
            DepositId = depositId;
            BatchCount = batchCount;
        }

        public override string GetSettingKey() 
            => "N88_Get_DepositInfo";

        public override bool IsValid()
            => true;

        public int DepositId { get; set; }

        public int BatchCount { get; set; }
    }
}

using Fanex.Data.Repository;

namespace Affiliate.N88.SpParams.Criteria
{
    public class GetWithdrawalInfoCriteria : CriteriaBase
    {
        public int Id { get; }

        public int BatchCount { get; }

        public GetWithdrawalInfoCriteria(int id, int batchCount)
        {
            Id = id;
            BatchCount = batchCount;
        }

        public override string GetSettingKey()
            => "API_WithdrawalInfo_Get";

        public override bool IsValid()
            => true;
    }
}

using Fanex.Data.Repository;

namespace Affiliate.N88.SpParams.Criteria
{
    public class GetServerInfoCriteria : CriteriaBase
    {
        public override string GetSettingKey() => "N88_Get_ServerInfo";

        public override bool IsValid() => true;
    }
}

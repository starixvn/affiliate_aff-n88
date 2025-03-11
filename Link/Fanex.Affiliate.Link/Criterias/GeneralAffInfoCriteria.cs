using Fanex.Data.Repository;

namespace Fanex.Affiliate.Link.Criterias
{
    public class GeneralAffInfoCriteria : CriteriaBase
    {
        public string AffCode { get; set; }

        public override string GetSettingKey()
        {
            return "Aff_Get_GeneralAffInfo";
        }

        public override bool IsValid()
        {
            return true;
        }
    }
}
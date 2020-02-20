using Fanex.Data.Repository;

namespace Affiliate.N88.Infrastructure.DTO
{
    public class AffiliateInfo
    {
        public string AffiliateId { get; set; }
        
        public int CustId { get; set; }

        public int SiteId { get; set; }
    }

    public class GetAffiliatesCriteria : CriteriaBase
    {
        public GetAffiliatesCriteria()
        {
        }

        public override string GetSettingKey() => "N8G_AffiliateSel";

        public override bool IsValid() => true;
    }
}

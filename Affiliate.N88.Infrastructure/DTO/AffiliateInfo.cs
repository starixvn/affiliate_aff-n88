using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Affiliate.N88.DTO
{
    public class AffiliateInfo
    {
        public AffiliateInfo(string affiliateId, int custId, int siteId)
        {
            AffiliateId = affiliateId;
            CustId = custId;
            SiteId = siteId;
        }

        public string AffiliateId { get; set; }
        public int CustId { get; set; }
        public int SiteId { get; set; }
    }

    public class GetAffiliatesCriteria : CriteriaBase
    {
        public GetAffiliatesCriteria()
        {
        }

        public override string GetSettingKey() => "N8B_AffiliateSel";

        public override bool IsValid() => true;
    }
}

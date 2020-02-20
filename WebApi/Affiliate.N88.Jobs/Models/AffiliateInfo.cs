namespace Affiliate.N88.Jobs.Models
{
    public class AffiliateInfo
    {
        public AffiliateInfo(string affiliateId, int custId, int siteId)
        {
            AffiliateId = affiliateId;
            CustId = custId;
            SiteId = siteId;
        }

        public string AffiliateId { get; }

        public int CustId { get; }

        public int SiteId { get; }
    }
}
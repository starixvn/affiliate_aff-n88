//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using Refit;

//namespace Affiliate.N88.WebApi.ConsoleTest
//{
//    public interface IAffiliateApi
//    {
//        [Get("/test/TestMySql")]
//        Task<IEnumerable<Affiliate>> GetAffiliates();
//    }

//    public class Affiliate
//    {
//        public Affiliate(string affiliateId, int custId, int siteId)
//        {
//            AffiliateId = affiliateId;
//            CustId = custId;
//            SiteId = siteId;
//        }

//        public string AffiliateId { get; }

//        public int CustId { get; }

//        public int SiteId { get; }
//    }

//}
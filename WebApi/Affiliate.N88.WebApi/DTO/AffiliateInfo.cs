using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Affiliate.N88.WebApi.DTO
{
    public class AffiliateInfo
    {
        public int CustId { get; set; }

        public int SiteId { get; set; }

        public string AffiliateName { get; set; }

        public string ParentAffiliate { get; set; } = null;

        public string AffiliateCode { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ContactNumber { get; set; }

        public string Email { get; set; }

        public string Status { get; set; }
    }
}
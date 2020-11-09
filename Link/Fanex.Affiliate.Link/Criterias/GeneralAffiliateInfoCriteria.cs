using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Fanex.Affiliate.Link.Criterias
{
    public class GeneralAffiliateInfoCriteria : CriteriaBase
    {
        public int AffId { get; set; }

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
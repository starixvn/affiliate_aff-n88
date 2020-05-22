using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.SpParams.Criteria
{
    public class GetServerInfoCriteria : CriteriaBase
    {
        public override string GetSettingKey() => "N88_Get_ServerInfo";

        public override bool IsValid() => true;
    }
}

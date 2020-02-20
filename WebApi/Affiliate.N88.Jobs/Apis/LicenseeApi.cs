using System.Collections.Generic;
using System.Threading.Tasks;
using Affiliate.N88.Jobs.Models;
using Refit;

namespace Affiliate.N88.Jobs.Apis
{
    public interface ILicenseeApi
    {
        [Get("/test/TestMySql")]
        Task<IEnumerable<AffiliateInfo>> GetAffiliates();
    }
}
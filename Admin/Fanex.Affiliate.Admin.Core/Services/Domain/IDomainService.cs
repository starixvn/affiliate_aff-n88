using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Domain;
using Fanex.Affiliate.Admin.Core.MetaModels.Domain;
using System.Collections.Generic;

namespace Fanex.Affiliate.Admin.Core.Services.Domain
{
    public interface IDomainService
    {
        IEnumerable<TargetCountryByDomain> GetTargetCountryListByDomain(int affDomainId = 0, int redirectDomainId = 0);

        IEnumerable<DomainInfo> GetDomainList(bool isAffDomain);

        DomainInfo GetDomainById(int domainId, bool isAffDomain = true);

        ResultInfo InsertDomain(InsertUpdateDomainParam param);

        ResultInfo UpdateDomain(InsertUpdateDomainParam param);

        ResultInfo DeleteDomain(DeleteDomainParam param);
    }
}

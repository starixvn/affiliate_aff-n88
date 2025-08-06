namespace Fanex.Affiliate.Admin.Core.Services.Domain
{
    using System.Collections.Generic;
    using System.Linq;
    using Fanex.Affiliate.Admin.Core.DTO;
    using Fanex.Affiliate.Admin.Core.DTO.Domain;
    using Fanex.Affiliate.Admin.Core.MetaModels.Domain;

    public class DomainService : IDomainService
    {
        private readonly ICommonDomainService _commonDomainService;

        public DomainService(ICommonDomainService commonDomainService)
        {
            _commonDomainService = commonDomainService;
        }

        public IEnumerable<TargetCountryByDomain> GetTargetCountryListByDomain(int affDomainId = 0, int redirectDomainId = 0)
            => _commonDomainService.GetTargetCountryListByDomain(affDomainId, redirectDomainId);

        public IEnumerable<DomainInfo> GetDomainList(bool isAffDomain)
        {
            var spKey = isAffDomain ? "Aff_Admin_AffiliateDomain_Sel" : "Aff_Admin_LicenseeDomain_Sel";

            return _commonDomainService.GetDomainList(spKey);
        }

        public DomainInfo GetDomainById(int domainId, bool isAffDomain = true)
        {
            return GetDomainList(isAffDomain).FirstOrDefault(d => d.DomainId == domainId);
        }

        public ResultInfo InsertDomain(InsertDomainParam param)
        {
            var spKey = param.IsAffDomain ? "Aff_Admin_AffiliateDomain_Ins" : "Aff_Admin_LicenseeDomain_Ins";

            return _commonDomainService.InsertDomain(param, spKey);
        }

        public ResultInfo UpdateDomain(UpdateDomainParam param)
        {
            var spKey = param.IsAffDomain ? "Aff_Admin_AffiliateDomain_Upd" : "Aff_Admin_LicenseeDomain_Upd";

            return _commonDomainService.UpdateDomain(param, spKey);
        }

        public ResultInfo DeleteDomain(DeleteDomainParam param)
        {
            var spKey = param.IsAffDomain ? "Aff_Admin_AffiliateDomain_Del" : "Aff_Admin_LicenseeDomain_Del";

            return _commonDomainService.DeleteDomain(param, spKey);
        }
    }
}
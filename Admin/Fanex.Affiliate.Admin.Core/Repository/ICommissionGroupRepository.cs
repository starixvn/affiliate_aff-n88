using System.Collections.Generic;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.CommissionGroup;
using Fanex.Affiliate.Admin.Core.MetaModels.CommissionGroup;

namespace Fanex.Affiliate.Admin.Core.Repository
{
    public interface ICommissionGroupRepository
    {
        CommissionGroupResultEntity GetCommissionGroupList(GetCommissionGroupParam param);

        ResultInfo CreateCommissionGroup(CreateUpdateCommissionGroupParam param);

        ResultInfo UpdateCommissionGroup(CreateUpdateCommissionGroupParam param);

        ResultInfo DeleteCommissionGroup(DeleteCommissionGroupParam param);

        IEnumerable<DeductionItem> GetDeductionList();

        IEnumerable<SelectItem> GetNormalCommGroupList(GetGroupListParam param);

        IEnumerable<SelectItem> GetAllCommGroups();

        ResultInfo AssignGroup(AssignGroupParam param);
    }
}

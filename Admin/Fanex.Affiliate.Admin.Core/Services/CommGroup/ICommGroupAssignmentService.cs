using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Email;
using Fanex.Affiliate.Admin.Core.MetaModels.CommissionGroup;

namespace Fanex.Affiliate.Admin.Core.Services.CommGroup
{
    public interface ICommGroupAssignmentService
    {
        IEnumerable<DTO.CommissionGroup.CommGroup> GetNormalCommGroupList(GetGroupListParam param);

        Task<ResultInfo> AssignGroup(AssignGroupParam param, AffInfoParam affInfo, AffInformationEmail emailParam);

        Task<ResultInfo> AssignPrivateGroup(CreateUpdateCommissionGroupParam param, AffInfoParam affInfo, AffInformationEmail emailParam);
    }
}
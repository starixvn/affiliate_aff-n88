using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.CommissionGroup;

namespace Fanex.Affiliate.Admin.Core.Utilities.CommGroup
{
    public interface ICommGroupValidation
    {
        ResultInfo ValidateCommGroup(CommissionGroupSetting commGroup);
    }
}

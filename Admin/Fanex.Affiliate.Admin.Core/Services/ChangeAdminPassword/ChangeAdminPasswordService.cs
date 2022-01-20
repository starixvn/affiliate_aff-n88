using Fanex.Affiliate.Admin.Core.Repository;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.MetaModels.ChangeAdminPassword;
using System.Data;

namespace Fanex.Affiliate.Admin.Core.Services.ChangeAdminPassword
{
    public class ChangeAdminPasswordService : BaseRepository, IChangeAdminPasswordService
    {
        public ResultInfo ChangePassword(ChangeAdminPasswordParam param)
        {
            const string SpKey = "Aff_Admin_ChangePassword";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("oldpwd", SqlDbType.NVarChar, param.OldPassword);
                objectDb.AddInParameter("NewPwd", SqlDbType.NVarChar, param.NewPassword);
                objectDb.AddInParameter("CustId", SqlDbType.Int, param.UserId);
                objectDb.AddInParameter("UserID", SqlDbType.Int, param.UserId);
                objectDb.AddInParameter("IP", SqlDbType.VarChar, param.Ip);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }
    }
}

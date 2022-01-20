using System;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.MetaModels.UserPanel;
using System.Data;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.Repository;

namespace Fanex.Affiliate.Admin.Core.Services.UserPanel
{
    public class AdjustmentService : BaseRepository, IAdjustmentService
    {
        public decimal GetBalanceBroughtForward(int affId)
        {
            const string SpKey = "Aff_CustomerSelBalBF";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("AffID", SqlDbType.Int, affId);

                objectDb.AddOutParameter("BalBroughtForward", SqlDbType.Money, Size.SizeOfCurrency);

                objectDb.ExecuteNonQuery();

                var balBroughtForward = objectDb.GetParameterValue("BalBroughtForward");
                return balBroughtForward == DBNull.Value ? 0 : Convert.ToDecimal(balBroughtForward);
            }

        }

        public ResultInfo InsertAdjustment(AdjustmentParam param)
        {
            const string SpKey = "Aff_Admin_AffiliateAdjustment_Ins";
            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("AffID", SqlDbType.Int, param.AffId);
                objectDb.AddInParameter("UserID", SqlDbType.Int, param.UserId);
                objectDb.AddInParameter("Amount", SqlDbType.Money, param.Amount);
                objectDb.AddInParameter("transdesc", SqlDbType.NVarChar, param.Description);
                objectDb.AddInParameter("IP", SqlDbType.VarChar, param.Ip);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }
    }
}

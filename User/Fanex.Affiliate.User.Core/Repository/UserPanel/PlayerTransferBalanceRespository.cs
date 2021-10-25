using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.DTO.UserPanel.PlayerTransferBalance;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.Repository.UserPanel
{
    public class PlayerTransferBalanceRespository : BaseRepository, IPlayerTransferBalanceRepository
    {
        private readonly IObjectDBBuilder _builder;

        private const string TRANS_ID_NAME = "TransId";

        public PlayerTransferBalanceRespository(IObjectDBBuilder builder)
        {
            _builder = builder;
        }

        public PlayerTransferBalanceHistoryResult GetPlayerTransferBalanceHistory(PlayerTransferBalanceHistoryParam param)
        {
            const string nRows = "NRows";
            const string totalBaseAmount = "TotalBasedAmount";
            const string spKey = "Aff_TransferBalanceHistory_Sel";

            var result = new PlayerTransferBalanceHistoryResult();
            using (var objectDb = _builder.Build(spKey))
            {
                objectDb.AddOutParameter(nRows, System.Data.SqlDbType.Int, DbParam.IntSize);
                objectDb.AddOutParameter(totalBaseAmount, System.Data.SqlDbType.Decimal, DbParam.MoneySize);

                var items = objectDb.Query<PlayerTransferBalanceHistoryInfo>(param);

                result.Items = items;
                result.TotalBaseAmount = Convert.ToDecimal(objectDb.GetOuputParams()[totalBaseAmount]);
                result.TotalRow = Convert.ToInt32(objectDb.GetOuputParams()[nRows]);

                return result;
            }
        }

        public PlayerTransferBalanceInfo GetPlayerTransferBalanceInfo(int affId, string playerName)
        {
            const string spKey = "Aff_User_TransferBalanceInfo_Sel";

            using(var objectDb = _builder.Build(spKey))
            {
                return objectDb.QueryEntity<PlayerTransferBalanceInfo>(new { affId, playerName });
            }
        }

        public (int TransId, int ErrCode, string ErrMsg) InsertTransferBalanceRequest(PlayerTransferBalanceInsParam param)
        {
            const string spKey = "Aff_TransferBalanceHistory_Ins";

            using (var objectDB = _builder.Build(spKey))
            {
                AddOutputParam(objectDB);
                objectDB.AddOutParameter(TRANS_ID_NAME, System.Data.SqlDbType.Int, DbParam.IntSize);
                objectDB.ExecuteNonQuery(param);
                var errResult = GetResult(objectDB);
                var transIds = Convert.ToInt32(objectDB.GetOuputParams()[TRANS_ID_NAME]);

                return (transIds, errResult.ErrCode, errResult.ErrMsg);

            }
        }

        public (int ErrCode, string ErrMsg) UpdateTransferBalanceRequest(int transId, string status)
        {
            const string spKey = "Aff_TransferBalanceHistory_Upd";

            using (var objectDB = _builder.Build(spKey))
            {
                AddOutputParam(objectDB);
                objectDB.ExecuteNonQuery(new { transId, status});

                return GetResult(objectDB);

            }
        }
    }
}

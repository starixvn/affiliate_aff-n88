using System;
using System.Collections.Generic;
using System.Data;
using Fanex.Affiliate.Admin.Core.DTO.UserPanel;
using Fanex.Affiliate.Admin.Core.MetaModels.UserPanel;
using Fanex.Data;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.Repository;
using Fanex.Common.Extensions;
using Fanex.Affiliate.Admin.Core.DTO;

namespace Fanex.Affiliate.Admin.Core.Services.UserPanel
{
    public class PlayerDetailService : BaseRepository, IPlayerDetailService
    {
        public EntityResult<PlayerDetail> GetPlayerDetailList(PlayerDetailParam param)
        {
            const string SpKey = "Aff_Admin_PlayersDetail_Sel";
            var result = new EntityResult<PlayerDetail>();
            var dataList = new List<PlayerDetail>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignParam(param, objectDb);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(CreatePlayerDetailItem(reader));
                    }
                }

                result.MainData = dataList;

                var totalRow = objectDb.GetParameterValue("NRows");
                result.TotalItem = totalRow == DBNull.Value ? 0 : Convert.ToInt32(totalRow);
            }

            return result;
        }

        private static PlayerDetail CreatePlayerDetailItem(IDataReader reader)
        {
            return new PlayerDetail
            {
                IbcUserName = reader.ToString("IbcUserName"),
                UserName = reader.ToString("UserName"),
                RegisteredDate = reader["RegisteredDate"] == DBNull.Value ? (DateTime?)null : Convert.ToDateTime(reader["RegisteredDate"]),
                FirstDepositDate = reader["FirstDepositDate"] == DBNull.Value ? (DateTime?)null : Convert.ToDateTime(reader["FirstDepositDate"]),
                FirstDepositAmount = reader["FirstDepositAmount"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(reader["FirstDepositAmount"]),
                Deposit = reader.ToDecimal("Deposit"),
                Withdrawal = reader.ToDecimal("Withdrawal"),
                DepositFee = reader.ToDecimal("DepositFee"),
                WithdrawalFee = reader.ToDecimal("WithdrawalFee"),
                Bonus = reader.ToDecimal("Bonus"),
                Rebate = reader.ToDecimal("Rebate"),
                Turnover = reader.ToDecimal("Turnover"),
                Ggr = reader.ToDecimal("Ggr")
            };
        }

        private static void AssignParam(PlayerDetailParam param, IObjectDb objectDb)
        {
            objectDb.AddInParameter("AffId", SqlDbType.Int, param.AffId);
            objectDb.AddInParameter("ProductId", SqlDbType.TinyInt, param.ProductId);
            objectDb.AddInParameter("MonthDate", SqlDbType.DateTime, param.MonthDate);
            objectDb.AddInParameter("PageIndex", SqlDbType.Int, param.PageIndex);
            objectDb.AddInParameter("PageSize", SqlDbType.Int, param.PageSize);
            objectDb.AddInParameter("IsExportExcel", SqlDbType.Bit, param.IsExportExcel);
            objectDb.AddInParameter("IsSortAsc", SqlDbType.Bit, param.IsSortAsc);
            objectDb.AddInParameter("SortById", SqlDbType.Int, param.SortById);
            objectDb.AddInParameter("BaseCurrency", SqlDbType.Int, param.BaseCurrencyId);
            objectDb.AddInParameter("Currencies", SqlDbType.NVarChar, param.CurrencyIds);

            objectDb.AddOutParameter("NRows", SqlDbType.Int, Size.SizeOfInt);
        }
    }
}

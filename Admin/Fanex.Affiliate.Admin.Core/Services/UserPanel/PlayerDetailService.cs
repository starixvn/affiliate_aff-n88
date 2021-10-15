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
            objectDb.AddInParameter("AffId", DbType.Int32, param.AffId);
            objectDb.AddInParameter("ProductId", DbType.Byte, param.ProductId);
            objectDb.AddInParameter("MonthDate", DbType.DateTime, param.MonthDate);
            objectDb.AddInParameter("PageIndex", DbType.Int32, param.PageIndex);
            objectDb.AddInParameter("PageSize", DbType.Int32, param.PageSize);
            objectDb.AddInParameter("IsExportExcel", DbType.Boolean, param.IsExportExcel);
            objectDb.AddInParameter("IsSortAsc", DbType.Boolean, param.IsSortAsc);
            objectDb.AddInParameter("SortById", DbType.Int32, param.SortById);
            objectDb.AddInParameter("BaseCurrency", DbType.Int32, param.BaseCurrencyId);
            objectDb.AddInParameter("Currencies", DbType.String, param.CurrencyIds);

            objectDb.AddOutParameter("NRows", DbType.Int32, Size.SizeOfInt);
        }
    }
}

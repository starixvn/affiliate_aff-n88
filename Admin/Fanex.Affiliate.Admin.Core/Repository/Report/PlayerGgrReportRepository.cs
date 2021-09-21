using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Report;
using Fanex.Affiliate.Admin.Core.MetaModels.Report;
using Fanex.Common.Extensions;
using Fanex.Data;
using System;
using System.Collections.Generic;
using System.Data;

namespace Fanex.Affiliate.Admin.Core.Repository.Report
{
    public class PlayerGgrReportRepository : BaseRepository, IPlayerGgrReportRepository
    {
        public EntityResult<PlayerGgrReport> GetPlayerGgrReportData(PlayerGgrReportParam param)
        {
            const string SpKey = "Aff_Admin_PlayerReport_GGR";
            var result = new EntityResult<PlayerGgrReport>();
            var dataList = new List<PlayerGgrReport>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignCommonParam(objectDb, param);

                using (var reader = objectDb.ExecuteReader())
                {
                    var selectedProductIdList = param.ProductIds.Split(',');

                    while (reader.Read())
                    {
                        dataList.Add(BuildDataItem(reader, selectedProductIdList));
                    }

                    if (reader.NextResult() && reader.Read())
                    {
                        result.Total = BuildTotalDataItem(reader, selectedProductIdList);
                    }
                }

                result.MainData = dataList;
                var totalRow = objectDb.GetParameterValue("NRows");
                result.TotalItem = totalRow == DBNull.Value ? 0 : Convert.ToInt32(totalRow);
            }

            return result;
        }

        private static void AssignCommonParam(IObjectDb objectDb, PlayerGgrReportParam param)
        {
            objectDb.AddInParameter("AffUsername", DbType.String, param.AffName);
            objectDb.AddInParameter("Username", DbType.String, param.PlayerName);
            objectDb.AddInParameter("FromDate", DbType.DateTime, param.FromDate);
            objectDb.AddInParameter("ToDate", DbType.DateTime, param.ToDate);
            objectDb.AddInParameter("ProductIds", DbType.String, param.ProductIds);
            objectDb.AddInParameter("PageIndex", DbType.Int32, param.PageIndex);
            objectDb.AddInParameter("PageSize", DbType.Int32, param.PageSize);
            objectDb.AddInParameter("IsExportExcel", DbType.Boolean, param.IsExportExcel);
            objectDb.AddInParameter("BaseCurrency", DbType.Int32, param.BaseCurrencyId);

            objectDb.AddOutParameter("NRows", DbType.Int32, Size.SizeOfInt);
        }

        private static PlayerGgrReport BuildDataItem(IDataReader reader, string[] selectedProductIdList)
        {
            var playerGgrReport = new PlayerGgrReport
            {
                AffName = reader.ToString("AffUsername"),
                PlayerName = reader.ToString("Username"),
                RegistrationDate = reader.ToDateTime("RegisteredDate"),
                FdmDate = reader["FirstDepositDate"] == DBNull.Value ? (DateTime?)null : reader.ToDateTime("FirstDepositDate"),
                TotalTurnover = reader.ToDecimal("Total_Turnover"),
                TotalGgr = reader.ToDecimal("Total_Winloss"),
            };

            playerGgrReport.ProductReportList = ProductReportList(reader, selectedProductIdList);

            return playerGgrReport;
        }

        private static PlayerGgrReport BuildTotalDataItem(IDataReader reader, string[] selectedProductIdList)
        {
            var playerGgrReport = new PlayerGgrReport
            {
                TotalTurnover = reader.ToDecimal("Total_Turnover"),
                TotalGgr = reader.ToDecimal("Total_Winloss"),
            };

            playerGgrReport.ProductReportList = ProductReportList(reader, selectedProductIdList);

            return playerGgrReport;
        }

        private static Dictionary<string, PlayerGgrProductInfo> ProductReportList(IDataReader reader, string[] selectedProductIdList)
        {
            var productReportList = new Dictionary<string, PlayerGgrProductInfo>();

            foreach (var productId in selectedProductIdList)
            {
                var item = new PlayerGgrProductInfo
                {
                    Turnover = reader[$"{productId}_Turnover"] == DBNull.Value ? 0 : reader.ToDecimal($"{productId}_Turnover"),
                    Ggr = reader[$"{productId}_Winloss"] == DBNull.Value ? 0 : reader.ToDecimal($"{productId}_Winloss")
                };

                productReportList.Add(productId, item);
            }

            return productReportList;
        }
    }
}

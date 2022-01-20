using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Report;
using Fanex.Affiliate.Admin.Core.Extensions;
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
            objectDb.AddInParameter("AffUsername", SqlDbType.NVarChar, param.AffName);
            objectDb.AddInParameter("Username", SqlDbType.NVarChar, param.PlayerName);
            objectDb.AddInParameter("FromDate", SqlDbType.DateTime, param.FromDate);
            objectDb.AddInParameter("ToDate", SqlDbType.DateTime, param.ToDate);
            objectDb.AddInParameter("ProductIds", SqlDbType.NVarChar, param.ProductIds);
            objectDb.AddInParameter("PageIndex", SqlDbType.Int, param.PageIndex);
            objectDb.AddInParameter("PageSize", SqlDbType.Int, param.PageSize);
            objectDb.AddInParameter("IsExportExcel", SqlDbType.Bit, param.IsExportExcel);
            objectDb.AddInParameter("BaseCurrency", SqlDbType.Int, param.BaseCurrencyId);

            objectDb.AddOutParameter("NRows", SqlDbType.Int, Size.SizeOfInt);
        }

        private static PlayerGgrReport BuildDataItem(IDataReader reader, string[] selectedProductIdList)
        {
            var playerGgrReport = new PlayerGgrReport
            {
                AffName = reader.ToString("AffUsername"),
                PlayerName = reader.ToString("Username"),
                RegistrationDate = reader.GetVal<DateTime?>("RegisteredDate"),
                FdmDate = reader.GetVal<DateTime?>("FirstDepositDate"),
                TotalTurnover = reader.ToDecimal("Total_Turnover"),
                TotalGgr = reader.ToDecimal("Total_Ggr"),
            };

            playerGgrReport.ProductReportList = ProductReportList(reader, selectedProductIdList);

            return playerGgrReport;
        }

        private static PlayerGgrReport BuildTotalDataItem(IDataReader reader, string[] selectedProductIdList)
        {
            var playerGgrReport = new PlayerGgrReport
            {
                TotalTurnover = reader.ToDecimal("Total_Turnover"),
                TotalGgr = reader.ToDecimal("Total_Ggr"),
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
                    Turnover = reader.GetVal<decimal>($"{productId}_Turnover", 0),
                    Ggr = reader.GetVal<decimal>($"{productId}_Ggr", 0)
                };

                productReportList.Add(productId, item);
            }

            return productReportList;
        }
    }
}

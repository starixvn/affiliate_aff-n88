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
    public class TransferReportRepository : BaseRepository, ITransferReportRepository
    {
        public EntityResult<TransferReport> GetTransferReportData(TransferReportParam param)
        {
            const string SpKey = "Aff_TransferBalanceHistory_Sel";
            var result = new EntityResult<TransferReport>();
            var dataList = new List<TransferReport>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignCommonParam(objectDb, param);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(BuildDataItem(reader));
                    }
                }

                result.MainData = dataList;
                var totalRow = objectDb.GetParameterValue("NRows");
                var totalBasedAmount = objectDb.GetParameterValue("TotalBasedAmount");

                result.TotalItem = totalRow == DBNull.Value ? 0 : Convert.ToInt32(totalRow);
                result.Total = totalBasedAmount == DBNull.Value ? null : new TransferReport
                {
                    BasedAmount = Convert.ToDecimal(totalBasedAmount)
                };
            }

            return result;
        }

        private static void AssignCommonParam(IObjectDb objectDb, TransferReportParam param)
        {
            objectDb.AddInParameter("TransId", DbType.Int32, param.TransId);
            objectDb.AddInParameter("AffName", DbType.String, param.AffName);
            objectDb.AddInParameter("PlayerName", DbType.String, param.PlayerName);
            objectDb.AddInParameter("FromDate", DbType.DateTime, param.FromDate);
            objectDb.AddInParameter("ToDate", DbType.DateTime, param.ToDate);
            objectDb.AddInParameter("PageIndex", DbType.Int32, param.PageIndex);
            objectDb.AddInParameter("PageSize", DbType.Int32, param.PageSize);
            objectDb.AddInParameter("IsExportExcel", DbType.Boolean, param.IsExportExcel);
            objectDb.AddInParameter("BaseCurrency", DbType.Int32, param.BaseCurrencyId);

            objectDb.AddOutParameter("NRows", DbType.Int32, Size.SizeOfInt);
            objectDb.AddOutParameter("TotalBasedAmount", DbType.Decimal, Size.SizeOfCurrency);
        }

        private static TransferReport BuildDataItem(IDataReader reader)
        {
            return new TransferReport
            {
                TransId = reader.ToInt("TransId"),
                CreatedDate = reader.GetVal<DateTime>("TransTime"),
                AffName = reader.ToString("AffName"),
                AffPlayerName = reader.ToString("AffPlayerName"),
                PlayerName = reader.ToString("PlayerName"),
                PlayerCurrency = reader.ToString("Currency"),
                AffPlayerCurrency = reader.ToString("AffPlayerCurrency"),
                Status = reader.ToString("Status"),
                Amount = reader.ToDecimal("Amount"),
                AffPlayerAmount = reader.ToDecimal("AffPlayerAmount"),
                BasedAmount = reader.ToDecimal("BasedAmount"),
            };
        }
    }
}

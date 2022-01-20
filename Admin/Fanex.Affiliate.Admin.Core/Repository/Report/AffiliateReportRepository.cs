using System;
using System.Collections.Generic;
using System.Data;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Report;
using Fanex.Affiliate.Admin.Core.MetaModels.Report;
using Fanex.Data;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Common.Extensions;

namespace Fanex.Affiliate.Admin.Core.Repository.Report
{
    public class AffiliateReportRepository : BaseRepository, IAffiliateReportRepository
    {
        private const int OneHundred = 100;
        private const int NumberOfDigits = 2;

        public EntityResult<AffiliateReport> GetMainReportData(AffiliateReportParam param)
        {
            const string SpKey = "Aff_Admin_AffiliateReport_Sel";
            var result = new EntityResult<AffiliateReport>();
            var dataList = new List<AffiliateReport>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignCommonParam(objectDb, param);
                objectDb.AddInParameter("GroupIds", SqlDbType.NVarChar, param.GroupIds);
                objectDb.AddInParameter("PreferredLanguage", SqlDbType.NVarChar, param.PreferredLanguage);
                objectDb.AddInParameter("PaymentCurrencies", SqlDbType.NVarChar, param.PaymentCurrencyIds);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var item = BuildDataItem(reader);
                        item.AffId = reader.ToInt("AffId");
                        item.UserName = reader.ToString("Username");
                        item.PaymentCurrency = reader.ToString("PaymentCurrency");

                        dataList.Add(item);
                    }

                    if (reader.NextResult() && reader.Read())
                    {
                        result.Total = BuildDataItem(reader);
                    }
                }

                result.MainData = dataList;
                var totalRow = objectDb.GetParameterValue("NRows");
                result.TotalItem = totalRow == DBNull.Value ? 0 : Convert.ToInt32(totalRow);
            }

            return result;
        }

        public EntityResult<AffiliateReport> GetDetailReportData(AffiliateReportParam param)
        {
            const string SpKey = "Aff_Admin_AffiliateReport_Detail_Sel";
            var result = new EntityResult<AffiliateReport>();

            var dataList = new List<AffiliateReport>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignCommonParam(objectDb, param);
                objectDb.AddInParameter("IsGetAll", SqlDbType.Bit, param.IsGetAll);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var item = BuildDataItem(reader);
                        item.MonthDate = reader.ToDateTime("MonthDate");
                        item.Description = reader.ToString("Description");

                        dataList.Add(item);
                    }

                    if (reader.NextResult() && reader.Read())
                    {
                        result.Total = BuildDataItem(reader);
                    }
                }

                result.MainData = dataList;
                var totalRow = objectDb.GetParameterValue("NRows");
                result.TotalItem = totalRow == DBNull.Value ? 0 : Convert.ToInt32(totalRow);
            }

            return result;
        }

        private static void AssignCommonParam(IObjectDb objectDb, AffiliateReportParam param)
        {
            objectDb.AddInParameter("Username", SqlDbType.NVarChar, param.UserName);
            objectDb.AddInParameter("FromDate", SqlDbType.DateTime, param.FromDate);
            objectDb.AddInParameter("ToDate", SqlDbType.DateTime, param.ToDate);
            objectDb.AddInParameter("ProductIds", SqlDbType.NVarChar, param.ProductIds);
            objectDb.AddInParameter("SortType", SqlDbType.TinyInt, param.SortType);
            objectDb.AddInParameter("SortDirectionType", SqlDbType.TinyInt, param.SortDirectionType);
            objectDb.AddInParameter("PageIndex", SqlDbType.Int, param.PageIndex);
            objectDb.AddInParameter("PageSize", SqlDbType.Int, param.PageSize);
            objectDb.AddInParameter("IsExportExcel", SqlDbType.Bit, param.IsExportExcel);
            objectDb.AddInParameter("BaseCurrency", SqlDbType.Int, param.BaseCurrencyId);
            objectDb.AddInParameter("Currencies", SqlDbType.NVarChar, param.CurrencyIds);
            objectDb.AddOutParameter("NRows", SqlDbType.Int, Size.SizeOfInt);
        }

        private static AffiliateReport BuildDataItem(IDataReader reader)
        {
            return new AffiliateReport
            {
                TotalClick = reader.ToInt("TotalClick"),
                UniqueClick = reader.ToInt("UniqueClick"),
                Signup = reader.ToInt("Signup"),
                Fdm = reader.ToInt("FDM"),
                ActiveMember = reader.ToInt("ActivePlayer"),
                Deposit = reader.ToDecimal("Deposit"),
                Withdrawal = reader.ToDecimal("Withdrawal"),
                Turnover = reader.ToDecimal("Turnover"),
                Ggr = reader.ToDecimal("Ggr"),
                Bonus = reader.ToDecimal("Bonus"),
                Rebate = reader.ToDecimal("Rebate"),
                PlatformFee = reader.ToDecimal("PlatformFee"),
                OperationalFee = reader.ToDecimal("OperationalFee"),
                DepositFee = reader.ToDecimal("DepositFee"),
                WithdrawalFee = reader.ToDecimal("WithdrawalFee"),
                TotalFee = reader.ToDecimal("TotalFee"),
                CommissionRate = decimal.Round(OneHundred *reader.ToDecimal("CommissionRate"), NumberOfDigits),
                Earning = reader.ToDecimal("Earning"),
                AffWithdrawal = reader.ToDecimal("AffWithdrawal"),
                AffAdjustment = reader.ToDecimal("AffAdjustment"),
                BalanceBf = reader.ToDecimal("BFF"),
                NoOfSubAff = reader.ToInt("NoOfSubAff"),
                SubAffEarning = reader.ToDecimal("SubAffEarning"),
                P2pEarning = reader.ToDecimal("P2PEarning")
            };
        }
    }
}
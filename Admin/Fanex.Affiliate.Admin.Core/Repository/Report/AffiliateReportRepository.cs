using System;
using System.Collections.Generic;
using System.Data;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Report;
using Fanex.Affiliate.Admin.Core.MetaModels.Report;
using Fanex.Common.Extensions;
using Fanex.Data;

namespace Fanex.Affiliate.Admin.Core.Repository.Report
{
    public class AffiliateReportRepository : BaseRepository, IAffiliateReportRepository
    {
        private const int PercentageUnit = 100;

        public DateTime GetReportCutOffDate()
        {
            const string SpKey = "Task_Aff_GetSetting";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.SetParameterValue("SName", "Report_CutOffDate");

                return objectDb.QueryEntity<DateTime>();
            }
        }

        public AffiliateReportResult GetMainReportData(AffiliateReportParam param)
        {
            const string SpKey = "Aff_Admin_AffiliateReport_Sel";
            var result = new AffiliateReportResult();
            var dailyList = new List<AffiliateReportDaily>();
            var dataList = new List<AffiliateReport>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignCommonParam(objectDb, param);
                objectDb.SetParameterValue("GroupIds", param.GroupIds);
                objectDb.SetParameterValue("PreferredLanguage", param.PreferredLanguage);
                objectDb.SetParameterValue("PaymentCurrencies", param.PaymentCurrencyIds);
                objectDb.SetParameterValue("IsExcludeNegvBBF", param.IsExcludeNegvBBF);
                objectDb.SetParameterValue("IsExcludeNegvCurrentBBF", param.IsExcludeNegvCurrentBBF);
                objectDb.SetParameterValue("IsGetMonthly", param.IsGetMonthly);
                objectDb.SetParameterValue("IsByApprovalMonth", param.IsByApprovalMonth);

                using (var reader = objectDb.ExecuteReader())
                {
                    if (param.IsExportExcel)
                    {
                        while (reader.Read())
                        {
                            var item = BuildDailyItem(reader);
                            dailyList.Add(item);
                        }

                        reader.NextResult();
                    }

                    while (reader.Read())
                    {
                        var item = BuildDataItem(reader);
                        item.AffId = reader.ToInt("AffId");
                        item.UserName = reader.ToString("Username");
                        item.PaymentCurrency = reader.ToString("PaymentCurrency");
                        item.IsMultiGroupProduct = reader.ToBool("IsMultiGroupProduct");
                        item.CurrentBBF = reader.ToDecimal("CurrentBFF");

                        dataList.Add(item);
                    }

                    if (reader.NextResult() && reader.Read())
                    {
                        result.Total = BuildDataItem(reader);
                        result.Total.CurrentBBF = reader.ToDecimal("CurrentBFF");
                    }
                }

                result.Details = dailyList;
                result.MainData = dataList;
                result.TotalItem = GetTotalRows(objectDb);
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
                objectDb.SetParameterValue("EarningType", param.EarningBy);
                objectDb.SetParameterValue("IsGetAll", param.IsGetAll);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var item = BuildDataItem(reader);
                        item.EarningBy = reader.ToString("EarningBy");
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
                result.TotalItem = GetTotalRows(objectDb);
            }

            return result;
        }

        private static void AssignCommonParam(IObjectDb objectDb, AffiliateReportParam param)
        {
            objectDb.SetParameterValue("Username", param.UserName);
            objectDb.SetParameterValue("FromDate", param.FromDate);
            objectDb.SetParameterValue("ToDate", param.ToDate);
            objectDb.SetParameterValue("ProductIds", param.ProductIds);
            objectDb.SetParameterValue("SortType", param.SortType);
            objectDb.SetParameterValue("SortDirectionType", param.SortDirectionType);
            objectDb.SetParameterValue("PageIndex", param.PageIndex);
            objectDb.SetParameterValue("PageSize", param.PageSize);
            objectDb.SetParameterValue("IsExportExcel", param.IsExportExcel);
            objectDb.SetParameterValue("BaseCurrency", param.BaseCurrencyId);
            objectDb.SetParameterValue("Currencies", param.CurrencyIds);
            objectDb.SetParameterValue("NRows", DefaultValue.Int);
        }

        private static void MapBaseFields(IDataReader reader, AffiliateReportBase report)
        {
            report.TotalClick = reader.ToInt("TotalClick");
            report.UniqueClick = reader.ToInt("UniqueClick");
            report.Signup = reader.ToInt("Signup");
            report.Fdm = reader.ToInt("FDM");
            report.ActiveMember = reader.ToInt("ActivePlayer");
            report.NoOfSubAff = reader.ToInt("NoOfSubAff");
            report.TotalDeposit = reader.ToLong("TotalDeposit");
        }

        private static AffiliateReport BuildDataItem(IDataReader reader)
        {
            var report = new AffiliateReport();
            MapBaseFields(reader, report);

            report.Withdrawal = reader.ToDecimal("Withdrawal");
            report.Turnover = reader.ToDecimal("Turnover");
            report.Ggr = reader.ToDecimal("Ggr");
            report.Bonus = reader.ToDecimal("Bonus");
            report.Rebate = reader.ToDecimal("Rebate");
            report.PlatformFee = reader.ToDecimal("PlatformFee");
            report.DepositFee = reader.ToDecimal("DepositFee");
            report.WithdrawalFee = reader.ToDecimal("WithdrawalFee");
            report.TotalFee = reader.ToDecimal("TotalFee");
            report.CommissionRate = PercentageUnit * reader.ToDecimal("CommissionRate");
            report.Earning = reader.ToDecimal("Earning");
            report.AffWithdrawal = reader.ToDecimal("AffWithdrawal");
            report.AffAdjustment = reader.ToDecimal("AffAdjustment");
            report.BalanceBf = reader.ToDecimal("BFF");
            report.SubAffEarning = reader.ToDecimal("SubAffEarning");
            report.P2pEarning = reader.ToDecimal("P2PEarning");
            report.Deposit = reader.ToDecimal("Deposit");
            report.QualifiedMember = reader.ToInt("QualifiedMember");

            return report;
        }

        private static AffiliateReportDaily BuildDailyItem(IDataReader reader)
        {
            var report = new AffiliateReportDaily();
            MapBaseFields(reader, report);

            report.WinLostDate = reader.ToDateTime("WinLostDate");
            report.AffId = reader.ToInt("AffId");
            report.UserName = reader.ToString("Username");
            report.PaymentCurrency = reader.ToString("PaymentCurrency");
            report.DepositAmount = reader.ToDecimal("DepositAmount");

            return report;
        }

    }
}
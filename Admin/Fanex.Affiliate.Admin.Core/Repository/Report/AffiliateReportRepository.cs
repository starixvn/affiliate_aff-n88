using System;
using System.Collections.Generic;
using System.Data;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Report;
using Fanex.Affiliate.Admin.Core.Extensions;
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
                objectDb.AddInParameter("PreferredLanguage", DbType.String, param.PreferredLanguage);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(BuildDataItem(reader));
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
                objectDb.AddInParameter("IsGetAll", DbType.Boolean, param.IsGetAll);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(BuildDataItem(reader));
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

        public IList<string> SearchAffiliateList(string userName)
        {
            const string SpKey = "Aff_AffiliateUsername_SearchEx";
            var result = new List<string>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("UserName", DbType.String, userName);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(reader.ToString("UserName"));
                    }
                }
            }

            return result;
        }

        private static void AssignCommonParam(IObjectDb objectDb, AffiliateReportParam param)
        {
            objectDb.AddInParameter("Username", DbType.String, param.UserName);
            objectDb.AddInParameter("FromDate", DbType.DateTime, param.FromDate);
            objectDb.AddInParameter("ToDate", DbType.DateTime, param.ToDate);
            objectDb.AddInParameter("ProductIds", DbType.String, param.ProductIds);
            objectDb.AddInParameter("SortType", DbType.Byte, param.SortType);
            objectDb.AddInParameter("SortDirectionType", DbType.Byte, param.SortDirectionType);
            objectDb.AddInParameter("PageIndex", DbType.Int32, param.PageIndex);
            objectDb.AddInParameter("PageSize", DbType.Int32, param.PageSize);
            objectDb.AddInParameter("IsExportExcel", DbType.Boolean, param.IsExportExcel);
            objectDb.AddInParameter("BaseCurrency", DbType.Int32, param.BaseCurrencyId);
            objectDb.AddInParameter("Currencies", DbType.String, param.CurrencyIds);
            objectDb.AddOutParameter("NRows", DbType.Int32, Size.SizeOfInt);
        }

        private static AffiliateReport BuildDataItem(IDataReader reader)
        {
            return new AffiliateReport
            {
                AffId = reader.HasColumn("AffId") ?reader.ToInt("AffId") : 0,
                UserName = reader.HasColumn("Username") ?reader.ToString("Username") : string.Empty,
                MonthDate = reader.HasColumn("MonthDate") ?reader.ToDateTime("MonthDate") : (DateTime?)null,
                Description = reader.HasColumn("Description") ?reader.ToString("Description") : string.Empty,
                TotalClick =reader.ToInt("TotalClick"),
                UniqueClick =reader.ToInt("UniqueClick"),
                Signup =reader.ToInt("Signup"),
                Fdm =reader.ToInt("FDM"),
                ActiveMember =reader.ToInt("ActiveMember"),
                QualifiedMember =reader.ToInt("QualifiedMember"),
                Deposit =reader.ToDecimal("Deposit"),
                Withdrawal =reader.ToDecimal("Withdrawal"),
                Turnover =reader.ToDecimal("Turnover"),
                Winlost =reader.ToDecimal("Winlost"),
                Bonus =reader.ToDecimal("Bonus"),
                Rebate = reader.ToDecimal("Rebate"),
                PlatformFee =reader.ToDecimal("PlatformFee"),
                OperationalFee =reader.ToDecimal("OperationalFee"),
                DepositFee =reader.ToDecimal("DepositFee"),
                WithdrawalFee = reader.ToDecimal("WithdrawalFee"),
                TotalFee =reader.ToDecimal("TotalFee"),
                CommissionRate = decimal.Round(OneHundred *reader.ToDecimal("CommissionRate"), NumberOfDigits),
                Earning =reader.ToDecimal("Earning"),
                AffWithdrawal =reader.ToDecimal("AffWithdrawal"),
                AffAdjustment =reader.ToDecimal("AffAdjustment"),
                BalanceBf =reader.ToDecimal("BFF"),
                NoOfSubAff =reader.ToInt("NoOfSubAff"),
                SubAffEarning =reader.ToDecimal("SubAffEarning")
            };
        }
    }
}
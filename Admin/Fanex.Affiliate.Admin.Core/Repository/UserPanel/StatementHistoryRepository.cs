using System;
using System.Collections.Generic;
using System.Data;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.UserPanel;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Affiliate.Admin.Core.MetaModels.UserPanel;
using Fanex.Affiliate.Admin.Core.MetaModels;
using Fanex.Affiliate.Admin.Core.Constants;

namespace Fanex.Affiliate.Admin.Core.Repository.UserPanel
{
    public class StatementHistoryRepository : BaseRepository, IStatementHistoryRepository
    {
        public EntityResult<StatementHistory> GetStatementHistoryList(AffiliatePagingByDateParam param)
        {
            const string SpKey = "Aff_Admin_StatementHistory_Sel";
            var result = new EntityResult<StatementHistory>();
            var dataList = new List<StatementHistory>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.AffId, DbType.Int32, param.AffId);
                objectDb.AddInParameter("FDate", DbType.DateTime, param.FromDate);
                objectDb.AddInParameter("TDate", DbType.DateTime, param.ToDate);
                objectDb.AddInParameter("PageIndex", DbType.Int32, param.PageIndex);
                objectDb.AddInParameter("PageSize", DbType.Int32, param.PageSize);

                objectDb.AddOutParameter(Field.NRows, DbType.Int32, Size.SizeOfInt);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(new StatementHistory
                        {
                            TransId = Convert.ToInt64(reader["TransId"]),
                            Date = Convert.ToDateTime(reader[Field.MonthDate]),
                            TransType = Convert.ToInt32(reader["TransType"]),
                            Amount = Convert.ToDecimal(reader["Amount"]),
                            Status = Convert.ToString(reader["Status"]),
                            Creator = Convert.ToString(reader["Creator"]),
                            Description = Convert.ToString(reader["Description"]),
                            CalculatedType = reader["CalculatedType"] == DBNull.Value ? null : (byte?)(reader["CalculatedType"])
                        });
                    }
                }

                result.MainData = dataList;
                var totalRow = objectDb.GetParameterValue(Field.NRows);
                result.TotalItem = totalRow == DBNull.Value ? 0 : Convert.ToInt32(totalRow);
            }

            return result;
        }

        public EntityResult<SubAffiliate> GetSubAffiliate(SubAffiliateParam param)
        {
            const string uSpKey = "Aff_SubAffiliate_Commission_Sel";

            var result = new EntityResult<SubAffiliate>();
            var dataList = new List<SubAffiliate>();

            using (var objectDb = GetObjectDb(uSpKey))
            {
                objectDb.AddInParameter(Field.AffId, DbType.Int32, param.AffId);
                objectDb.AddInParameter(Field.MonthDate, DbType.DateTime, param.MonthDate);
                objectDb.AddInParameter("BaseCurrency", DbType.Int32, param.CurrencyId);
                objectDb.AddInParameter("PageIndex", DbType.Int32, param.PageIndex);
                objectDb.AddInParameter("PageSize", DbType.Int32, param.PageSize);

                objectDb.AddOutParameter(Field.NRows, DbType.Int32, Size.SizeOfInt);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(BuildSubAffilliateItem(reader));
                    }
                    result.MainData = dataList;
                    var totalRow = objectDb.GetParameterValue(Field.NRows);
                    result.TotalItem = totalRow == DBNull.Value ? 0 : Convert.ToInt32(totalRow);

                    if (reader.NextResult() && reader.Read())
                    {
                        result.Total = BuildSubAffilliateItem(reader);
                    }
                }
            }

            return result;
        }

        public DailyEarningResult GetDailyEarning(DailyEarningParam param)
        {
            const string uSpKey = "Aff_DailyEarning_Sel";

            var dailyEarningResult = new DailyEarningResult();
            var dataList = new List<DailyEarning>();

            using (var objectDb = GetObjectDb(uSpKey))
            {
                objectDb.AddInParameter(Field.AffId, DbType.Int32, param.AffId);
                objectDb.AddInParameter("ProductId", DbType.Int16, param.ProductId);
                objectDb.AddInParameter(Field.MonthDate, DbType.DateTime, param.MonthDate);
                objectDb.AddInParameter("BaseCurrency", DbType.Int32, param.CurrencyId);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(BuildDailyEarningItem(reader));
                    }
                    dailyEarningResult.MainData = dataList;

                    if (reader.NextResult() && reader.Read())
                    {
                        dailyEarningResult.Total = BuildDailyEarningItem(reader);
                    }
                }
            }

            return dailyEarningResult;
        }

        public IEnumerable<DailyEarningDetail> GetDailyEarningDetail(DailyEarningParam param)
        {
            const string SpKey = "Aff_DailyEarning_Detail_Sel";
            var result = new List<DailyEarningDetail>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.AffId, DbType.Int32, param.AffId);
                objectDb.AddInParameter("ProductId", DbType.Int16, param.ProductId);
                objectDb.AddInParameter(Field.MonthDate, DbType.DateTime, param.MonthDate);
                objectDb.AddInParameter("BaseCurrency", DbType.Int32, param.CurrencyId);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(new DailyEarningDetail
                        {
                            CustId = Convert.ToInt32(reader["CustId"]),
                            UserName = Convert.ToString(reader["UserName"]),
                            IbcUserName = Convert.ToString(reader["IBCUsername"]),
                            WinLost = Convert.ToDecimal(reader["Winlost"]),
                            Deposit = Convert.ToDecimal(reader["Deposit"]),
                            Withdrawal = Convert.ToDecimal(reader["Withdrawal"]),
                            Bonus = Convert.ToDecimal(reader["Bonus"]),
                            BankingFee = Convert.ToDecimal(reader["BankingFee"])
                        });
                    }
                }
            }

            return result;
        }

        private static DailyEarning BuildDailyEarningItem(IDataReader reader)
        {
            return new DailyEarning
            {
                WinlostDate = reader.HasColumn("WinlostDate") ? Convert.ToDateTime(reader["WinlostDate"]) : (DateTime?)null,
                Deposit = Convert.ToDecimal(reader["Deposit"]),
                Withdrawal = Convert.ToDecimal(reader["Withdrawal"]),
                MemberWinLost = Convert.ToDecimal(reader["MemberWinLost"]),
                Bonus = Convert.ToDecimal(reader["Bonus"]),
                BankingFee = reader["BankingFee"] == DBNull.Value ? 0m : Convert.ToDecimal(reader["BankingFee"])
            };
        }
        private static SubAffiliate BuildSubAffilliateItem(IDataReader reader)
        {
            return new SubAffiliate
            {
                AffId = Convert.ToInt32(reader[Field.AffId]),
                AffName = Convert.ToString(reader["UserName"]),
                Commission = reader["Commission"] == DBNull.Value ? 0m : Convert.ToDecimal(reader["Commission"]),
                SubAffCommission = reader["SubAffCommission"] == DBNull.Value ? 0m : Convert.ToDecimal(reader["SubAffCommission"])
            };
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Common.Extensions;

namespace Fanex.Affiliate.User.Core.Repository.UserPanel
{
    public class StatementHistoryRepository : IStatementHistoryRepository
    {
        private readonly IObjectDBBuilder _builder;

        public StatementHistoryRepository(IObjectDBBuilder builder)
        {
            _builder = builder;
        }
        public IEnumerable<StatementHistory> GetStatementHistory(StatementHistoryParam statementHistoryParam)
        {
            const string uSpKey = "Aff_User_StatementHistory_Sel";
            var dbMode = statementHistoryParam.IsInternal ? DBMode.View : DBMode.Main;
            var dataList = new List<StatementHistory>();

            using (var objectDb = _builder.Build(uSpKey, dbMode))
            {
                using (var reader = objectDb.ExecuteReader(statementHistoryParam))
                {
                    while (reader.Read())
                    {
                        var transType = reader.ToByte("TransType");
                        var monthDate = reader.ToDateTime("MonthDate");

                        dataList.Add(new StatementHistory
                        {
                            MonthDate = monthDate,
                            TransType = transType,
                            Amount = reader["Amount"] == DBNull.Value ? 0 : reader.ToDecimal("Amount"),
                            Description = reader.ToString("Description"),
                            Status = reader.ToString("Status"),
                            CalculatedType = reader["CalculatedType"] == DBNull.Value ? null : (byte?)(reader["CalculatedType"]),
                        });
                    }
                }
            }

            return dataList;
        }

        public IEnumerable<ProductItem> GetProductList(bool isInternal)
        {
            const string uSpKey = "Aff_ProductList_Sel";
            var dbMode = isInternal ? DBMode.View : DBMode.Main;

            using (var objectDb = _builder.Build(uSpKey, dbMode))
            {
                return objectDb.Query<ProductItem>();
            }
        }

        public DailyEarningResult GetDailyEarning(DailyEarningParam dailyEarningParam)
        {
            const string uSpKey = "Aff_DailyEarning_Sel";
            var dbMode = dailyEarningParam.IsInternal ? DBMode.View : DBMode.Main;

            var dailyEarningResult = new DailyEarningResult();
            var dataList = new List<DailyEarning>();

            using (var objectDb = _builder.Build(uSpKey, dbMode))
            {
                using (var reader = objectDb.ExecuteReader(dailyEarningParam))
                {
                    while (reader.Read())
                    {
                        var item = BuildDailyEarningItem(reader);
                        item.WinlostDate = reader.ToDateTime("WinlostDate");

                        dataList.Add(item);
                    }
                    dailyEarningResult.MainDataList = dataList;

                    if (reader.NextResult() && reader.Read())
                    {
                        dailyEarningResult.Total = BuildDailyEarningItem(reader);
                    }
                }
            }

            return dailyEarningResult;
        }

        public IEnumerable<SubAffComInfo> GetSubAffCommission(SubAffComParam subAffParam)
        {
            const string uSpKey = "Aff_SubAffiliate_Commission_Sel";
            var mode = subAffParam.IsInternal ? DBMode.View : DBMode.Main;

            using (var objecDb = _builder.Build(uSpKey, mode))
            {
                var result = objecDb.Query<SubAffComInfo>(subAffParam);
                return result;
            }
        }

        private DailyEarning BuildDailyEarningItem(IDataReader reader)
        {
            return new DailyEarning
            {
                Deposit = reader.ToDecimal("Deposit"),
                Withdrawal = reader.ToDecimal("Withdrawal"),
                MemberGGR = reader.ToDecimal("GGR"),
                Bonus = reader.ToDecimal("Bonus"),
                Rebate = reader.ToDecimal("Rebate"),
            };
        }
    }
}
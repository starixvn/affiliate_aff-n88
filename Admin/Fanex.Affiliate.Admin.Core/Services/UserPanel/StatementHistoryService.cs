using System;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.UserPanel;
using Fanex.Affiliate.Admin.Core.MetaModels.UserPanel;
using Fanex.Affiliate.Admin.Core.Repository.UserPanel;
using Fanex.Affiliate.Admin.Core.MetaModels;
using System.Collections.Generic;
using Fanex.Affiliate.Admin.Core.Constants;
using System.Linq;

namespace Fanex.Affiliate.Admin.Core.Services.UserPanel
{
    public class StatementHistoryService : IStatementHistoryService
    {
        private readonly IStatementHistoryRepository _statementHistoryRepository;

        public StatementHistoryService(IStatementHistoryRepository statementHistoryRepository)
        {
            _statementHistoryRepository = statementHistoryRepository;
        }

        public DailyEarningResult GetDailyEarning(DailyEarningParam param)
        {
            return _statementHistoryRepository.GetDailyEarning(param);
        }

        public DailyEarningDetailResult GetDailyEarningDetail(DailyEarningParam param)
        {
            var rawData = _statementHistoryRepository.GetDailyEarningDetail(param);

            var total = new DailyEarningDetail();

            foreach (var item in rawData)
            {
                total.WinLost += item.WinLost;
                total.Deposit += item.Deposit;
                total.Withdrawal += item.Withdrawal;
                total.Bonus += item.Bonus;
                total.BankingFee += item.BankingFee;
            }

            return new DailyEarningDetailResult
            {
                MainData = rawData,
                Total = total
            };
        }

        public EntityResult<StatementHistory> GetStatementHistoryList(AffiliatePagingByDateParam param)
        {
            var vms = new List<StatementHistory>();
            var result = _statementHistoryRepository.GetStatementHistoryList(param);
            foreach (var item in result.MainData)
            {
                if (item.TransType == Code.MonthlyWinlost || item.TransType == Code.SubAffiliate)
                {
                    if (CheckIfExistMonthlyTotal(item.Date, vms))
                    {
                        continue;
                    }
                    vms.Add(CreateMonthlyTotal(item.Date, result.MainData));
                }
                else
                {
                    vms.Add(item);
                }
            }

            return new EntityResult<StatementHistory> {
                MainData = vms,
                TotalItem = result.TotalItem
            };
        }
     
        private static StatementHistory CreateMonthlyTotal(DateTime monthDate, IEnumerable<StatementHistory> statementHistoryList)
        {
            var children = statementHistoryList.Where(s => s.Date == monthDate)
                .Where(s => s.TransType == Code.SubAffiliate || s.TransType == Code.MonthlyWinlost);

            var monthlyCom = children.FirstOrDefault(s => s.TransType == Code.MonthlyWinlost);

            var monthlyTotal = new StatementHistory
            {
                Amount = children.Sum(s => s.Amount),
                Date = monthDate,
                Description = monthlyCom?.Description ?? "Monthly Total",
                Children = children,
                Status = monthlyCom?.Status ?? children.FirstOrDefault()?.Status,
                TransType = Code.MonthlyTotal
            };
            return monthlyTotal;
        }

        private static bool CheckIfExistMonthlyTotal(DateTime monthDate, List<StatementHistory> vms)
        {
            return vms.Any(m => m.Date == monthDate && m.TransType == Code.MonthlyTotal);
        }
    }
}
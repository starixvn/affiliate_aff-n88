using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Report;
using Fanex.Affiliate.Admin.Core.MetaModels.Report;
using Fanex.Affiliate.Admin.Core.Repository.Report;
using System;
using System.Collections.Generic;

namespace Fanex.Affiliate.Admin.Core.Services.Report
{
    public class PlayerGgrReportService : IPlayerGgrReportService
    {
        private readonly IPlayerGgrReportRepository _playerGgrReportRepository;

        public PlayerGgrReportService(IPlayerGgrReportRepository playerGgrReportRepository)
        {
            _playerGgrReportRepository = playerGgrReportRepository;
        }

        public EntityResult<PlayerGgrReport> GetPlayerGgrReportData(PlayerGgrReportParam param)
        {
            if (!IsValidDateRange(param.FromDate, param.ToDate))
            {
                return new EntityResult<PlayerGgrReport> { MainData = new List<PlayerGgrReport>()};
            }

            return _playerGgrReportRepository.GetPlayerGgrReportData(param);
        }

        private static bool IsValidDateRange(DateTime from, DateTime to)
        {
            var maxMonth = from.AddMonths(6);

            return DateTime.Compare(maxMonth, to) >= 0;
        }
    }
}

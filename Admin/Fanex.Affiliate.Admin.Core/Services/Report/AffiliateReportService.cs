using System;
using System.Collections.Generic;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Report;
using Fanex.Affiliate.Admin.Core.MetaModels.Report;
using Fanex.Affiliate.Admin.Core.Repository.Report;
using Fanex.Affiliate.Admin.Core.Utilities;

namespace Fanex.Affiliate.Admin.Core.Services.Report
{
    public class AffiliateReportService : IAffiliateReportService
    {
        private readonly IAffiliateReportRepository _affiliateReportRepository;

        public AffiliateReportService(IAffiliateReportRepository affiliateReportRepository)
        {
            _affiliateReportRepository = affiliateReportRepository;
        }

        public EntityResult<AffiliateReport> GetMainReportData(AffiliateReportParam param)
        {
            if (!IsValidParam(param))
            {
                return new EntityResult<AffiliateReport>();
            }

            return _affiliateReportRepository.GetMainReportData(param);
        }

        public EntityResult<AffiliateReport> GetDetailReportData(AffiliateReportParam param)
        {
            return _affiliateReportRepository.GetDetailReportData(param);
        }

        public IList<string> SearchAffiliateList(string userName)
        {
            const byte MinCharacterLength = 2;

            return string.IsNullOrEmpty(userName) || userName.Length < MinCharacterLength ?
                new List<string>() :
                _affiliateReportRepository.SearchAffiliateList(userName);
        }

        private static bool IsValidParam(AffiliateReportParam param)
        {
            const int ValidMonthArrange = 5;
            return !string.IsNullOrEmpty(param.ProductIds) && DateTimeHelper.IsValidDateRange(param.FromDate, param.ToDate, ValidMonthArrange);
        }
    }
}
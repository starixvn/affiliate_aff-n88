namespace Fanex.Affiliate.Admin.Core.Services.Report
{
    using System;
    using DTO;
    using Fanex.Affiliate.Admin.Core.DTO.Report;
    using Fanex.Affiliate.Admin.Core.MetaModels.Report;
    using Fanex.Affiliate.Admin.Core.Repository.Report;

    public class AffiliateReportService : IAffiliateReportService
    {
        private readonly IAffiliateReportRepository _affiliateReportRepository;

        public AffiliateReportService(IAffiliateReportRepository affiliateReportRepository)
        {
            _affiliateReportRepository = affiliateReportRepository;
        }

        public AffiliateReportResult GetMainReportData(AffiliateReportParam param)
        {
            if (!IsValidParam(param))
            {
                return new AffiliateReportResult();
            }

            var data = _affiliateReportRepository.GetMainReportData(param);
            return data;
        }

        public EntityResult<AffiliateReport> GetDetailReportData(AffiliateReportParam param)
        {
            return _affiliateReportRepository.GetDetailReportData(param);
        }

        public DateTime GetReportCutOffDate()
        {
            return _affiliateReportRepository.GetReportCutOffDate();
        }

        private static bool IsValidParam(AffiliateReportParam param)
        {
            return !string.IsNullOrEmpty(param.ProductIds) && IsValidDateRange(param.FromDate, param.ToDate, param.IsGetMonthly);
        }

        private static bool IsValidDateRange(DateTime from, DateTime to, bool isGetMonthly = true)
        {
            var maxMonth = from.AddMonths(isGetMonthly ? 5 : 6);

            return DateTime.Compare(maxMonth, to) >= 0;
        }
    }
}
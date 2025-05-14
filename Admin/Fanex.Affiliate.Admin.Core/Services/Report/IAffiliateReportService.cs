using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Report;
using Fanex.Affiliate.Admin.Core.MetaModels.Report;
using System;

namespace Fanex.Affiliate.Admin.Core.Services.Report
{
    public interface IAffiliateReportService
    {
        AffiliateReportResult GetMainReportData(AffiliateReportParam param);

        EntityResult<AffiliateReport> GetDetailReportData(AffiliateReportParam param);

        DateTime GetReportCutOffDate();
    }
}

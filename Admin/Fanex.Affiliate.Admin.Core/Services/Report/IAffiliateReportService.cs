using System.Collections.Generic;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Report;
using Fanex.Affiliate.Admin.Core.MetaModels.Report;

namespace Fanex.Affiliate.Admin.Core.Services.Report
{
    public interface IAffiliateReportService
    {
        EntityResult<AffiliateReport> GetMainReportData(AffiliateReportParam param);

        EntityResult<AffiliateReport> GetDetailReportData(AffiliateReportParam param);
    }
}

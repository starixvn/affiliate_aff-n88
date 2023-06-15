using System;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Report;
using Fanex.Affiliate.Admin.Core.MetaModels.Report;

namespace Fanex.Affiliate.Admin.Core.Repository.Report
{
    public interface IAffiliateReportRepository
    {
        EntityResult<AffiliateReport> GetMainReportData(AffiliateReportParam param);

        EntityResult<AffiliateReport> GetDetailReportData(AffiliateReportParam param);

        DateTime GetReportCutOffDate();
    }
}
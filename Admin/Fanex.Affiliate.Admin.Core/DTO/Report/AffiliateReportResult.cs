namespace Fanex.Affiliate.Admin.Core.DTO.Report
{
    using System.Collections.Generic;

    public class AffiliateReportResult : EntityResult<AffiliateReport>
    {
        public IEnumerable<AffiliateReportDaily> Details { get; set; }
    }
}
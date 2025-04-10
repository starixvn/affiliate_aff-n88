namespace Fanex.Affiliate.Admin.Core.Services.Report
{
    using DTO.Report;
    using DTO;
    using MetaModels.Report;

    public interface IMarketingStatisticsService
    {
        EntityResult<MarketingStatistics> GetReport(MarketingStatisticsParam param);
    }
}
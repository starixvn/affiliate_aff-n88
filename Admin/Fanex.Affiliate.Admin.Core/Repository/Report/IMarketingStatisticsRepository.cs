namespace Fanex.Affiliate.Admin.Core.Repository.Report
{
    using DTO;
    using DTO.Report;
    using Fanex.Affiliate.Admin.Core.MetaModels.Report;

    public interface IMarketingStatisticsRepository
    {
        EntityResult<MarketingStatistics> GetReport(MarketingStatisticsParam param);
    }
}

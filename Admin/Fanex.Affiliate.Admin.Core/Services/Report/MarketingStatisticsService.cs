namespace Fanex.Affiliate.Admin.Core.Services.Report
{
    using System.Collections.Generic;
    using DTO;
    using DTO.Report;
    using MetaModels.Report;
    using Repository.Report;

    public class MarketingStatisticsService : IMarketingStatisticsService
    {
        private readonly IMarketingStatisticsRepository _repository;

        public MarketingStatisticsService(IMarketingStatisticsRepository repository)
        {
            _repository = repository;
        }

        public EntityResult<MarketingStatistics> GetReport(MarketingStatisticsParam param)
        {
            var data = _repository.GetReport(param);
            data.MainData = HandleMainData(data.MainData);

            return data;
        }

        private static IEnumerable<MarketingStatistics> HandleMainData(IEnumerable<MarketingStatistics> data)
        {
            var resultDict = new Dictionary<(string AffUserName, string ChannelName), MarketingStatistics>();

            foreach (var item in data)
            {
                var key = (item.AffUserName, item.ChannelName);

                if (!resultDict.TryGetValue(key, out var aggregated))
                {
                    aggregated = new MarketingStatistics
                    {
                        AffUserName = item.AffUserName,
                        ChannelName = item.ChannelName,
                        ChannelLink = new List<MarketingStatistics>()
                    };
                    resultDict[key] = aggregated;
                }

                aggregated.TotalClick += item.TotalClick;
                aggregated.UniqueClick += item.UniqueClick;
                aggregated.SignUps += item.SignUps;
                aggregated.Fdm += item.Fdm;

                aggregated.ChannelLink.Add(new MarketingStatistics
                {
                    MarketName = item.MarketName,
                    AffMediaLink = item.AffMediaLink,
                    TotalClick = item.TotalClick,
                    UniqueClick = item.UniqueClick,
                    SignUps = item.SignUps,
                    Fdm = item.Fdm
                });
            }

            return resultDict.Values;
        }

    }
}

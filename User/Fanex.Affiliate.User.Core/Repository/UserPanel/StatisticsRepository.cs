using System;
using System.Collections.Generic;
using System.Data;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Common.Extensions;

namespace Fanex.Affiliate.User.Core.Repository.UserPanel
{
    public class StatisticsRepository : IStatisticsRepository
    {
        private const string UniqueClickColumn = "UniqueClick";

        private const string TotalClickColumn = "TotalClick";

        private readonly IObjectDBBuilder _builder;

        public StatisticsRepository(IObjectDBBuilder builder)
        {
            _builder = builder;
        }
        public IEnumerable<string> GetTrackingCode(int affId, bool isInternal)
        {
            const string uSpkey = "Aff_AffiliateSelTrackingCode";
            var dbMode = isInternal ? DBMode.View : DBMode.Main;

            using (var objectDb = _builder.Build(uSpkey, dbMode))
            {
                return objectDb.Query<string>(new { affId });
            }
        }

        public IEnumerable<TrackingStatistics> GetTrackingStatistics(int affId, string trackingCode, bool isInternal)
        {
            const string uSpkey = "Aff_AffiliateSelClickStatisticsAllMonths";
            var dbMode = isInternal ? DBMode.View : DBMode.Main;
            var dataList = new List<TrackingStatistics>();

            using (var objectDb = _builder.Build(uSpkey, dbMode))
            {
                using (var reader = objectDb.ExecuteReader(new { affId, trackingCode }))
                {
                    while (reader.Read())
                    {
                        dataList.Add(BuildTrackingStatisticsItem(reader));
                    }

                    if (reader.NextResult())
                    {
                        while (reader.Read())
                        {
                            dataList.Add(BuildTrackingStatisticsItem(reader));
                        }
                    }
                }
            }

            return dataList;
        }

        public IEnumerable<TrackingStatistics> GetTrackingStatisticsDetail(TrackingStatisticsDetailParam trackingStatisticsDetailParam)
        {
            const string uSpkey = "Aff_AffiliateSelClickStatisticsMonthDetail";
            var dbMode = trackingStatisticsDetailParam.IsInternal ? DBMode.View : DBMode.Main;

            using (var objectDb = _builder.Build(uSpkey, dbMode))
            {
                return objectDb.Query<TrackingStatistics>(trackingStatisticsDetailParam);
            }
        }

        public IEnumerable<ReferrerStatistics> GetReferrerStatistics(ReferrerStatisticsParam referrerStatisticsParam)
        {
            const string uSpkey = "Aff_ClickStatisticsSelBySite";
            var dbMode = referrerStatisticsParam.IsInternal ? DBMode.View : DBMode.Main;

            using (var objectDb = _builder.Build(uSpkey, dbMode))
            {
                return objectDb.Query<ReferrerStatistics>(referrerStatisticsParam);
            }
        }

        public IEnumerable<ReferrerStatistics> GetStatisticsDetailBySite(StatisticsDetailBySiteParam statisticsDetailParam)
        {
            const string uSpkey = "Aff_ClickStatisticsDetailBySite";
            var dbMode = statisticsDetailParam.IsInternal ? DBMode.View : DBMode.Main;
            var dataList = new List<ReferrerStatistics>();

            using (var objectDb = _builder.Build(uSpkey, dbMode))
            {
                using (var reader = objectDb.ExecuteReader(statisticsDetailParam))
                {
                    while (reader.Read())
                    {
                        dataList.Add(new ReferrerStatistics
                        {
                            DomainReferrer = reader.ToString("UrlReferrer"),
                            TotalClick = reader.ToInt(TotalClickColumn),
                            UniqueClick = reader.ToInt(UniqueClickColumn),
                            SignUps = reader.ToInt("Signups"),
                            Fdm = reader.ToInt("FDM")
                        });
                    }
                }
            }

            return dataList;
        }

        public IEnumerable<LandingPageStatistics> GetLandingPageStatistics(LandingPageStatisticsParam landingPageStatisticsParam)
        {
            const string uSpKey = "Aff_ClickStatisticsSelByPage";
            var dbMode = landingPageStatisticsParam.IsInternal ? DBMode.View : DBMode.Main;

            using (var objectDb = _builder.Build(uSpKey, dbMode))
            {
                return objectDb.Query<LandingPageStatistics>(landingPageStatisticsParam);
            }
        }

        public AccountOverviewStatistics GetStatisticsOverview(StatisticsOverviewParam overviewParam)
        {
            const string uSpKey = "Aff_User_StatisticsSel";
            var dbMode = overviewParam.IsInternal ? DBMode.View : DBMode.Main;

            using (var objectDb = _builder.Build(uSpKey, dbMode))
            {
                return objectDb.QueryEntity<AccountOverviewStatistics>(overviewParam);
            }
        }

        public IEnumerable<MarketingPageStatistics> GetMarketingPageStatistics(MarketingPageStatisticsParam param)
        {
            const string spKey = "Aff_User_Rpt_MarketingPage_Statistics";
            
            using(var objectDb = _builder.Build(spKey))
            {
                return objectDb.Query<MarketingPageStatistics>(param);
            }
        }

        private TrackingStatistics BuildTrackingStatisticsItem(IDataReader reader)
        {
            var date = reader.ToDateTime("Date");

            return new TrackingStatistics
            {
                Date = date,
                TotalClick = reader.ToInt(TotalClickColumn),
                UniqueClick = reader.ToInt(UniqueClickColumn)
            };
        }

    }
}
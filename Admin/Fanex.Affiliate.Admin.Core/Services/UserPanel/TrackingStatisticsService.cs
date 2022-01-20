using Fanex.Affiliate.Admin.Core.DTO.UserPanel;
using Fanex.Affiliate.Admin.Core.MetaModels.UserPanel;
using Fanex.Affiliate.Admin.Core.Repository;
using Fanex.Data;
using System;
using System.Collections.Generic;
using System.Data;

namespace Fanex.Affiliate.Admin.Core.Services.UserPanel
{
    public class TrackingStatisticsService : BaseRepository, ITrackingStatisticsService
    {
        public IEnumerable<string> GetTrackingCodeList(int affId)
        {
            const string SpKey = "Aff_AffiliateSelTrackingCode";
            var result = new List<string>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("AffID", SqlDbType.Int, affId);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(Convert.ToString(reader["TrackingCode"]));
                    }
                }
            }

            return result;
        }

        public IEnumerable<TrackingStatistics> GetTrackingStatisticsList(TrackingStatisticsParam param)
        {
            const string SpKey = "Aff_AffiliateSelClickStatisticsAllMonths";
            var result = new List<TrackingStatistics>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignCommonParam(objectDb, param);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(BuildTrackingStatisticsItem(reader));
                    }
                    if (reader.NextResult())
                    {
                        while (reader.Read())
                        {
                            result.Add(BuildTrackingStatisticsItem(reader));
                        }
                    }
                }
            }

            return result;
        }

        public IEnumerable<TrackingStatistics> GetTrackingStatisticsDetailList(TrackingStatisticsDetailParam param)
        {
            const string SpKey = "Aff_AffiliateSelClickStatisticsMonthDetail";
            var result = new List<TrackingStatistics>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignCommonParam(objectDb, param);
                objectDb.AddInParameter("month", SqlDbType.Int, param.SelectedMonth.Month);
                objectDb.AddInParameter("year", SqlDbType.Int, param.SelectedMonth.Year);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(BuildTrackingStatisticsItem(reader));
                    }
                }
            }

            return result;
        }

        private static void AssignCommonParam(IObjectDb objectDb, TrackingStatisticsParam param)
        {
            objectDb.AddInParameter("AffID", SqlDbType.Int, param.AffId);
            objectDb.AddInParameter("TrackingCode", SqlDbType.NVarChar, param.TrackingCode);
        }

        private static TrackingStatistics BuildTrackingStatisticsItem(IDataReader reader)
        {
            return new TrackingStatistics
            {
                TotalClick = reader["TotalClick"] == DBNull.Value ? 0 : Convert.ToInt32(reader["TotalClick"]),
                UniqueClick = reader["UniqueClick"] == DBNull.Value ? 0 : Convert.ToInt32(reader["UniqueClick"]),
                Date = Convert.ToDateTime(reader["Date"])
            };
        }
    }
}

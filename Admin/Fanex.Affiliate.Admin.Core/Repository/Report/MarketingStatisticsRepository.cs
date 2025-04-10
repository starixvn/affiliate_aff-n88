namespace Fanex.Affiliate.Admin.Core.Repository.Report
{
    using System.Collections.Generic;
    using System.Data;
    using Common.Extensions;
    using Constants;
    using Data;
    using DTO;
    using DTO.Report;
    using MetaModels.Report;

    public class MarketingStatisticsRepository : BaseRepository, IMarketingStatisticsRepository
    {
        public EntityResult<MarketingStatistics> GetReport(MarketingStatisticsParam param)
        {
            const string spKey = "Aff_Admin_Rpt_MarketingPage_Statistics";

            var result = new EntityResult<MarketingStatistics>();
            var dataList = new List<MarketingStatistics>();

            using (var objectDb = GetObjectDb(spKey))
            {
                AssignParam(objectDb, param);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var item = BuildDataItem(reader);
                        item.AffUserName = reader.ToString("AffUserName");
                        item.ChannelName = reader.ToString("ChannelName");
                        item.AffMediaLink = reader.ToString("AffMediaLink");
                        item.MarketName = reader.ToString("MarketName");

                        dataList.Add(item);
                    }

                    if (reader.NextResult() && reader.Read())
                    {
                        result.Total = BuildDataItem(reader);
                    }
                }

                result.MainData = dataList;
                result.TotalItem = GetTotalRows(objectDb);
            }

            return result;
        }

        private static void AssignParam(IObjectDb objectDb, MarketingStatisticsParam param)
        {
            objectDb.SetParameterValue("AffUsername", param.AffUsername);
            objectDb.SetParameterValue("FromDate", param.FromDate);
            objectDb.SetParameterValue("ToDate", param.ToDate);
            objectDb.SetParameterValue("LanguageCodes", param.LanguageCode);
            objectDb.SetParameterValue("PageIndex", param.PageIndex);
            objectDb.SetParameterValue("PageSize", param.PageSize);
            objectDb.SetParameterValue("IncludedInActive", param.IncludedInActive);

            objectDb.SetParameterValue("NRows", DefaultValue.Int);
        }

        private static MarketingStatistics BuildDataItem(IDataReader reader)
        {
            return new MarketingStatistics
            {
                TotalClick = reader.ToInt("TotalClick"),
                UniqueClick = reader.ToInt("UniqueClick"),
                SignUps = reader.ToInt("SignUps"),
                Fdm = reader.ToInt("FDM"),
            };
        }
    }
}

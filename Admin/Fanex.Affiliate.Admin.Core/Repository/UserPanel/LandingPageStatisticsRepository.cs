using System;
using System.Collections.Generic;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.UserPanel;
using Fanex.Affiliate.Admin.Core.MetaModels.UserPanel;
using Fanex.Data;
using System.Data;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Common.Extensions;

namespace Fanex.Affiliate.Admin.Core.Repository.UserPanel
{
    public class LandingPageStatisticsRepository : BaseRepository, ILandingPageStatisticsRepository
    {
        public IEnumerable<LandingPageStatistics> GetLandingPageStatisticsList(LandingPageStatisticsParam param)
        {
            const string SpKey = "Aff_ClickStatisticsSelByPage";
            var result = new List<LandingPageStatistics>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignCommonParam(objectDb, param);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(BuildLandingPageStatisticsItem(reader, true));
                    }
                }
            }

            return result;
        }

        public EntityResult<LandingPageStatistics> GetLandingPageStatisticsDetailList(LandingPageStatisticsDetailParam param)
        {
            const string SpKey = "Aff_ClickStatisticsDetailBySite";
            var result = new EntityResult<LandingPageStatistics>();
            var dataList = new List<LandingPageStatistics>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignCommonParam(objectDb, param);

                objectDb.AddInParameter("PageIndex", SqlDbType.Int, param.PageIndex);
                objectDb.AddInParameter("PageSize", SqlDbType.Int, param.PageSize);

                objectDb.AddOutParameter("NRows", SqlDbType.Int, Size.SizeOfInt);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(BuildLandingPageStatisticsItem(reader, false));
                    }
                }
                result.MainData = dataList;
                var totalRow = objectDb.GetParameterValue("NRows");
                result.TotalItem = totalRow == DBNull.Value ? 0 : Convert.ToInt32(totalRow);
            }

            return result;
        }

        private static void AssignCommonParam(IObjectDb objectDb, LandingPageStatisticsParam param)
        {
            objectDb.AddInParameter("AffID", SqlDbType.Int, param.AffId);
            objectDb.AddInParameter("FromDate", SqlDbType.DateTime, param.FromDate);
            objectDb.AddInParameter("ToDate", SqlDbType.DateTime, param.ToDate);
            objectDb.AddInParameter("SportCode", SqlDbType.NVarChar, param.SelectedPage);
            objectDb.AddInParameter("LanguageCode", SqlDbType.NVarChar, param.LanguageCode);
            objectDb.AddInParameter("DeviceType", SqlDbType.TinyInt, param.DeviceType);
        }

        private static LandingPageStatistics BuildLandingPageStatisticsItem(IDataReader reader, bool isGetLandingPageStatisticsList)
        {
            return new LandingPageStatistics
            {
                Page = isGetLandingPageStatisticsList ? (reader.ToString("SportCode")) : string.Empty,
                LanguageCode = isGetLandingPageStatisticsList ? (reader.ToString("LanguageCode")) : string.Empty,
                WebsiteUrl = isGetLandingPageStatisticsList ? string.Empty : (reader.ToString("URLReferrer")),
                TotalClick = reader.ToInt("TotalClick"),
                UniqueClick = reader.ToInt("UniqueClick"),
                Signups = reader.ToInt("Signups"),
                Fdm = reader.ToInt("FDM"),
            };
        }
    }
}

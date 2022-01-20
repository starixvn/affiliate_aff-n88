using System;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.MediaGallery;
using Fanex.Affiliate.Admin.Core.MetaModels.MediaGallery;
using System.Collections.Generic;
using System.Data;
using Fanex.Data;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Common.Extensions;

namespace Fanex.Affiliate.Admin.Core.Repository.MediaGallery
{
    public class BannerListRepository : BaseRepository, IBannerListRepository
    {
        public EntityResult<BannerInfo> GetBannerList(BannerParam param)
        {
            const string SpKey = "Aff_Admin_Banner_Sel";
            var result = new EntityResult<BannerInfo>();
            var dataList = new List<BannerInfo>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("language", SqlDbType.NVarChar, param.Language);
                objectDb.AddInParameter("category", SqlDbType.NVarChar, param.Category);
                objectDb.AddInParameter("subcategory", SqlDbType.NVarChar, param.SubCategory);
                objectDb.AddInParameter("currency", SqlDbType.NVarChar, param.Currency);
                objectDb.AddInParameter("Size", SqlDbType.NVarChar, param.Size);
                objectDb.AddInParameter("AffType", SqlDbType.TinyInt, param.AffType);
                objectDb.AddInParameter("devicetype", SqlDbType.TinyInt, param.DeviceType);
                objectDb.AddInParameter("PageIndex", SqlDbType.Int, param.PageIndex);
                objectDb.AddInParameter("PageSize", SqlDbType.Int, param.PageSize);
                objectDb.AddInParameter(Field.TargetId, SqlDbType.TinyInt, param.UserType);

                objectDb.AddOutParameter("NRows", SqlDbType.Int, Size.SizeOfInt);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var bannerInfo = BuildBannerInfoItem(reader);
                        bannerInfo.LastUpdate = reader["UpdatedDate"] == DBNull.Value ? (DateTime?)null : Convert.ToDateTime(reader["UpdatedDate"]);

                        dataList.Add(bannerInfo);
                    }
                }

                result.MainData = dataList;
                var totalRow = objectDb.GetParameterValue("NRows");
                result.TotalItem = totalRow == DBNull.Value ? 0 : Convert.ToInt32(totalRow);
            }

            return result;
        }

        public BannerInfo GetBannerDetail(int selectedBannerId, byte userType)
        {
            const string SpKey = "Aff_Admin_Banner_Sel";
            BannerInfo item = null;

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("bannerid", SqlDbType.Int, selectedBannerId);
                objectDb.AddInParameter(Field.TargetId, SqlDbType.TinyInt, userType);

                using (var reader = objectDb.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        item = BuildBannerInfoItem(reader);
                        item.AffTypes = reader.GetVal<string>("AffTypes").Split(',');
                    }
                }
            }

            return item;
        }

        public ResultInfo InsertBanner(InsertUpdateMultipleBannersParam param)
        {
            const string SpKey = "Aff_Admin_Banner_Ins";

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignParam(objectDb, param);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public ResultInfo UpdateBanner(InsertUpdateMultipleBannersParam param)
        {
            const string SpKey = "Aff_Admin_Banner_Upd";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("bannerid", SqlDbType.Int, param.BannerId);
                AssignParam(objectDb, param);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public ResultInfo DeleteBanners(DeleteBannerParam param)
        {
            const string SpKey = "Aff_Admin_Banner_Del";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("BannerIds", SqlDbType.NVarChar, param.BannerIdList);
                objectDb.AddInParameter(Field.TargetId, SqlDbType.TinyInt, param.UserType);
                objectDb.AddInParameter("UserID", SqlDbType.Int, param.UserId);
                objectDb.AddInParameter("IP", SqlDbType.VarChar, param.Ip);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public IEnumerable<MediaGalleryFilterItem> GetSizeList(SizeParam param)
        {
            const string SpKey = "Aff_Admin_MediaSize_Sel";
            var result = new List<MediaGalleryFilterItem>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("Category", SqlDbType.NVarChar, param.Category);
                objectDb.AddInParameter("SubCategory", SqlDbType.NVarChar, param.SubCategory);
                objectDb.AddInParameter("Language", SqlDbType.NVarChar, param.Language);
                objectDb.AddInParameter("Currency", SqlDbType.NVarChar, param.Currency);
                objectDb.AddInParameter("ImageType", SqlDbType.NVarChar, param.ImageType);
                objectDb.AddInParameter("AffType", SqlDbType.TinyInt, param.AffType);
                objectDb.AddInParameter("DeviceType", SqlDbType.TinyInt, param.DeviceType);
                objectDb.AddInParameter(Field.TargetId, SqlDbType.TinyInt, param.UserType);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(new MediaGalleryFilterItem
                        {
                            Id =reader.ToInt("SizeId"),
                            Name =reader.ToString("Size")
                        });
                    }
                }
            }

            return result;
        }

        private static void AssignParam(IObjectDb objectDb, InsertUpdateMultipleBannersParam param)
        {
            objectDb.AddInParameter(Field.TargetId, SqlDbType.TinyInt, param.UserType);
            objectDb.AddInParameter("Files", SqlDbType.NVarChar, param.Files);
            objectDb.AddInParameter("Categories", SqlDbType.NVarChar, param.Categories);
            objectDb.AddInParameter("SubCategories", SqlDbType.NVarChar, param.SubCategories);
            objectDb.AddInParameter("Language", SqlDbType.NVarChar, param.Language);
            objectDb.AddInParameter("Currencies", SqlDbType.NVarChar, param.Currencies);
            objectDb.AddInParameter("AffTypes", SqlDbType.NVarChar, param.AffTypes);
            objectDb.AddInParameter("DeviceTypes", SqlDbType.NVarChar, param.DeviceTypes);
            objectDb.AddInParameter("UserID", SqlDbType.Int, param.UserId);
            objectDb.AddInParameter("IP", SqlDbType.VarChar, param.Ip);

            AssignResultOutputParam(objectDb);
        }

        private static BannerInfo BuildBannerInfoItem(IDataReader reader)
        {
            return new BannerInfo
            {
                BannerId =reader.ToInt("BannerID"),
                FileName =reader.ToString("FileName"),
                Categories =reader.ToString("Categories").Split(','),
                SubCategories =reader.ToString("SubCategories").Split(','),
                Language =reader.ToString("Language"),
                Currencies =reader.ToString("Currencies").Split(','),
                Size =reader.ToString("Size"),
                DeviceTypes = reader.GetVal<string>("DeviceTypes").Split(','),
                UserType = reader.GetVal<byte>("TargetId")
            };
        }
    }
}
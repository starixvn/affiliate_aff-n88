using System;
using System.Collections.Generic;
using Fanex.Affiliate.Admin.Core.DTO.MediaGallery;
using Fanex.Affiliate.Admin.Core.Repository;
using System.Data;
using Fanex.Affiliate.Admin.Core.Extensions;

namespace Fanex.Affiliate.Admin.Core.Services.MediaGallery
{
    public class CommonMediaGalleryService : BaseRepository, ICommonMediaGalleryService
    {
        public IEnumerable<Category> GetCategoryList(byte typeId, byte userType)
        {
            const string SpKey = "Aff_Admin_MediaCategory_Sel";
            var result = new List<Category>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("TypeId", DbType.Byte, typeId);
                objectDb.AddInParameter("TargetId", DbType.Byte, userType);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(new Category
                        {
                            CategoryName = Convert.ToString(reader["Category"]),
                            SubCategoryName = Convert.ToString(reader["SubCategory"]),
                            UserType = reader.GetVal<byte>("TargetId")
                        });
                    }
                }
            }

            return result;
        }

        public IEnumerable<MediaGalleryFilterItem> GetCurrencyList()
        {
            const string SpKey = "Aff_Admin_MediaCurrency_Sel";
            var result = new List<MediaGalleryFilterItem>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(new MediaGalleryFilterItem
                        {
                            Id = Convert.ToInt32(reader["CurrencyId"]),
                            Name = Convert.ToString(reader["Currency"])
                        });
                    }
                }
            }

            return result;
        }
    }
}

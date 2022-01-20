using System;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.MediaGallery;
using Fanex.Affiliate.Admin.Core.MetaModels.MediaGallery;
using Fanex.Affiliate.Admin.Core.Repository;
using System.Collections.Generic;
using System.Data;
using Fanex.Data;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.Extensions;

namespace Fanex.Affiliate.Admin.Core.Services.MediaGallery
{
    public class TextListService : BaseRepository, ITextListService
    {
        public EntityResult<TextInfo> GetTextList(TextParam param)
        {
            const string SpKey = "Aff_Admin_Text_Sel";
            var result = new EntityResult<TextInfo>();
            var dataList = new List<TextInfo>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("category", SqlDbType.NVarChar, param.Category);
                objectDb.AddInParameter("language", SqlDbType.NVarChar, param.Language);
                objectDb.AddInParameter("currency", SqlDbType.NVarChar, param.Currency);
                objectDb.AddInParameter("devicetype", SqlDbType.TinyInt, param.DeviceType);
                objectDb.AddInParameter("PageIndex", SqlDbType.Int, param.PageIndex);
                objectDb.AddInParameter("PageSize", SqlDbType.Int, param.PageSize);
                objectDb.AddInParameter(Field.TargetId, SqlDbType.TinyInt, param.UserType);

                objectDb.AddOutParameter("NRows", SqlDbType.Int, Size.SizeOfInt);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(BuildTextInfoItem(reader));
                    }
                }

                result.MainData = dataList;
                var totalRow = objectDb.GetParameterValue("NRows");
                result.TotalItem = totalRow == DBNull.Value ? 0 : Convert.ToInt32(totalRow);
            }

            return result;
        }

        public TextInfo GetTextDetail(int selectedTextId, byte userType)
        {
            const string SpKey = "Aff_Admin_Text_Sel";
            TextInfo item = null;

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("textid", SqlDbType.Int, selectedTextId);
                objectDb.AddInParameter(Field.TargetId, SqlDbType.TinyInt, userType);

                using (var reader = objectDb.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        item = BuildTextInfoItem(reader);
                    }
                }
            }

            return item;
        }

        public ResultInfo InsertText(InsertUpdateTextParam param)
        {
            const string SpKey = "Aff_Admin_Text_Ins";

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignParam(objectDb, param);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public ResultInfo UpdateText(InsertUpdateTextParam param)
        {
            const string SpKey = "Aff_Admin_Text_Upd";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("textid", SqlDbType.Int, param.TextId);
                AssignParam(objectDb, param);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public ResultInfo DeleteTexts(DeleteTextParam param)
        {
            const string SpKey = "Aff_Admin_Text_Del";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("textids", SqlDbType.NVarChar, param.TextIdList);
                objectDb.AddInParameter("userid", SqlDbType.Int, param.UserId);
                objectDb.AddInParameter("ip", SqlDbType.VarChar, param.Ip);
                objectDb.AddInParameter(Field.TargetId, SqlDbType.TinyInt, param.UserType);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        private static void AssignParam(IObjectDb objectDb, InsertUpdateTextParam param)
        {
            objectDb.AddInParameter("message", SqlDbType.NVarChar, param.TextContent);
            objectDb.AddInParameter("category", SqlDbType.NVarChar, param.Category);
            objectDb.AddInParameter("language", SqlDbType.NVarChar, param.Language);
            objectDb.AddInParameter("currency", SqlDbType.NVarChar, param.Currency);
            objectDb.AddInParameter("devicetype", SqlDbType.TinyInt, param.DeviceType);
            objectDb.AddInParameter("UserID", SqlDbType.Int, param.UserId);
            objectDb.AddInParameter("IP", SqlDbType.VarChar, param.Ip);
            objectDb.AddInParameter(Field.TargetId, SqlDbType.TinyInt, param.UserType);

            AssignResultOutputParam(objectDb);
        }

        private static TextInfo BuildTextInfoItem(IDataReader reader)
        {
            return new TextInfo
            {
                TextId = Convert.ToInt32(reader["TextId"]),
                TextContent = Convert.ToString(reader["Message"]),
                Category = Convert.ToString(reader["Category"]),
                Language = Convert.ToString(reader["Language"]),
                Currency = Convert.ToString(reader["Currency"]),
                DeviceType = reader.GetVal<byte>("DeviceType"),
                UserType = reader.GetVal<byte>("TargetId")
            };
        }
    }
}

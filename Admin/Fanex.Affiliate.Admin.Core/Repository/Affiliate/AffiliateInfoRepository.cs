using System;
using System.Collections.Generic;
using System.Data;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Affiliate;
using Fanex.Affiliate.Admin.Core.MetaModels.Affiliate;
using Fanex.Data;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Common.Extensions;

namespace Fanex.Affiliate.Admin.Core.Repository.Affiliate
{
    public class AffiliateInfoRepository : BaseRepository, IAffiliateInfoRepository
    {
        public EntityResult<AffiliateInfo> GetAffiliateList(AffiliateInfoParam param)
        {
            const string SpKey = "Aff_Admin_Affiliate_Sel";
            var result = new EntityResult<AffiliateInfo>();
            var dataList = new List<AffiliateInfo>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignAffiliateInfoParam(objectDb, param);
                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(BuildAffiliateInfoItem(reader));
                    }
                }
                result.MainData = dataList;
                var totalRow = objectDb.GetParameterValue("NRows");
                result.TotalItem = totalRow == DBNull.Value ? 0 : Convert.ToInt32(totalRow);
            }
            return result;
        }

        public ResultInfo ToggleFavorite(FavoriteParam param)
        {
            const string SpKey = "Aff_Admin_Affiliate_Favorite_Upd";

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignFavoriteParam(objectDb, param);
                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public ResultInfo ChangePassword(PasswordParam param)
        {
            const string SpKey = "Aff_Admin_Affiliate_Password_Upd";

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignPasswordParam(objectDb, param);
                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        private static void AssignAffiliateInfoParam(IObjectDb objectDb, AffiliateInfoParam param)
        {
            objectDb.AddInParameter("AffCode", SqlDbType.VarChar, param.AffId);
            objectDb.AddInParameter("UserId", SqlDbType.Int, param.UserId);
            objectDb.AddInParameter("GroupIds", SqlDbType.NVarChar, param.GroupIds);
            objectDb.AddInParameter("PreferredLanguage", SqlDbType.NVarChar, param.Language);
            objectDb.AddInParameter("Status", SqlDbType.VarChar, param.Status);
            objectDb.AddInParameter("ParentAffName", SqlDbType.NVarChar, param.ParentAffName);
            objectDb.AddInParameter("UserName", SqlDbType.NVarChar, param.UserName);
            objectDb.AddInParameter("Player_UserName", SqlDbType.NVarChar, param.AffPlayer);
            objectDb.AddInParameter("Email", SqlDbType.NVarChar, param.Email);
            objectDb.AddInParameter("SortType", SqlDbType.TinyInt, param.SortBy);
            objectDb.AddInParameter("SortDirectionType", SqlDbType.Bit, param.SortDirectionType);
            objectDb.AddInParameter("PageIndex", SqlDbType.Int, param.PageIndex);
            objectDb.AddInParameter("PageSize", SqlDbType.Int, param.PageSize);
            objectDb.AddInParameter("IsExportExcel", SqlDbType.Bit, param.IsExportExcel);

            objectDb.AddOutParameter("NRows", SqlDbType.Int, Size.SizeOfInt);
        }
        private static AffiliateInfo BuildAffiliateInfoItem(IDataReader reader)
        {
            return new AffiliateInfo
            {
                AffId =reader.ToInt(Field.AffId),
                AffCode =reader.ToInt("AffCode"),
                UserName = reader.ToString("Username"),
                Status = reader.ToString("Status"),
                FirstName = reader.ToString("FirstName"),
                LastName = reader.ToString("LastName"),
                Language = reader.ToString("PreferredLanguage"),
                Email = reader.ToString("Email"),
                RegistrationDate = reader.ToDateTime("RegisteredDate"),
                ApprovalDate = reader["ApprovedDate"] == DBNull.Value ? (DateTime?)null : reader.ToDateTime("ApprovedDate"),
                BalanceBf = reader["BFF"] == DBNull.Value ? (decimal?)null : reader.ToDecimal("BFF"),
                Member = reader["NoOfMember"] == DBNull.Value ? (int?)null :reader.ToInt("NoOfMember"),
                CommissionGroup = reader["GroupName"] == DBNull.Value ? "N/A" : reader.ToString("GroupName"),
                IsFavorite = Convert.ToBoolean(reader["IsFavorite"]),
                IsClosed = reader.ToBool("IsClosed"),
                Currency = reader.ToString("Currency"),
                PlayerCurrency = reader.ToString("PlayerCurrency"),
                Phone = reader.ToString("Phone"),
                PlayerUserName = reader.ToString("Player_Username"),
                IsUsingPrivateCommGroup = (reader["IsPrivate"] != DBNull.Value) &&reader.ToBool("IsPrivate"),
                ParentAffId = reader["ParentAffId"] == DBNull.Value ? (int?)null :reader.ToInt("ParentAffId"),
                ParentAffName = reader.ToString("ParentAffName"),
                NoOfSubAff = reader["NoOfSubAff"] == DBNull.Value ? (int?)null :reader.ToInt("NoOfSubAff"),
                ApprovedBy = reader.ToString("ApprovedBy")
            };
        }

        private static void AssignFavoriteParam(IObjectDb objectDb, FavoriteParam param)
        {
            objectDb.AddInParameter("UserId", SqlDbType.Int, param.UserId);
            objectDb.AddInParameter(Field.AffId, SqlDbType.Int, param.AffId);
            objectDb.AddInParameter("IsFavorite", SqlDbType.Bit, param.IsFavorite);
            objectDb.AddInParameter("IP", SqlDbType.VarChar, param.Ip);
        }

        private static void AssignPasswordParam(IObjectDb objectDb, PasswordParam param)
        {
            objectDb.AddInParameter("UserId", SqlDbType.Int, param.UserId);
            objectDb.AddInParameter(Field.AffId, SqlDbType.Int, param.AffId);
            objectDb.AddInParameter("Password", SqlDbType.NVarChar, param.Password);
            objectDb.AddInParameter("IP", SqlDbType.VarChar, param.Ip);
        }
    }
}

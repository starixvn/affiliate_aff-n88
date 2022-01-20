using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Affiliate;
using Fanex.Affiliate.Admin.Core.MetaModels.Affiliate;
using Fanex.Affiliate.Admin.Core.Repository;
using System;
using System.Data;

namespace Fanex.Affiliate.Admin.Core.Services
{
    public class AffiliateService: BaseRepository, IAffiliateService
    {
        public AffiliateBasicInfo GetAffiliateBasicInfo(int? affId, string affName = null)
        {
            const string SpKey = "Aff_Admin_AffiliateInfo_Sel";
            AffiliateBasicInfo result = null;

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("AffId", SqlDbType.Int, affId);
                objectDb.AddInParameter("Username", SqlDbType.NVarChar, affName);

                using (var reader = objectDb.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        result = new AffiliateBasicInfo
                        {
                            AffId = Convert.ToInt32(reader["AffId"]),
                            AffCode = Convert.ToString(reader["AffCode"]),
                            GroupId = Convert.ToInt32(reader["GroupId"]),
                            UserName = Convert.ToString(reader["UserName"]),
                            FirstName = Convert.ToString(reader["FirstName"]),
                            Email = Convert.ToString(reader["Email"]),
                            MailOption = Convert.ToBoolean(reader["MailOption"]),
                            PreferredLanguage = Convert.ToString(reader["PreferredLanguage"]),
                            PlayerUsername = Convert.ToString(reader["PlayerUsername"]),
                            AffType = Convert.ToByte(reader["AffType"]),
                            IsUsingPrivateCommGroup = (reader["IsPrivate"] != DBNull.Value) && Convert.ToBoolean(reader["IsPrivate"])
                        };
                    }
                }
            }

            return result;
        }

        public (ResultInfo, string) ApproveAffiliate(ApproveAffiliateParam param)
        {
            const string SpKey = "Aff_Admin_Affiliate_Approved";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("UserId", SqlDbType.Int, param.UserId);
                objectDb.AddInParameter("AffId", SqlDbType.Int, param.AffId);
                objectDb.AddInParameter("Password", SqlDbType.NVarChar, param.Password);
                objectDb.AddInParameter("Status", SqlDbType.VarChar, param.Status);
                objectDb.AddInParameter("Ip", SqlDbType.VarChar, param.Ip);

                AssignResultOutputParam(objectDb);
                objectDb.AddOutParameter("AffCode", SqlDbType.VarChar, Size.SizeOfString);

                objectDb.ExecuteNonQuery();

                var affCode = objectDb.GetParameterValue("AffCode").ToString();

                return (GetResultInfo(objectDb), affCode);
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using Fanex.Affiliate.Admin.Core.DTO.Common;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.MetaModels.Login;
using DNAide.Utils;
using Fanex.Common.Extensions;
using Fanex.Affiliate.Admin.Core.MetaModels;

namespace Fanex.Affiliate.Admin.Core.Repository
{
    public class AuthRepository : BaseRepository, IAuthRepository
    {
        public IList<UserPermission> GetPermissionList(int userId)
        {
            const string SpKey = "Aff_Admin_PolicySel";
            var result = new List<UserPermission>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                using (var reader = objectDb.ExecuteReader(new { userId }))
                {
                    while (reader.Read())
                    {
                        result.Add(new UserPermission
                        {
                            FunctionName = reader.ToString("FuncName"),
                            IsHost = Convert.ToBoolean(reader["Host"])
                        });
                    }
                }
            }

            return result;
        }

        public bool ReCheckin(int onUserId)
        {
            const string SpKey = "Aff_Recheckin";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.OnUserId, SqlDbType.Int, onUserId);
                objectDb.AddOutParameter("iskickedout", SqlDbType.Int, Size.SizeOfInt);
                objectDb.ExecuteNonQuery();
                var isKickedOut = objectDb.GetParameterValue("iskickedout");

                return (isKickedOut != DBNull.Value) && Convert.ToBoolean(isKickedOut);
            }
        }

        public ResultInfo Login(LoginParam param)
        {
            const string SpKey = "Aff_Admin_Login";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("UserName", SqlDbType.NVarChar, param.UserName);
                objectDb.AddInParameter("UserPwd", SqlDbType.NVarChar, Encryption.CfsEnCode(param.Password));
                objectDb.AddInParameter("IP", SqlDbType.VarChar, param.Ip);
                objectDb.AddInParameter("HostName", SqlDbType.NVarChar, param.UserHostName);

                objectDb.AddOutParameter("UserId", SqlDbType.Int, Size.SizeOfInt);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                var userId = objectDb.GetParameterValue("UserId");

                param.UserId = userId == DBNull.Value ? 0 : Convert.ToInt32(userId);

                return GetResultInfo(objectDb);
            }
        }

        public int LoginOnUser(LoginParam param, string sessionId, string serverId)
        {
            const int AffiliateAdminSite = 6;
            const string SpKey = "Aff_CheckIn";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("custid", SqlDbType.Int, param.UserId);
                objectDb.AddInParameter("netsessionid", SqlDbType.NVarChar, sessionId);
                objectDb.AddInParameter("serverid", SqlDbType.NVarChar, serverId);
                objectDb.AddInParameter("ip", SqlDbType.NVarChar, param.Ip);
                objectDb.AddInParameter("subaccid", SqlDbType.Int, AffiliateAdminSite);

                objectDb.AddOutParameter(Field.OnUserId, SqlDbType.Int, Size.SizeOfInt);

                objectDb.ExecuteNonQuery();

                var userId = objectDb.GetParameterValue(Field.OnUserId);

                return userId == DBNull.Value ? 0 : Convert.ToInt32(userId);
            }
        }

        public void Logout(int onUserId)
        {
            const string SpKey = "Aff_Logout";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.OnUserId, SqlDbType.Int, onUserId);

                objectDb.ExecuteNonQuery();
            }
        }

        public ResultInfo CheckPermission(CheckPermissionParam param)
        {
            const string spName = "Aff_Con_CheckPermission";
            using(var objectDb = GetObjectDb(spName))
            {
                objectDb.ExecuteNonQuery(param);

                return new ResultInfo
                {
                    Code = param.ErrCode,
                    Message = param.ErrMsg
                };
            }
        }
    }
}
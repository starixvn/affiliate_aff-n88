using System;
using System.Data;
using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.Auth;
using Fanex.Affiliate.User.Core.MetalModels;
using Fanex.Data;

namespace Fanex.Affiliate.User.Core.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IObjectDBBuilder _builder;

        public AuthRepository(IObjectDBBuilder builder)
        {
            _builder = builder;
        }

        public int GetOnUserId(OnUserIdParam onUserIdParam)
        {
            const string spKey = "Aff_CheckIn";
            var dbMode = onUserIdParam.IsInternal ? DBMode.View : DBMode.Main;

            using (var objectDb = _builder.Build(spKey, dbMode))
            {
                objectDb.ExecuteNonQuery(onUserIdParam);
            }

            return onUserIdParam.On_UserId;
        }

        public AuthorizedUserInfo GetUserInfo(string userName, bool isInternal)
        {
            const string spKey = "Aff_User_Login_UserInfoSel";
            var dbMode = isInternal ? DBMode.View : DBMode.Main;

            using (var objectDb = _builder.Build(spKey, dbMode))
            {
                objectDb.AddInParameter("UserName", SqlDbType.NVarChar, userName);

                using (var reader = objectDb.ExecuteReader())
                {
                    return reader.Read() ? new AuthorizedUserInfo
                    {
                        AffId = Convert.ToInt32(reader["AffId"]),
                        UserName = Convert.ToString(reader["UserName"]),
                        Password = Convert.ToString(reader["Password"]),
                        GroupName = Convert.ToString(reader["GroupName"]),
                        AffType = Convert.ToString(reader["AffType"]),
                        IsClosed = Convert.ToBoolean(reader["IsClosed"]),
                        Status = Convert.ToString(reader["Status"]),
                        PreferredLanguage = Convert.ToString(reader["PreferredLanguage"]),
                        IsMaxSubLevel = Convert.ToBoolean(reader["IsMaxSubLevel"])
                    } : null;
                }
            }
        }

        public LoginResultInfo UpdateLoginResult(LoginResultParam loginResultParam)
        {
            const string spKey = "Aff_User_Login_ResultUpd";

            using (var objectDb = _builder.Build(spKey))
            {
                AssignUpdateLoginResultParam(objectDb, loginResultParam);
                objectDb.ExecuteNonQuery();

                var code = objectDb.GetParameterValue("ErrCode");

                return new LoginResultInfo
                {
                    IsOk = code == null || Convert.ToInt32(code) == 0,
                    Message = Convert.ToString(objectDb.GetParameterValue("ErrMsg"))
                };
            }
        }

        public string GetSessionId(int onUserId)
        {
            const string spKey = "Aff_SessionIdSel";

            using (var objectDb = _builder.Build(spKey))
            {
                objectDb.AddInParameter("OnUserId", System.Data.SqlDbType.Int, onUserId);

                return objectDb.ExecuteScalar() as string;
            }
        }

        public bool Recheckin(int onUserId, bool isInternal)
        {
            const string spKey = "Aff_Recheckin";
            var dbMode = isInternal ? DBMode.View : DBMode.Main;
            var parameterSet = new
            {
                On_UserId = onUserId,
                IsKickedOut = true
            };

            using (var objectDb = _builder.Build(spKey, dbMode))
            {
                objectDb.ExecuteNonQuery(parameterSet);
            }

            return parameterSet.IsKickedOut;
        }

        private static void AssignUpdateLoginResultParam(IObjectDb objectDb, LoginResultParam param)
        {
            objectDb.AddInParameter("AffId", SqlDbType.Int, param.AffId);
            objectDb.AddInParameter("IpAddress", SqlDbType.NVarChar, param.IpAddress);
            objectDb.AddInParameter("DeviceInfo", SqlDbType.NVarChar, param.DeviceInfo);
            objectDb.AddInParameter("Language", SqlDbType.VarChar, param.Language);
            objectDb.AddInParameter("IsSuccessful", SqlDbType.Bit, param.IsSuccessful);

            objectDb.AddOutParameter("ErrCode", SqlDbType.Int, DbParam.ErrCodeSize);
            objectDb.AddOutParameter("ErrMsg", SqlDbType.NVarChar, DbParam.ErrMsgSize);
        }
    }
}
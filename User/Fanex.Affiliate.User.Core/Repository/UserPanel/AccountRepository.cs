using System;
using System.Collections.Generic;
using System.Data;
using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.MetalModels;

namespace Fanex.Affiliate.User.Core.Repository.UserPanel
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IObjectDBBuilder _builder;

        public AccountRepository(IObjectDBBuilder builder)
        {
            _builder = builder;
        }
        public AccountInformation GetAccountInfo(int affId)
        {
            const string uSpKey = "Aff_User_UserInfoSel";

            using (var objectDb = _builder.Build(uSpKey))
            {
                var parameterSet = new { affId };

                return objectDb.QueryEntity<AccountInformation>(parameterSet);
            }
        }

        public ResultInfo UpdateAccountInformation(UpdateAccountParam accountUpdateParam)
        {
            const string uSpKey = "Aff_User_UserInfoUpd";

            using (var objectDb = _builder.Build(uSpKey))
            {
                objectDb.ExecuteNonQuery(accountUpdateParam);
            }

            return new ResultInfo
            {
                IsOk = accountUpdateParam.ErrCode == 0,
                Message = accountUpdateParam.ErrMsg
            };
        }

        public ResultInfo UpdatePassword(UpdatePasswordParam updatePasswordParam)
        {
            const string uSpKey = "Aff_AffiliateUpdPwd";
            var parameterSet = new
            {
                updatePasswordParam.AffId,
                updatePasswordParam.UserId,
                updatePasswordParam.Ip,
                updatePasswordParam.Language,
                updatePasswordParam.ErrCode,
                updatePasswordParam.ErrMsg,
                OldPwd = updatePasswordParam.OldPassword,
                AffPwd = updatePasswordParam.NewPassword
            };

            using (var objectDb = _builder.Build(uSpKey))
            {
                objectDb.ExecuteNonQuery(parameterSet);
            }

            return new ResultInfo
            {
                IsOk = parameterSet.ErrCode == 0,
                Message = parameterSet.ErrMsg
            };
        }

        public UserInfo GetUserInfoByEmail(UserInfoByEmailParam userInfoParam)
        {
            const string uSpKey = "Aff_User_ForgotPassword";

            using (var objectDb = _builder.Build(uSpKey))
            {
                return objectDb.QueryEntity<UserInfo>(userInfoParam);
            }
        }

        public UserInfo RecoverPassword(PasswordRecoveryParam passwordRecoveryParam)
        {
            const string uSpKey = "Aff_User_RecoverPassWord";

            using (var objectDb = _builder.Build(uSpKey))
            {
                return objectDb.QueryEntity<UserInfo>(passwordRecoveryParam);
            }
        }

        public UserInfo GetUserInfoById(int affId, bool isInternal)
        {
            const string uSpKey = "Aff_User_GeneralInfo_Sel";
            var mode = isInternal ? DBMode.View : DBMode.Main;

            using (var objectDb = _builder.Build(uSpKey, mode))
            {
                return objectDb.QueryEntity<UserInfo>(new { affId });
            }
        }

        public IbcPlayerAccountInsertResult InsertPlayerAccountForIbc(DepositAccountInfo accountInfo)
        {
            const string uSpKey = "Dot_Dep_CustomerInsMember_Ag_Cust";
            var result = new IbcPlayerAccountInsertResult();
            var parameterSet = new
            {
                accountInfo.FirstName,
                accountInfo.LastName,
                accountInfo.Email,
                accountInfo.DepositUserName,
                accountInfo.DepositUserId,
                accountInfo.Password,
                accountInfo.OddsType,
                accountInfo.AgentId,
                accountInfo.AffiliateId,
                accountInfo.BonusCode,
                accountInfo.Country,
                CustId = 0,
                UserName = string.Empty,
                ErrCode = 0,
                ErrMsg = string.Empty
            };

            using (var objectDb = new ObjectDBBuilder(uSpKey))
            {
                objectDb.DB.ExecuteNonQuery(parameterSet);

                result.IsOk = parameterSet.ErrCode == 0;
                result.Message = parameterSet.ErrMsg;

                result.CustId = parameterSet.CustId;
                result.UserName = parameterSet.UserName;
            }

            return result;
        }

        public ResultInfo CreateAffiliate(UserSignUpParam signUpParam)
        {
            const string uSpKey = "Aff_User_Affiliate_Ins";

            using (var objectDb = new ObjectDBBuilder(uSpKey))
            {
                objectDb.DB.ExecuteNonQuery(signUpParam);
            }

            return new ResultInfo
            {
                IsOk = signUpParam.ErrCode == 0,
                Message = signUpParam.ErrMsg
            };
        }

        public IEnumerable<CommissionSetting> GetCommissionSettingList(int affId, bool isInternal)
        {
            const string uSpKey = "Aff_User_CommSetting_Sel";
            var mode = isInternal ? DBMode.View : DBMode.Main;

            using (var objectDb = new ObjectDBBuilder(uSpKey, mode))
            {
                return objectDb.DB.Query<CommissionSetting>(new { affId });
            }
        }

        public int CreateSecretKey(int affId, string secretKey)
        {
            const string uSpKey = "Aff_User_SecretKeyIns";

            using (var objectDb = new ObjectDBBuilder(uSpKey))
            {
                objectDb.DB.AddInParameter("AffId", SqlDbType.Int, affId);
                objectDb.DB.AddInParameter("SecretKey", SqlDbType.VarChar, secretKey);
                objectDb.DB.AddOutParameter("ErrCode", SqlDbType.Int, DbParam.ErrCodeSize);
                objectDb.DB.AddOutParameter("ErrMsg", SqlDbType.NVarChar, DbParam.ErrMsgSize);

                objectDb.DB.ExecuteNonQuery();

                var code = objectDb.DB.GetParameterValue("ErrCode");

                return code == DBNull.Value ? 0 : Convert.ToInt32(code);
            }
        }

        public GeneralAffInfo GetGeneralAffInfo(int? affId = null, string affCode = null)
        {
            const string uSpKey = "Aff_Get_GeneralAffInfo";

            using (var objectDb = new ObjectDBBuilder(uSpKey))
            {
                var parameterSet = new { affId, affCode };

                return objectDb.DB.QueryEntity<GeneralAffInfo>(parameterSet);
            }
        }
    }
}
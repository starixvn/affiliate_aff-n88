using System.Collections.Generic;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.MetalModels;

namespace Fanex.Affiliate.User.Core.Repository.UserPanel
{
    public interface IAccountRepository
    {
        AccountInformation GetAccountInfo(int affId);

        DepositAccountInfo GetDepositPlayerAccount(string playerUserName);

        ResultInfo UpdateAccountInformation(UpdateAccountParam accountUpdateParam);

        ResultInfo UpdatePassword(UpdatePasswordParam updatePasswordParam);

        UserInfo GetUserInfoByEmail(UserInfoByEmailParam userInfoParam);

        UserInfo RecoverPassword(PasswordRecoveryParam passwordRecoveryParam);

        UserInfo GetUserInfoById(int affId, bool isInternal);

        IbcPlayerAccountInsertResult InsertPlayerAccountForIbc(DepositAccountInfo accountInfo);

        ResultInfo CreateAffiliate(UserSignUpParam signUpParam);

        int CreateSecretKey(int affId, string secretKey);

        IEnumerable<CommissionSetting> GetCommissionSettingList(int affId, bool isInternal);

        GeneralAffInfo GetGeneralAffInfo(int? affId = null, string affCode = null);
    }
}
using System.Collections.Generic;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.MetalModels;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;

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

        PlayerUserValidInfo GetPlayerUserNameValidInfo(string userName);

        int CreateSecretKey(int affId, string secretKey);

        IEnumerable<CommissionSetting> GetCommissionSettingList(int affId, bool isInternal);

    }
}
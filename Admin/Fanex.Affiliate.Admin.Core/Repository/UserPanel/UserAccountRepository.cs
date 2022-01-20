using Fanex.Affiliate.Admin.Core.DTO.UserPanel;
using System.Data;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.MetaModels.UserPanel;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Common.Extensions;
using Fanex.Affiliate.Admin.Core.Extensions;

namespace Fanex.Affiliate.Admin.Core.Repository.UserPanel
{
    public class UserAccountRepository : BaseRepository, IUserAccountRepository
    {
        public UserAccount GetUserAccountInfo(int affId)
        {
            const string SpKey = "Aff_Admin_AffiliateInfo_Sel";
            UserAccount result = null;

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.AffId, SqlDbType.Int, affId);

                using (var reader = objectDb.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        result = new UserAccount
                        {
                            AffId =reader.ToInt(Field.AffId),
                            AffName =reader.ToString("UserName"),
                            FirstName =reader.ToString("FirstName"),
                            LastName =reader.ToString("LastName"),
                            Gender = reader.GetVal<bool?>("Gender"),
                            Email =reader.ToString("Email"),
                            Phone =reader.ToString("Phone"),
                            ContactApps =reader.ToString("ContactApps"),
                            Address =reader.ToString("Address"),
                            City =reader.ToString("City"),
                            State =reader.ToString("State"),
                            Postcode =reader.ToString("Postal"),
                            Country =reader.ToString("Country"),
                            MoreSiteUrls =reader.ToString("MoreSiteUrls"),
                            SiteUrl =reader.ToString("SiteUrl"),
                            PreferredPayment =reader.ToString("PreferredPayment"),
                            PlayerUsername =reader.ToString("PlayerUsername"),
                            NoSiteDescription =reader.ToString("NoSiteDesc"),
                            NetellerAccountId =reader.ToString("NetellerAccountID"),
                            MoneybookersEmail =reader.ToString("MoneybookersEmail"),
                            BankName =reader.ToString("BankName"),
                            BankAddress =reader.ToString("BankAddress"),
                            BankCode =reader.ToString("BankSwiftCode"),
                            BankAccountName =reader.ToString("BankAccountName"),
                            BankAccountNumber =reader.ToString("BankAccountNo"),
                            Question =reader.ToString("Question"),
                            Answer =reader.ToString("Answer"),
                            MailOption = reader.GetVal<bool?>("MailOption")
                        };
                    }
                }
            }

            return result;
        }

        public ResultInfo UpdateUserAccount(UserAccountParam param)
        {
            const string SpKey = "Aff_Admin_AffiliateInfo_Upd";
            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.AffId, SqlDbType.Int, param.AffId);
                objectDb.AddInParameter("UserId", SqlDbType.Int, param.UserId);
                objectDb.AddInParameter("FirstName", SqlDbType.NVarChar, param.FirstName);
                objectDb.AddInParameter("LastName", SqlDbType.NVarChar, param.LastName);
                objectDb.AddInParameter("Gender", SqlDbType.Bit, param.Gender);
                objectDb.AddInParameter("Email", SqlDbType.NVarChar, param.Email);
                objectDb.AddInParameter("Phone", SqlDbType.NVarChar, param.Phone);

                objectDb.AddInParameter("ContactApps", SqlDbType.NVarChar, param.ContactApps);
                objectDb.AddInParameter("Address", SqlDbType.NVarChar, param.Address);
                objectDb.AddInParameter("City", SqlDbType.NVarChar, param.City);
                objectDb.AddInParameter("State", SqlDbType.NVarChar, param.State);
                objectDb.AddInParameter("Postal", SqlDbType.NVarChar, param.Postcode);
                objectDb.AddInParameter("Country", SqlDbType.NVarChar, param.Country);

                objectDb.AddInParameter("MailOption", SqlDbType.Bit, param.MailOption);

                objectDb.AddInParameter("SiteURL", SqlDbType.NVarChar, param.SiteUrl);
                objectDb.AddInParameter("MoreSiteURLs", SqlDbType.NVarChar, param.MoreSiteUrls);
                objectDb.AddInParameter("NoSiteDesc", SqlDbType.NVarChar, param.NoSiteDescription);

                objectDb.AddInParameter("PreferredPayment", SqlDbType.NVarChar, param.PreferredPayment);
                objectDb.AddInParameter("Player_Username", SqlDbType.NVarChar, param.PlayerUsername);
                objectDb.AddInParameter("NetellerAccountId", SqlDbType.NVarChar, param.NetellerAccountId);
                objectDb.AddInParameter("MoneybookersEmail", SqlDbType.NVarChar, param.MoneybookersEmail);
                objectDb.AddInParameter("BankName", SqlDbType.NVarChar, param.BankName);
                objectDb.AddInParameter("BankAddress", SqlDbType.NVarChar, param.BankAddress);
                objectDb.AddInParameter("BankSwiftCode", SqlDbType.NVarChar, param.BankCode);
                objectDb.AddInParameter("BankAccountName", SqlDbType.NVarChar, param.BankAccountName);
                objectDb.AddInParameter("BankAccountNo", SqlDbType.NVarChar, param.BankAccountNumber);
                objectDb.AddInParameter("IP", SqlDbType.VarChar, param.Ip);

                objectDb.AddInParameter("Player_CustId", SqlDbType.Int, param.Player_CustId);
                objectDb.AddInParameter("Player_Currency", SqlDbType.Int, param.Player_Currency);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }
    }
}

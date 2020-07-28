using System;
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
                objectDb.AddInParameter(Field.AffId, DbType.Int32, affId);

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
                objectDb.AddInParameter(Field.AffId, DbType.Int32, param.AffId);
                objectDb.AddInParameter("UserId", DbType.Int32, param.UserId);
                objectDb.AddInParameter("FirstName", DbType.String, param.FirstName);
                objectDb.AddInParameter("LastName", DbType.String, param.LastName);
                objectDb.AddInParameter("Gender", DbType.Boolean, param.Gender);
                objectDb.AddInParameter("Email", DbType.String, param.Email);
                objectDb.AddInParameter("Phone", DbType.String, param.Phone);

                objectDb.AddInParameter("ContactApps", DbType.String, param.ContactApps);
                objectDb.AddInParameter("Address", DbType.String, param.Address);
                objectDb.AddInParameter("City", DbType.String, param.City);
                objectDb.AddInParameter("State", DbType.String, param.State);
                objectDb.AddInParameter("Postal", DbType.String, param.Postcode);
                objectDb.AddInParameter("Country", DbType.String, param.Country);

                objectDb.AddInParameter("MailOption", DbType.Boolean, param.MailOption);

                objectDb.AddInParameter("SiteURL", DbType.String, param.SiteUrl);
                objectDb.AddInParameter("MoreSiteURLs", DbType.String, param.MoreSiteUrls);
                objectDb.AddInParameter("NoSiteDesc", DbType.String, param.NoSiteDescription);

                objectDb.AddInParameter("PreferredPayment", DbType.String, param.PreferredPayment);
                objectDb.AddInParameter("Player_Username", DbType.String, param.PlayerUsername);
                objectDb.AddInParameter("NetellerAccountId", DbType.String, param.NetellerAccountId);
                objectDb.AddInParameter("MoneybookersEmail", DbType.String, param.MoneybookersEmail);
                objectDb.AddInParameter("BankName", DbType.String, param.BankName);
                objectDb.AddInParameter("BankAddress", DbType.String, param.BankAddress);
                objectDb.AddInParameter("BankSwiftCode", DbType.String, param.BankCode);
                objectDb.AddInParameter("BankAccountName", DbType.String, param.BankAccountName);
                objectDb.AddInParameter("BankAccountNo", DbType.String, param.BankAccountNumber);
                objectDb.AddInParameter("IP", DbType.String, param.Ip);

                objectDb.AddInParameter("Player_CustId", DbType.Int32, param.Player_CustId);
                objectDb.AddInParameter("Player_Currency", DbType.Int32, param.Player_Currency);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }
    }
}

using System;
using Fanex.Affiliate.Admin.Core.DTO.Member;
using System.Collections.Generic;
using System.Data;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.MetaModels.Member;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Affiliate.Admin.Core.Configurations;
using Fanex.Common.Extensions;

namespace Fanex.Affiliate.Admin.Core.Repository.Member
{
    public class ActiveMemberRepository : BaseRepository, IActiveMemberRepository
    {
        public AllMemberEntities GetAllMembers(string userNames)
        {
            const string SpKey = "Aff_Admin_ActiveMember_CheckStatus";

            var result = new AllMemberEntities();

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.UserName, DbType.String, userNames);
                AssignResultOutputParam(objectDb);

                using (var reader = objectDb.ExecuteReader())
                {
                    result.ActivedMemeberList = GetActivatedMemberList(reader);
                    result.InactiveMemberList = GetInactivatedMemberList(reader);
                }

                result.MemberNotExist = objectDb.GetParameterValue("ErrMsg").ToString();
            }

            return result;
        }

        public IEnumerable<ActiveMemberInfo> GetActivatedMemberList(IDataReader reader)
        {
            var result = new List<ActiveMemberInfo>();

            while (reader.Read())
            {
                result.Add(new ActiveMemberInfo
                {
                    IbcCustId = reader.GetVal<int>("IBCCustID"),
                    IbcUserName = reader.ToString("IBCUserName"),
                    UserName = reader.ToString(Field.UserName),
                    FirstName = reader.ToString(Field.FirstName),
                    LastName = reader.ToString(Field.LastName),
                    CreatedDate = reader.GetVal<DateTime?>("CreatedDate")
                });
            }

            return result;
        }

        public IEnumerable<InactiveMemberInfo> GetInactivatedMemberList(IDataReader reader)
        {
            var result = new List<InactiveMemberInfo>();

            if (reader.NextResult())
            {
                while (reader.Read())
                {
                    result.Add(new InactiveMemberInfo
                    {
                        UserName = reader.ToString(Field.UserName),
                        FirstName = reader.ToString(Field.FirstName),
                        LastName = reader.ToString(Field.LastName)
                    });
                }
            }

            return result;
        }

        public ResultInfo Add12BetPlayerAccountToIBC(DepositCustomerInfo param)
        {
            const string SpKey = "Dot_Dep_CustomerInsMember_Ag_Cust";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.FirstName, DbType.String, param.FirstName);
                objectDb.AddInParameter(Field.LastName, DbType.String, param.LastName);
                objectDb.AddInParameter("email", DbType.String, param.Email);
                objectDb.AddInParameter("depositusername", DbType.String, param.DepositUserName);
                objectDb.AddInParameter("deposituserid", DbType.String, param.DepositUserId);
                objectDb.AddInParameter("password", DbType.String, param.Password);
                objectDb.AddInParameter("oddstype", DbType.String, param.OddsType);
                objectDb.AddInParameter("agentid", DbType.String, param.AgentId);
                objectDb.AddInParameter("affiliateid", DbType.String, param.AffiliateId);
                objectDb.AddInParameter("bonuscode", DbType.String, param.BonusCode);
                objectDb.AddInParameter("Country", DbType.String, param.Country);

                objectDb.AddOutParameter("custid", DbType.Int32, Size.SizeOfInt);
                objectDb.AddOutParameter(Field.UserName, DbType.String, Size.SizeOfString);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                var userId = objectDb.GetParameterValue("custid");

                param.UserId = userId == DBNull.Value ? 0 : Convert.ToInt32(userId);
                param.UserName = Convert.ToString(objectDb.GetParameterValue(Field.UserName));

                return GetResultInfo(objectDb);
            }
        }

        public void WriteLogAfterAdd12BetPlayerAccountToIBCSuccefully(ActiveMemberParam param, int depositUserId)
        {
            const string SpKey = "Aff_WriteLog";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("AffID", DbType.Int32, param.UserId);
                objectDb.AddInParameter("Creator", DbType.Int32, param.UserId);
                objectDb.AddInParameter("IP", DbType.String, param.Ip);
                objectDb.AddInParameter("Typename", DbType.String, "Member");
                objectDb.AddInParameter("SPName", DbType.String, "Dot_Dep_CustomerInsMember_Ag_Cust");
                objectDb.AddInParameter("Details", DbType.String, $"Add {AppSetting.Instance.SiteFriendlyName} player account to IBC DepositCustID={depositUserId}");

                objectDb.AddOutParameter("RefNo", DbType.Int64, Size.SizeOfInt);

                objectDb.ExecuteNonQuery();
            }
        }

        public void WriteLogAfterUpdate12BetPlayerStatusToDepositSuccefully(ActiveMemberParam param, int ibcCustId)
        {
            const string SpKey = "Aff_WriteLog";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("AffID", DbType.Int32, param.UserId);
                objectDb.AddInParameter("Creator", DbType.Int32, param.UserId);
                objectDb.AddInParameter("IP", DbType.String, param.Ip);
                objectDb.AddInParameter("Typename", DbType.String, "Member");
                objectDb.AddInParameter("SPName", DbType.String, "Deposit_MemberIBCDetail");
                objectDb.AddInParameter("Details", DbType.String, $"Update {AppSetting.Instance.SiteFriendlyName} player status to deposit DepositCustID={ibcCustId}");

                objectDb.AddOutParameter("RefNo", DbType.Int64, Size.SizeOfInt);

                objectDb.ExecuteNonQuery();
            }
        }
    }
}

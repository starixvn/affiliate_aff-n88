using System;
using Fanex.Affiliate.Admin.Core.DTO.Member;
using System.Collections.Generic;
using System.Data;
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

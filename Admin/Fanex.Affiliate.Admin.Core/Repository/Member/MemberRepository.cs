using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Member;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Affiliate.Admin.Core.MetaModels.Member;
using Fanex.Affiliate.Admin.Core.Utilities;
using Fanex.Common.Extensions;
using System;
using System.Collections.Generic;

namespace Fanex.Affiliate.Admin.Core.Repository.Member
{
    public class MemberRepository : BaseRepository, IMemberRepository
    {
        public EntityResult<MemberInfo> GetMemberList(MemberParam param)
        {
            const string Spkey = "Aff_Admin_MemberList_Sel";
            var result = new EntityResult<MemberInfo>();
            var dataList = new List<MemberInfo>();

            using (var objectDb = GetObjectDb(Spkey))
            {
                objectDb.SetParameterValue("AffUsername", param.AffName);
                objectDb.SetParameterValue("UserName", param.UserName);
                objectDb.SetParameterValue("IBCUserName", param.IbcUserName);
                objectDb.SetParameterValue("IsIncludeRemovedPlayer", param.IsIncludeRemovedPlayer);
                objectDb.SetParameterValue("PageIndex", param.PageIndex);
                objectDb.SetParameterValue("PageSize", param.PageSize);

                objectDb.SetParameterValue("NRows", DefaultValue.Int);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(new MemberInfo
                        {
                            MemberId = reader.ToInt("CustID"),
                            UserName = reader.ToString("UserName"),
                            IbcUserName = reader.ToString("IBCUserName"),
                            FirstName = reader.ToString("FirstName"),
                            LastName = reader.ToString("LastName"),
                            CreatedDate = reader.GetVal<DateTime?>("RegisteredDate"),
                            LastActionDate = reader.GetVal<DateTime?>("LastAction"),
                            IsRemoved = reader.GetVal<bool>("IsRemoved"),
                            AffUserName = reader.ToString("AffUserName")
                        });
                    }
                }

                result.MainData = dataList;
                result.TotalItem = GetTotalRows(objectDb);
            }

            return result;
        }

        public PlayerActionInfo GetMemberDetail(int memberId)
        {
            const string Spkey = "Aff_Admin_Player_Sel";

            using (var objectDb = GetObjectDb(Spkey))
            {
                objectDb.SetParameterValue("CustId", memberId);

                using (var reader = objectDb.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new PlayerActionInfo
                        {
                            UserName = reader.ToString("UserName"),
                            AffUserName = reader.ToString("AffUserName"),
                            IsRemoved = reader.GetVal<bool>("IsRemoved"),
                            FromDate = reader.GetVal<DateTime?>("FromDate"),
                            LastActionDate = reader.GetVal<DateTime?>("LastAction"),
                        };
                    }
                }
            }

            return null;
        }

        public ResultInfo UpdateMember(UpdateMemberParam param)
        {
            const string Spkey = "Aff_Admin_Member_RemoveStatus_Upd";

            using (var objectDb = GetObjectDb(Spkey))
            {
                objectDb.SetParameterValue("CustId", param.MemberId);
                objectDb.SetParameterValue("FromDate", param.FromDate);
                objectDb.SetParameterValue("UserId", param.UserId);
                objectDb.SetParameterValue("Ip", param.Ip);
                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public DateTime GetLatestBillingDate()
        {
            const string Spkey = "Task_Aff_GetSetting";
            
            using (var objectDb = GetObjectDb(Spkey))
            {
                objectDb.SetParameterValue("SName", "AFF_CommissionDate");

                using (var reader = objectDb.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return reader.GetVal<DateTime>("SValue");
                    }
                }
            }

            return DateTimeHelper.DateTimeGMT8;
        }
    }
}

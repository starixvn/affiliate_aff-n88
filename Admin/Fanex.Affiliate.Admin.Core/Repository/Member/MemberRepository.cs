using System;
using System.Collections.Generic;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Member;
using Fanex.Affiliate.Admin.Core.MetaModels.Member;
using System.Data;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Common.Extensions;

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
                objectDb.AddInParameter("AffUsername", SqlDbType.NVarChar, param.AffName);
                objectDb.AddInParameter("UserName", SqlDbType.NVarChar, param.UserName);
                objectDb.AddInParameter("IBCUserName", SqlDbType.NVarChar, param.IbcUserName);
                objectDb.AddInParameter("PageIndex", SqlDbType.Int, param.PageIndex);
                objectDb.AddInParameter("PageSize", SqlDbType.Int, param.PageSize);

                objectDb.AddOutParameter("NRows", SqlDbType.Int, Size.SizeOfInt);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(new MemberInfo {
                            MemberId =reader.ToInt("CustID"),
                            UserName = reader.ToString("UserName"),
                            IbcUserName = reader.ToString("IBCUserName"),
                            FirstName =  reader.ToString("FirstName"),
                            LastName = reader.ToString("LastName"),
                            CreatedDate = reader.GetVal<DateTime?>("RegisteredDate"),
                            AffName = reader.ToString("AffUserName")
                        });
                    }
                }

                result.MainData = dataList;
                var totalRow = objectDb.GetParameterValue("NRows");
                result.TotalItem = totalRow == DBNull.Value ? 0 : Convert.ToInt32(totalRow);
            }

            return result;
        }
    }
}

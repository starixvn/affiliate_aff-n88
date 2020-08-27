using System;
using System.Collections.Generic;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Member;
using Fanex.Affiliate.Admin.Core.MetaModels.Member;
using System.Data;
using Fanex.Affiliate.Admin.Core.Constants;
using DNAide.Core;
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
                objectDb.AddInParameter("AffUsername", DbType.String, param.AffName);
                objectDb.AddInParameter("UserName", DbType.String, param.UserName);
                objectDb.AddInParameter("IBCUserName", DbType.String, param.IbcUserName);
                objectDb.AddInParameter("PageIndex", DbType.Int32, param.PageIndex);
                objectDb.AddInParameter("PageSize", DbType.Int32, param.PageSize);

                objectDb.AddOutParameter("NRows", DbType.Int32, Size.SizeOfInt);

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

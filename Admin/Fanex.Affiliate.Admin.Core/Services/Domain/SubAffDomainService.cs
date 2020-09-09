using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Domain;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Affiliate.Admin.Core.MetaModels.Domain;
using Fanex.Affiliate.Admin.Core.Repository;
using Fanex.Data;
using System;
using System.Collections.Generic;
using System.Data;

namespace Fanex.Affiliate.Admin.Core.Services.Domain
{
    public class SubAffDomainService: BaseRepository, ISubAffDomainService
    {
        public IEnumerable<DomainInfo> GetSubAffDomainList()
        {
            const string SpKey = "Aff_Admin_AffiliateDomain_Sel";

            var result = new List<DomainInfo>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(BuildSubAffDomainInfoItem(reader));
                    }
                }
            }

            return result;
        }

        public ResultInfo InsertSubAffDomain(InsertUpdateDomainParam param)
        {
            const string SpKey = "Aff_Admin_AffiliateDomain_Ins";

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignParam(objectDb, param);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public ResultInfo UpdateSubAffDomain(InsertUpdateDomainParam param)
        {
            const string SpKey = "Aff_Admin_AffiliateDomain_Upd";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("DomainId", DbType.Int32, param.DomainId);
                AssignParam(objectDb, param);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public ResultInfo DeleteSubAffDomain(DeleteDomainParam param)
        {
            const string SpKey = "Aff_Admin_AffiliateDomain_Del";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("DomainId", DbType.Int32, param.DomainId);
                objectDb.AddInParameter("userid", DbType.Int32, param.UserId);
                objectDb.AddInParameter("ip", DbType.String, param.Ip);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        private static void AssignParam(IObjectDb objectDb, InsertUpdateDomainParam param)
        {
            objectDb.AddInParameter("DomainName", DbType.String, param.DomainName);
            objectDb.AddInParameter("IsSSL", DbType.Boolean, param.IsSSL);
            objectDb.AddInParameter("UserID", DbType.Int32, param.UserId);
            objectDb.AddInParameter("IP", DbType.String, param.Ip);

            AssignResultOutputParam(objectDb);
        }

        private static DomainInfo BuildSubAffDomainInfoItem(IDataReader reader)
        {
            return new DomainInfo
            {
                DomainId = Convert.ToInt32(reader["DomainId"]),
                DomainName = Convert.ToString(reader["DomainName"]),
                IsSSL = reader.GetVal<bool>("IsSSL"),
                Creator = Convert.ToString(reader["Creator"]),
                CreatedDate = reader["CreateDate"] == DBNull.Value ? (DateTime?)null : Convert.ToDateTime(reader["CreateDate"])
            };
        }
    }
}

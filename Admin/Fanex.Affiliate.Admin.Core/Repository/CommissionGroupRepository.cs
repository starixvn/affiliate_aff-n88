using System;
using System.Collections.Generic;
using System.Data;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.CommissionGroup;
using Fanex.Affiliate.Admin.Core.MetaModels.CommissionGroup;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Data;
using Fanex.Common.Extensions;

namespace Fanex.Affiliate.Admin.Core.Repository
{
    public class CommissionGroupRepository : BaseRepository, ICommissionGroupRepository
    {
        public CommissionGroupResultEntity GetCommissionGroupList(GetCommissionGroupParam param)
        {
            const string SpKey = "Aff_Admin_CommGroup_Sel";

            var result = new CommissionGroupResultEntity();

            using (var objectDb = GetObjectDb(SpKey))
            {
                using (var reader = objectDb.ExecuteReader(param))
                {
                    result.CommGroupList = GetCommGroupList(reader);
                    result.TierSettingList = GetTierSettingList(reader);
                    result.DeductionSettingList = GetDeductionSettingList(reader);
                }

                param.Nrows = Convert.ToInt32(objectDb.GetParameterValue("Nrows"));
            }

            return result;
        }

        public ResultInfo CreateCommissionGroup(CreateUpdateCommissionGroupParam param)
        {
            const string SpKey = "Aff_Admin_CommGroup_Ins";

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignCreateUpdateCommissionGroupParam(objectDb, param);
                objectDb.AddInParameter("IsPrivate", DbType.Boolean, param.IsPrivate);
                objectDb.AddOutParameter(Field.GroupId, DbType.Int32, Size.SizeOfInt);

                objectDb.ExecuteNonQuery();

                var code = objectDb.GetParameterValue(Field.ErrCode);
                var groupId = objectDb.GetParameterValue(Field.GroupId);
                param.GroupId = groupId == DBNull.Value ? 0 : Convert.ToInt32(groupId);

                return new ResultInfo
                {
                    Code = code == DBNull.Value ? 0 : Convert.ToInt32(code),
                    Message = objectDb.GetParameterValue(Field.ErrMsg).ToString()
                };
            }
        }

        public ResultInfo UpdateCommissionGroup(CreateUpdateCommissionGroupParam param)
        {
            const string SpKey = "Aff_Admin_CommGroup_Upd";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.GroupId, DbType.Int32, param.GroupId);
                AssignCreateUpdateCommissionGroupParam(objectDb, param);

                objectDb.ExecuteNonQuery();

                var code = objectDb.GetParameterValue(Field.ErrCode);

                return new ResultInfo
                {
                    Code = code == DBNull.Value ? 0 : Convert.ToInt32(code),
                    Message = objectDb.GetParameterValue(Field.ErrMsg).ToString()
                };
            }
        }

        public ResultInfo DeleteCommissionGroup(DeleteCommissionGroupParam param)
        {
            const string SpKey = "Aff_Admin_CommGroup_Del";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.UserId, DbType.Int32, param.UserId);
                objectDb.AddInParameter(Field.GroupId, DbType.Int32, param.GroupId);
                objectDb.AddInParameter("IP", DbType.String, param.Ip);
                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                var code = objectDb.GetParameterValue(Field.ErrCode);

                return new ResultInfo
                {
                    Code = code == DBNull.Value ? 0 : Convert.ToInt32(code),
                    Message = objectDb.GetParameterValue(Field.ErrMsg).ToString()
                };
            }
        }

        public IEnumerable<Deduction> GetDeductionList()
        {
            const string SpKey = "Aff_Admin_CommGroup_Deductions_Sel";

            using (var objectDb = GetObjectDb(SpKey))
            {
                return objectDb.Query<Deduction>();
            }
        }

        public IEnumerable<SelectItem> GetNormalCommGroupList(GetGroupListParam param)
        {
            const string SpKey = "Aff_Admin_CommGroupNormal_Sel";
            var result = new List<SelectItem>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("AffId", DbType.Int32, param.AffId);
                objectDb.AddOutParameter(Field.GroupId, DbType.Int32, Size.SizeOfInt);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(new SelectItem
                        {
                            Id = reader.ToString(Field.GroupId),
                            Name = reader.ToString(Field.GroupName)
                        });
                    }
                }
                var groupId = objectDb.GetParameterValue(Field.GroupId);
                param.GroupId = groupId == DBNull.Value ? 0 : Convert.ToInt32(groupId);
            }

            return result;
        }

        public IEnumerable<SelectItem> GetAllCommGroups()
        {
            const string SpKey = "Aff_CommGroup_Sel";
            var result = new List<SelectItem>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(new SelectItem
                        {
                            Id = reader.ToString(Field.GroupId),
                            Name = reader.ToString(Field.GroupName)
                        });
                    }
                }
            }

            return result;
        }

        public ResultInfo AssignGroup(AssignGroupParam param)
        {
            const string SpKey = "Aff_Admin_CommGroup_Assign";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.UserId, DbType.Int32, param.UserId);
                objectDb.AddInParameter("AffId", DbType.Int32, param.AffId);
                objectDb.AddInParameter(Field.GroupId, DbType.Int32, param.GroupId);
                objectDb.AddInParameter("Ip", DbType.String, param.Ip);
                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                var code = objectDb.GetParameterValue(Field.ErrCode);

                return new ResultInfo
                {
                    Code = code == DBNull.Value ? 0 : Convert.ToInt32(code),
                    Message = objectDb.GetParameterValue(Field.ErrMsg).ToString()
                };
            }
        }

        private static IEnumerable<CommGroup> GetCommGroupList(IDataReader reader)
        {
            var commGroupList = new List<CommGroup>();
            while (reader.Read())
            {
                commGroupList.Add(new CommGroup
                {
                    RowIdx = reader.ToInt("RowIDX"),
                    GroupId = reader.ToInt(Field.GroupId),
                    GroupName = reader.ToString(Field.GroupName),
                    CreatedDate = reader.ToDateTime("CreatedDate"),
                    Creator = reader.ToString("Creator"),
                    Description = reader.ToString("Description"),
                    NoAffs = reader.ToInt("NoAffs")
                });
            }

            return commGroupList;
        }

        private static IEnumerable<TierSetting> GetTierSettingList(IDataReader reader)
        {
            var tierSettingList = new List<TierSetting>();
            if (reader.NextResult())
            {
                while (reader.Read())
                {
                    tierSettingList.Add(new TierSetting
                    {
                        GroupId = reader.ToInt(Field.GroupId),
                        TierId = reader.ToInt("TierId"),
                        MinAmount = reader.ToDecimal("MinAmount"),
                        MaxAmount = reader.ToDecimal("MaxAmount"),
                        MinAp = reader.ToInt("MinAm"),
                        MaxAp = reader.ToInt("MaxAm"),
                        Commission = reader.ToDecimal("Commission")
                    });
                }
            }

            return tierSettingList;
        }

        private static IEnumerable<DeductionSetting> GetDeductionSettingList(IDataReader reader)
        {
            var deductionSettingList = new List<DeductionSetting>();
            if (reader.NextResult())
            {
                while (reader.Read())
                {
                    deductionSettingList.Add(new DeductionSetting
                    {
                        GroupId = reader.ToInt(Field.GroupId),
                        DeductionId = reader.ToInt("DeductionId"),
                        DeductionName = reader.ToString("DeductionName"),
                        ProductIds = reader.ToString("ProductIds"),
                        DeductedPercentage = reader.ToDecimal("DeductedPercentage"),
                        DeductedAmount = reader.ToString("DeductedAmount"),
                        IsDeductedPercent = reader.ToBool("IsDeductedPercent")
                    });
                }
            }

            return deductionSettingList;
        }

        private static void AssignCreateUpdateCommissionGroupParam(IObjectDb objectDb, CreateUpdateCommissionGroupParam param)
        {
            objectDb.AddInParameter(Field.UserId, DbType.Int32, param.UserId);
            objectDb.AddInParameter(Field.GroupName, DbType.String, param.GroupName);
            objectDb.AddInParameter("Description", DbType.String, param.Description);
            objectDb.AddInParameter("DeductionList", DbType.Xml, param.DeductionList);
            objectDb.AddInParameter("TierList", DbType.Xml, param.TierList);
            objectDb.AddInParameter("IP", DbType.String, param.Ip);

            AssignResultOutputParam(objectDb);
        }
    }
}
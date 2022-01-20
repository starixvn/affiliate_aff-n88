using System;
using System.Collections.Generic;
using System.Data;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Customer;
using Fanex.Affiliate.Admin.Core.MetaModels.Customer;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Common.Extensions;

namespace Fanex.Affiliate.Admin.Core.Repository.Customer
{
    public class CustomerLeftPanelRepository : BaseRepository, ICustomerLeftPanelRepository
    {
        public AffiliateInfoOnLeftPanel GetAffiliateInfoOnLeftPanel(string affUserName)
        {
            const string SpKey = "Aff_Admin_AffiliateInfo_Sel";
            AffiliateInfoOnLeftPanel result = null;

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("Username", SqlDbType.NVarChar, affUserName);

                using (var reader = objectDb.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        result = new AffiliateInfoOnLeftPanel
                        {
                            ParentAffId = reader["ParentAffId"] == DBNull.Value ? (int?)null :reader.ToInt("ParentAffId"),
                            ParentAffName =reader.ToString("ParentAffName"),
                            AffId =reader.ToInt(Field.AffId),
                            AffCode = reader.ToString("AffCode"),
                            GroupId =reader.ToInt("GroupId"),
                            AffName =reader.ToString("UserName"),
                            FirstName =reader.ToString("FirstName"),
                            LastName =reader.ToString("LastName"),
                            PreferredLanguage =reader.ToString("PreferredLanguage"),
                            AffType =reader.ToByte("AffType"),
                            BalanceBf =reader.ToDecimal("BalBroughtForward"),
                            CommGroupName =reader.ToString("GroupName"),
                            ContactApps =reader.ToString("ContactApps"),
                            Gender =reader.ToBool("Gender"),
                            IsClosed =reader.ToBool("Closed"),
                            LastLoginDate = reader["LastLoginDate"] == DBNull.Value ? (DateTime?)null :reader.ToDateTime("LastLoginDate"),
                            LastLoginIp =reader.ToString("LastLoginIp"),
                            MoreSiteUrl =reader.ToString("MoreSiteUrls"),
                            SiteUrl =reader.ToString("SiteUrl"),
                            NoSiteDescription =reader.ToString("NoSiteDesc"),
                            Status =reader.ToString("Status"),
                            Phone =reader.ToString("Phone"),
                            IsUsingPrivateCommGroup = (reader["IsPrivate"] != DBNull.Value) &&reader.ToBool("IsPrivate"),
                            ApprovedBy =reader.ToString("ApprovedBy"),
                            IsDepositFeePercent = reader.ToBool("Dep_IsDeductedPercent"),
                            IsWithdrawalFeePercent = reader.ToBool("Wit_IsDeductedPercent"),
                            IsDisabledTransfer = reader.ToBool("DisabledTransfer"),
                            PlayerCurrency = reader.ToString("PlayerCurrency"),
                            TransferLimit = reader.ToDecimal("TransferLimit"),
                        };
                    }
                }
            }

            return result;
        }

        public IEnumerable<OnlineList> GetOnlineList(string affUserName)
        {
            const string SpKey = "Aff_Admin_AffiliateOnlineList_Sel";
            var result = new List<OnlineList>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("Username", SqlDbType.NVarChar, affUserName);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(new OnlineList
                        {
                            Ip =reader.ToString("Ip"),
                            ReloadTime =reader.ToDateTime("ReloadTime")
                        });
                    }
                }
            }

            return result;
        }

        public TransferLimitSettingInfo GetTransferLimitSetting(int affId)
        {
            const string SpKey = "Aff_Admin_TransferLimit_Sel";
            TransferLimitSettingInfo result = null;

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.AffId, DbType.Int32, affId);

                using (var reader = objectDb.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        result = new TransferLimitSettingInfo
                        {
                            PlayerCustId = reader.ToInt("PlayerCustId"),
                            PlayerUsername = reader.ToString("PlayerUsername"),
                            PlayerCurrency = reader.ToString("PlayerCurrency"),
                            TransferLimit = reader.ToDecimal("TransferLimit"),
                            IsDisabledTransfer = reader.ToBool("DisabledTransfer"),
                        };
                    }
                }
            }

            return result;
        }

        public ResultInfo UpdateAffType(UpdateAffTypeParam param)
        {
            const string SpKey = "Aff_Admin_AffiliateAffType_Upd";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.AffId, SqlDbType.Int, param.AffId);
                objectDb.AddInParameter(Field.UserId, SqlDbType.Int, param.UserId);
                objectDb.AddInParameter("AffType", SqlDbType.TinyInt, param.AffType);
                objectDb.AddInParameter("IP", SqlDbType.VarChar, param.Ip);

                objectDb.AddOutParameter("ErrCode", SqlDbType.Int, Size.SizeOfInt);

                objectDb.ExecuteNonQuery();

                var code = objectDb.GetParameterValue("ErrCode");

                return new ResultInfo
                {
                    Code = code == DBNull.Value ? 0 : Convert.ToInt32(code),
                };
            }
        }

        public ResultInfo UpdateClosedStatus(UpdateClosedStatusParam param)
        {
            const string SpKey = "Aff_Admin_AffiliateClosed_Upd";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.AffId, SqlDbType.Int, param.AffId);
                objectDb.AddInParameter(Field.UserId, SqlDbType.Int, param.UserId);
                objectDb.AddInParameter("IsClosed", SqlDbType.Bit, param.IsClosed);
                objectDb.AddInParameter("IP", SqlDbType.VarChar, param.Ip);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public ResultInfo UpdateLanguage(UpdateLanguageParam param)
        {
            const string SpKey = "Aff_Admin_AffiliatePreferredLanguage_Upd";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.AffId, SqlDbType.Int, param.AffId);
                objectDb.AddInParameter(Field.UserId, SqlDbType.Int, param.UserId);
                objectDb.AddInParameter("Ip", SqlDbType.VarChar, param.Ip);
                objectDb.AddInParameter("PreferredLanguage", SqlDbType.NVarChar, param.PreferredLanguage);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public ResultInfo UpdateStatus(UpdateStatusParam param)
        {
            const string SpKey = "Aff_Admin_AffiliateStatus_Upd";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.AffId, SqlDbType.Int, param.AffId);
                objectDb.AddInParameter(Field.UserId, SqlDbType.Int, param.UserId);
                objectDb.AddInParameter("Ip", SqlDbType.VarChar, param.Ip);
                objectDb.AddInParameter("Status", SqlDbType.VarChar, param.Status);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public ResultInfo UpdateTransferLimitSetting(TransferLimitSettingParam param)
        {
            const string SpKey = "Aff_Admin_TransferLimit_Upd";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.AffId, DbType.Int32, param.AffId);
                objectDb.AddInParameter(Field.UserId, DbType.Int32, param.UserId);
                objectDb.AddInParameter("DisabledTransfer", DbType.Boolean, param.DisabledTransfer);
                objectDb.AddInParameter("TransferLimit", DbType.Decimal, param.TransferLimit);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }
    }
}

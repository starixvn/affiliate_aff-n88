using System;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Payment;
using Fanex.Affiliate.Admin.Core.MetaModels.Payment;
using System.Collections.Generic;
using System.Data;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Common.Extensions;

namespace Fanex.Affiliate.Admin.Core.Repository.Payment
{
    public class PaymentRequestRepository : BaseRepository, IPaymentRequestRepository
    {
        public EntityResult<PaymentRequest> GetPaymentRequestList(PaymentRequestParam param)
        {
            const string SpKey = "Aff_Admin_AffiliatePaymentRequest_Sel";
            var result = new EntityResult<PaymentRequest>();
            var dataList = new List<PaymentRequest>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("SearchById", DbType.Int32, param.SearchBy);
                objectDb.AddInParameter("Username", DbType.String, param.Username);
                objectDb.AddInParameter(Field.Status, DbType.String, param.Status);
                objectDb.AddInParameter("FromDate", DbType.DateTime, param.FromDate);
                objectDb.AddInParameter("ToDate", DbType.DateTime, param.ToDate);
                objectDb.AddInParameter("IsGetAll", DbType.Boolean, param.IsGetAll);
                objectDb.AddInParameter("PageIndex", DbType.Int32, param.PageIndex);
                objectDb.AddInParameter("PageSize", DbType.Int32, param.PageSize);

                objectDb.AddOutParameter("NRows", DbType.Int32, Size.SizeOfInt);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(new PaymentRequest
                        {
                            TransId = reader.ToLong("Transid"),
                            TransDate = reader.ToDateTime("Transdate"),
                            Status = reader.ToString(Field.Status),
                            AffName = reader.ToString("Username"),
                            Amount = reader.ToDecimal("Amount"),
                            CompletedDate = reader.ToDateTime("Completeddate"),
                            Creator = reader.ToString("Creator")
                        });
                    }
                }

                result.MainData = dataList;
                var totalRow = objectDb.GetParameterValue("NRows");
                result.TotalItem = totalRow == DBNull.Value ? 0 : Convert.ToInt32(totalRow);
            }

            return result;
        }

        public PaymentRequestDetail GetPaymentRequestDetail(long transId)
        {
            const string SpKey = "Aff_Admin_AffiliatePaymentRequest_Detail_Sel";
            PaymentRequestDetail result = null;

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("TransID", DbType.Int32, transId);

                using (var reader = objectDb.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        result = new PaymentRequestDetail
                        {
                            TransId = reader.ToLong("Transid"),
                            AffId = reader.ToInt("AffId"),
                            AffName = reader.ToString("AffName"),
                            TransDate = reader.ToDateTime("Transdate"),
                            Email = reader.ToString("email"),
                            FirstName = reader.ToString("firstname"),
                            LastName = reader.ToString("lastname"),
                            PaymentMethod = reader.ToString("PreferredPayment"),
                            Amount = reader.ToDecimal("Amount"),
                            TransAmount = reader.ToDecimal("TransAmount"),
                            TransCurrencyCode = reader.ToString("TransCurrencyCode"),
                            Status = reader.ToString(Field.Status),
                            PlayerUsername =reader.ToString("PlayerUsername"),
                            CompletedDate = reader.ToDateTime("Completeddate"),
                            Creator = reader.ToString("Creator"),
                            AdminDesc = reader.ToString("AdminDesc"),
                            AffDesc =reader.ToString("AffDesc")
                        };
                    }
                }
            }

            return result;
        }

        public ResultInfo UpdatePaymentRequest(PaymentRequestUpdateParam param)
        {
            const string SpKey = "Aff_Admin_AffiliatePaymentRequest_Upd";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.Status, DbType.String, param.Status);
                objectDb.AddInParameter("TransID", DbType.Int64, param.TransId);
                objectDb.AddInParameter("AdminDesc", DbType.String, param.AdminDesc);
                objectDb.AddInParameter("AffDesc", DbType.String, param.AffDesc);
                objectDb.AddInParameter("UserID", DbType.Int32, param.UserId);
                objectDb.AddInParameter("IP", DbType.String, param.Ip);
                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public (IEnumerable<PaymentMethodInfo> paymentMethods, decimal minAmount) GetPaymentMethod()
        {
            const string SpKey = "Aff_PaymentMethod_Sel";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddOutParameter("MinAmount", DbType.Int32, Size.SizeOfInt);

                var paymentMethods = objectDb.Query<PaymentMethodInfo>();
                var minAmount = Convert.ToDecimal(objectDb.GetParameterValue("MinAmount"));

                return (paymentMethods, minAmount);
            }
        }
    }
}

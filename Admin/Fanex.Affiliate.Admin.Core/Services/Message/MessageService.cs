using System;
using System.Collections.Generic;
using Fanex.Affiliate.Admin.Core.DTO.Message;
using Fanex.Affiliate.Admin.Core.MetaModels.Message;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.Repository;
using System.Data;
using Fanex.Data;
using Fanex.Affiliate.Admin.Core.Constants;

namespace Fanex.Affiliate.Admin.Core.Services.Message
{
    public class MessageService : BaseRepository, IMessageService
    {
        public EntityResult<MessageInfo> GetMessageList(MessageParam param)
        {
            const string SpKey = "Aff_Admin_Message_Sel";
            var result = new EntityResult<MessageInfo>();
            var dataList = new List<MessageInfo>();

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("SearchById", SqlDbType.Int, param.SearchById);
                objectDb.AddInParameter("IsGetAll", SqlDbType.Bit, param.IsGetAll);
                objectDb.AddInParameter("FromDate", SqlDbType.DateTime, param.FromDate);
                objectDb.AddInParameter("ToDate", SqlDbType.DateTime, param.ToDate);
                objectDb.AddInParameter("PageIndex", SqlDbType.Int, param.PageIndex);
                objectDb.AddInParameter("PageSize", SqlDbType.Int, param.PageSize);

                objectDb.AddOutParameter("NRows", SqlDbType.Int, Size.SizeOfInt);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(new MessageInfo
                        {
                            MessageId = Convert.ToInt32(reader[Field.MessageId]),
                            Important = Convert.ToBoolean(reader["Important"]),
                            Creator = Convert.ToString(reader["creatorname"]),
                            PostedDate = reader["PostedDate"] == DBNull.Value ? (DateTime?)null : Convert.ToDateTime(reader["PostedDate"]),
                            UpdatedDate = reader["UpdatedDate"] == DBNull.Value ? (DateTime?)null : Convert.ToDateTime(reader["UpdatedDate"]),
                            UpdatedBy = Convert.ToString(reader["UpdatedName"]),
                            Message = Convert.ToString(reader["message_en"])
                        });
                    }
                }

                result.MainData = dataList;
                var totalRow = objectDb.GetParameterValue("NRows");
                result.TotalItem = totalRow == DBNull.Value ? 0 : Convert.ToInt32(totalRow);
            }

            return result;
        }

        public MessageDetail GetMessageDetail(int selectedMessageId)
        {
            const string SpKey = "Aff_Admin_Message_Sel";
            MessageDetail item = null;

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.MessageId, SqlDbType.Int, selectedMessageId);

                using (var reader = objectDb.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        item = new MessageDetail
                        {
                            MessageId = Convert.ToInt32(reader[Field.MessageId]),
                            Important = Convert.ToBoolean(reader["Important"]),
                            MessageContenten = Convert.ToString(reader["message_en"]),
                            MessageContentcs = Convert.ToString(reader["message_cn"]),
                            MessageContentch = Convert.ToString(reader["message_tw"]),
                            MessageContentes = Convert.ToString(reader["message_es"]),
                            MessageContentth = Convert.ToString(reader["message_th"]),
                            MessageContentvn = Convert.ToString(reader["message_vi"]),
                            MessageContentid = Convert.ToString(reader["message_id"]),
                            MessageContentko = Convert.ToString(reader["message_kr"]),
                            MessageContentjp = Convert.ToString(reader["message_jp"])
                        };
                    }
                }
            }

            return item;
        }

        public ResultInfo InsertMessage(InsertUpdateMessageParam param)
        {
            const string SpKey = "Aff_Admin_Message_Ins";

            using (var objectDb = GetObjectDb(SpKey))
            {
                AssignParam(objectDb, param);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public ResultInfo UpdateMessage(InsertUpdateMessageParam param)
        {
            const string SpKey = "Aff_Admin_Message_Upd";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter(Field.MessageId, SqlDbType.Int, param.MessageId);
                AssignParam(objectDb, param);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        public ResultInfo DeleteMessages(DeleteMessageParam param)
        {
            const string SpKey = "Aff_Admin_Message_Del";

            using (var objectDb = GetObjectDb(SpKey))
            {
                objectDb.AddInParameter("MessageIds", SqlDbType.NVarChar, param.MessageIdList);
                objectDb.AddInParameter("userid", SqlDbType.Int, param.UserId);
                objectDb.AddInParameter("ip", SqlDbType.VarChar, param.Ip);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        private static void AssignParam(IObjectDb objectDb, InsertUpdateMessageParam param)
        {
            objectDb.AddInParameter("IsImportant", SqlDbType.Bit, param.Important);
            objectDb.AddInParameter("msgen", SqlDbType.NVarChar, param.MessageContenten);
            objectDb.AddInParameter("msgcn", SqlDbType.NVarChar, param.MessageContentcs);
            objectDb.AddInParameter("msgtw", SqlDbType.NVarChar, param.MessageContentch);
            objectDb.AddInParameter("msges", SqlDbType.NVarChar, param.MessageContentes);
            objectDb.AddInParameter("msgth", SqlDbType.NVarChar, param.MessageContentth);
            objectDb.AddInParameter("msgvi", SqlDbType.NVarChar, param.MessageContentvn);
            objectDb.AddInParameter("msgid", SqlDbType.NVarChar, param.MessageContentid);
            objectDb.AddInParameter("msgkr", SqlDbType.NVarChar, param.MessageContentko);
            objectDb.AddInParameter("msgjp", SqlDbType.NVarChar, param.MessageContentjp);
            objectDb.AddInParameter("UserID", SqlDbType.Int, param.UserId);
            objectDb.AddInParameter("IP", SqlDbType.VarChar, param.Ip);

            AssignResultOutputParam(objectDb);
        }
    }
}

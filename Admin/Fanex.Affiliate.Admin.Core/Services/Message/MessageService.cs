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
                objectDb.AddInParameter("SearchById", DbType.Int32, param.SearchById);
                objectDb.AddInParameter("IsGetAll", DbType.Boolean, param.IsGetAll);
                objectDb.AddInParameter("FromDate", DbType.DateTime, param.FromDate);
                objectDb.AddInParameter("ToDate", DbType.DateTime, param.ToDate);
                objectDb.AddInParameter("PageIndex", DbType.Int32, param.PageIndex);
                objectDb.AddInParameter("PageSize", DbType.Int32, param.PageSize);

                objectDb.AddOutParameter("NRows", DbType.Int32, Size.SizeOfInt);

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
                objectDb.AddInParameter(Field.MessageId, DbType.Int32, selectedMessageId);

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
                objectDb.AddInParameter(Field.MessageId, DbType.Int32, param.MessageId);
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
                objectDb.AddInParameter("MessageIds", DbType.String, param.MessageIdList);
                objectDb.AddInParameter("userid", DbType.Int32, param.UserId);
                objectDb.AddInParameter("ip", DbType.String, param.Ip);

                AssignResultOutputParam(objectDb);

                objectDb.ExecuteNonQuery();

                return GetResultInfo(objectDb);
            }
        }

        private static void AssignParam(IObjectDb objectDb, InsertUpdateMessageParam param)
        {
            objectDb.AddInParameter("IsImportant", DbType.Boolean, param.Important);
            objectDb.AddInParameter("msgen", DbType.String, param.MessageContenten);
            objectDb.AddInParameter("msgcn", DbType.String, param.MessageContentcs);
            objectDb.AddInParameter("msgtw", DbType.String, param.MessageContentch);
            objectDb.AddInParameter("msges", DbType.String, param.MessageContentes);
            objectDb.AddInParameter("msgth", DbType.String, param.MessageContentth);
            objectDb.AddInParameter("msgvi", DbType.String, param.MessageContentvn);
            objectDb.AddInParameter("msgid", DbType.String, param.MessageContentid);
            objectDb.AddInParameter("msgkr", DbType.String, param.MessageContentko);
            objectDb.AddInParameter("msgjp", DbType.String, param.MessageContentjp);
            objectDb.AddInParameter("UserID", DbType.Int32, param.UserId);
            objectDb.AddInParameter("IP", DbType.String, param.Ip);

            AssignResultOutputParam(objectDb);
        }
    }
}

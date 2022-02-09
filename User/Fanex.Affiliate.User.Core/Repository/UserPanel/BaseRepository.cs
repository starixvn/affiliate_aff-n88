using Fanex.Affiliate.User.Core.Constants;
using Fanex.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.Repository.UserPanel
{
    public class BaseRepository
    {
        private const string ERR_CODE = "ErrCode";
        private const string ERR_MSG = "ErrMsg";
        

        protected static (int ErrCode, string ErrMsg) GetResult(IObjectDb objectDb)
        {
            var code = Convert.ToInt32(objectDb.GetOuputParams()[ERR_CODE]);
            var msg = Convert.ToString(objectDb.GetOuputParams()[ERR_MSG]);
            return (code, msg);
        }

        protected static void AddOutputParam(IObjectDb objectDb)
        {
            objectDb.AddOutParameter(ERR_CODE, System.Data.SqlDbType.Int, DbParam.ErrCodeSize);
            objectDb.AddOutParameter(ERR_MSG, System.Data.SqlDbType.NVarChar, DbParam.ErrMsgSize);
        }
    }
}


namespace Fanex.Affiliate.Admin.Core.MetaModels
{
    public class CheckPermissionParam
    {
        public int CustId { get; set; }

        public int? FuncId { get; set; }

        public string FuncName { get; set; }

        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }

    }
}

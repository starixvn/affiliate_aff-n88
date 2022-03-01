using System.ComponentModel.DataAnnotations;

namespace Fanex.Affiliate.Admin.Core.MetaModels.Message
{
    public class InsertUpdateMessageParam: UserInfoParam
    {
        public int MessageId { get; set; }

        public bool Important { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string MessageContenten { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string MessageContentcs { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string MessageContentch { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string MessageContentes { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string MessageContentth { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string MessageContentvn { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string MessageContentid { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string MessageContentko { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string MessageContentjp { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string MessageContenthi { get; set; }

        public bool IsValid() {
            if (!(string.IsNullOrEmpty(MessageContenten) && string.IsNullOrEmpty(MessageContentcs) && string.IsNullOrEmpty(MessageContentch) && string.IsNullOrEmpty(MessageContentes)))
            {
                return true;
            }

            if(!(string.IsNullOrEmpty(MessageContentth) && string.IsNullOrEmpty(MessageContentvn) && string.IsNullOrEmpty(MessageContentid) && string.IsNullOrEmpty(MessageContentko)))
            {
                return true;
            }

            return !(string.IsNullOrEmpty(MessageContentjp) && string.IsNullOrEmpty(MessageContenthi));
        }
    }
}

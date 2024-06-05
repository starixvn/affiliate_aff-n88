using Fanex.Data.Repository;

namespace Affiliate.N88.SpParams.Commands
{
    public class SetCustActStatusCommand : NonQueryCommand
    {
        public int CustId { get; set; }

        public override string GetSettingKey() => "API_Customer_Update_Test";

        public override bool IsValid() => true;
    }
}

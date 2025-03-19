using System;

namespace Affiliate.N88.SpParams.Criteria
{
    public class GetAffCustomersCriteria : GetCustomersCriteria
    {
        private const string SP_NAME = "Aff_CustomerSel";

        private string Prefix { get; }

        public GetAffCustomersCriteria(DateTime fromDate, DateTime toDate, int pageIndex, int pageSize, string prefix = null)
            : base(fromDate, toDate, pageIndex, pageSize)
        {
            Prefix = prefix;
        }

        public override string GetSettingKey() => string.IsNullOrWhiteSpace(Prefix) ? SP_NAME: $"{Prefix}_{SP_NAME}";

        public override bool IsValid() => true;
    }
}
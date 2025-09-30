namespace Fanex.Affiliate.Admin.Core.Criterias.Domain
{
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class DomainsExcludingBlockTargetCountryCriteria : CriteriaBase
    {
        [SpParam(Ignored = true)]
        public string SpName { get; set; }

        public override string GetSettingKey() => SpName;

        public override bool IsValid() => true;

        public string CountryCode { get; set; }
    }
}
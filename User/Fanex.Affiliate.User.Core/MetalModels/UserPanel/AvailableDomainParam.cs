namespace Fanex.Affiliate.User.Core.MetalModels.UserPanel
{
    using Data;

    public class AvailableDomainParam
    {
        public int AffId { get; set; }

        public string TargetCountryCode { get; set; }

        [SpParam(Ignored = true)] 
        public bool IsMember { get; set; } = true;

        [SpParam(Ignored = true)]
        public bool IsInternal { get; set; }
    }
}

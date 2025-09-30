namespace Fanex.Affiliate.User.Core.MetalModels.UserPanel
{
    using Data;

    public class LandingPageParam
    {
        public string TargetCountryCode { get; set; }

        [SpParam(Ignored = true)]
        public bool IsInternal { get; set; }

        [SpParam(Ignored = true)]
        public bool IsMember { get; set; } = true;
    }
}

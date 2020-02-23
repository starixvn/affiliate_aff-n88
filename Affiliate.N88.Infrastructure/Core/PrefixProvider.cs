namespace Affiliate.N88.Core
{
    public class PrefixProvider : IPrefixProvider
    {
        public PrefixProvider(string prefixCode)
        {
            PrefixCode = prefixCode;
        }

        public string PrefixCode { get; }
    }
}
using Affiliate.N88.Core;
using Fanex.Data.Repository;

namespace Affiliate.N88.DTO
{
    public abstract class IdenticalSuffixNonQueryCommand : NonQueryCommand
    {
        protected readonly IPrefixProvider _prefixProvider;

        protected IdenticalSuffixNonQueryCommand(IPrefixProvider prefixProvider = null)
        {
            _prefixProvider = prefixProvider;
        }

        protected abstract string SuffixSettingKey { get; }

        public override string GetSettingKey() 
            => _prefixProvider == null || string.IsNullOrWhiteSpace(_prefixProvider.PrefixCode) 
                ? SuffixSettingKey 
                : $"{_prefixProvider.PrefixCode}_{SuffixSettingKey}";
    }
}

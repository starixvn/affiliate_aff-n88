using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.Core
{
    public class PrefixProvider : IPrefixProvider
    {
        private readonly string _prefixCode;
        public PrefixProvider(string prefixCode)
        {
            _prefixCode = prefixCode;
        }
        public string PrefixCode => _prefixCode;
    }
}

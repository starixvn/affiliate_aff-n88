
using System;
using System.Collections.Generic;
using System.Text;

namespace Affiliate.N88.Infrastructure.Licensee
{
    public class N88Licensee : ILicenseeCodePrefix
    {
        public string GetCodePrefix() => "N88";
    }
}

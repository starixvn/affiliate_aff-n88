using Affiliate.N88.Infrastructure.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Affiliate.N88.Infrastructure.Implementation
{
    public class N88Licensee : ILicenseeCodePrefix
    {
        public string GetCodePrefix() => "N88";
    }
}

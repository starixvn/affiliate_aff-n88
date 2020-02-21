using Affiliate.N88.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.Infrastructure.Repository
{
    public interface IMemberImportRepository
    {
        Task ImportMember(MemberInfo memberInfo);
    }
}

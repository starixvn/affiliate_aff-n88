using Affiliate.N88.Infrastructure.DTO;
using Affiliate.N88.Infrastructure.Exceptions;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.Infrastructure.Repository
{
    public class MemberInfoImportRepository : IMemberImportRepository
    {
        private readonly IDynamicRepository _dynamicRepository;
        public MemberInfoImportRepository(IDynamicRepository dynamicRepository)
        {
            _dynamicRepository = dynamicRepository;
        }

        public async Task ImportMember(MemberInfo memberInfo)
        {
            await _dynamicRepository.ExecuteAsync(memberInfo); 
            if(memberInfo.ErrCode != 0)
            {
                throw new ImporterException(memberInfo.ErrCode.ToString(), memberInfo.ErrMsg, memberInfo.XmlData);
            }
        }
    }
}

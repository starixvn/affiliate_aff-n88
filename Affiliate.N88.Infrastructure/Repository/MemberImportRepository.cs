using Affiliate.N88.DTO;
using Affiliate.N88.Exceptions;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.Repository
{
    public class MemberImportRepository : IMemberImportRepository
    {
        private readonly IDynamicRepository _dynamicRepository;
        public MemberImportRepository(IDynamicRepository dynamicRepository)
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

using Affiliate.N88.Exceptions;
using Affiliate.N88.SpParams.Commands;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.Repository
{
    public class ThirdPartyImportRepository : IThirdPartyImportRepository
    {
        public readonly IDynamicRepository _dynamicRepository;

        public ThirdPartyImportRepository(IDynamicRepository dynamicRepository)
        {
            _dynamicRepository = dynamicRepository;
        }

        public async Task ImportBetRecordAsync(InsertBetRecodInfoCommand betRecord)
        {
            await _dynamicRepository.ExecuteAsync(betRecord);
            if (betRecord.ErrCode != 0)
            {
                throw new ImporterException(betRecord.ErrCode.ToString(), betRecord.ErrMsg, betRecord.XmlData);
            }
        }
    }
}

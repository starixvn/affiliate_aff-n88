using Affiliate.N88.SpParams.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.Repository
{
    public interface IThirdPartyImportRepository
    {
        Task ImportBetRecordAsync(InsertBetRecodInfoCommand betRecord);
    }
}

using Affiliate.N88.SpParams.Commands;
using System.Threading.Tasks;

namespace Affiliate.N88.Repository
{
    public interface IThirdPartyImportRepository
    {
        Task ImportRecordAsync(InsertThirdPartyRecodInfoCommand betRecord);
    }
}

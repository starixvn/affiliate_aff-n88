using Fanex.Affiliate.Link.DTOs;
namespace Fanex.Affiliate.Link.Services.Interface
{
    /// <summary>
    /// Tracking system statistics.
    /// </summary>
    public interface IAffInfoService
    {
        AffInfo GetAffInfoByAffCode(string affCode);
    }
}

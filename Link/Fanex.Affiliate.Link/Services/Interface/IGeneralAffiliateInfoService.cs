namespace Fanex.Affiliate.Link.Services.Interface
{
    using Fanex.Affiliate.Link.Criterias;

    /// <summary>
    /// Tracking system statistics.
    /// </summary>
    public interface IGeneralAffiliateInfoService
    {
        /// <summary>
        /// Insert statistics into database.
        /// </summary>
        /// <param name="criteria">Input criteria.</param>
        /// <returns>Success or fail.</returns>
        (int affId, int affCode) GetGeneralAffiliateInfo(int? affId = null, int? affCode = null);
    }
}

namespace Fanex.Affiliate.Link.DataAccess.Interface
{
    using Fanex.Affiliate.Link.Criterias;

    public interface IGeneralAffiliateInfoDataAccess
    {
        /// <summary>
        /// Insert statistics into database.
        /// </summary>
        /// <param name="criteria">Input criteria.</param>
        /// <returns>Success or fail.</returns>
        (int affId, int affCode) GetGeneralAffiliateInfo(int? affId = null, int? affCode = null);
    }
}

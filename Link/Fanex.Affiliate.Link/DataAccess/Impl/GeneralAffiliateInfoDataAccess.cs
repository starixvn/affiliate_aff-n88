namespace Fanex.Affiliate.Link.DataAccess.Impl
{
    using System;
    using System.Data;
    using Fanex.Affiliate.Link.Criterias;
    using Fanex.Affiliate.Link.DataAccess.Interface;
    using Fanex.Data;

    /// <summary>
    /// Tracking statistics.
    /// </summary>
    public class GeneralAffiliateInfoDataAccess : IGeneralAffiliateInfoDataAccess
    {
        /// <summary>
        /// Insert statistics into database.
        /// </summary>
        /// <param name="criteria">Input criteria.</param>
        /// <returns>Success or fail.</returns>
        public (int affId, int affCode) GetGeneralAffiliateInfo(int? affId = null, int? affCode = null)
        {
            const string uSpKey = "Aff_Get_GeneralAffInfo_xtest";

            using (var objectDb = new ObjectDb(uSpKey))
            {
                objectDb.AddInParameter("AffId", DbType.Int32, affId);

                using (var reader = objectDb.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return (Convert.ToInt32(reader["AffId"]), Convert.ToInt32(reader["AffCode"]));
                    }

                    return (0,0);
                }
            }
        }
    }
}

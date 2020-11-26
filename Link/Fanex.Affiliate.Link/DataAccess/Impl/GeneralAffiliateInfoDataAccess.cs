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
        public (int affId, string affCode) GetGeneralAffiliateInfo(int? affId = null, string affCode = null)
        {
            const string uSpKey = "Aff_Get_GeneralAffInfo";

            using (var objectDb = new ObjectDb(uSpKey))
            {
                objectDb.AddInParameter("AffId", DbType.Int32, affId);
                objectDb.AddInParameter("AffCode", DbType.String, affCode);

                using (var reader = objectDb.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return (Convert.ToInt32(reader["AffId"]), Convert.ToString(reader["AffCode"]));
                    }

                    return (0,string.Empty);
                }
            }
        }
    }
}

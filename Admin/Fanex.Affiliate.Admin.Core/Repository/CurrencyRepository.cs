using Fanex.Affiliate.Admin.Core.DTO;
using System.Collections.Generic;

namespace Fanex.Affiliate.Admin.Core.Repository
{
    public class CurrencyRepository : BaseRepository, ICurrencyRepository
    {
        public IEnumerable<Currency> GetBaseCurrencies()
        {
            const string spKey = "Aff_BaseCurrency_Sel";

            using (var objectDb = GetObjectDb(spKey))
            {
                var currencies = objectDb.Query<Currency>();
                return currencies;
            }
        }

        public IEnumerable<Currency> GetCurrencies()
        {
            const string spKey = "Aff_Currency_Sel";

            using (var objectDb = GetObjectDb(spKey))
            {
                var currencies = objectDb.Query<Currency>();
                return currencies;
            }
        }
    }
}

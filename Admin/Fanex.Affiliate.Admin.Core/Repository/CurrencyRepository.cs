using Fanex.Affiliate.Admin.Core.DTO;
using System.Collections.Generic;

namespace Fanex.Affiliate.Admin.Core.Repository
{
    public class CurrencyRepository : BaseRepository, ICurrencyRepository
    {
        public IEnumerable<BaseCurrency> GetBaseCurrencies()
        {
            const string spKey = "Aff_BaseCurrency_Sel";

            using (var objectDb = GetObjectDb(spKey))
            {
                var currencies = objectDb.Query<BaseCurrency>();
                return currencies;
            }
        }

        public IEnumerable<BaseCurrency> GetCurrencies()
        {
            const string spKey = "Aff_Currency_Sel";

            using (var objectDb = GetObjectDb(spKey))
            {
                var currencies = objectDb.Query<BaseCurrency>();
                return currencies;
            }
        }
    }
}

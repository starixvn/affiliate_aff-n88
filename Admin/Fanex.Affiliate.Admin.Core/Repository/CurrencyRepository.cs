using Fanex.Affiliate.Admin.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}

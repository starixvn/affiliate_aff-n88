using System.Collections.Generic;
using Fanex.Affiliate.User.Core.DTO.UserPanel;

namespace Fanex.Affiliate.User.Core.Repository.UserPanel
{
    public interface ICurrencyRepository
    {
        IEnumerable<Currency> GetBaseCurrencyList();
    }
}

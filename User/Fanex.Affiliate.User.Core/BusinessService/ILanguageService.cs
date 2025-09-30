using Fanex.Affiliate.User.Core.DTO;
using System.Collections.Generic;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public interface ILanguageService
    {
        void SetCulture(string languageCode);

        string GetFavoriteLanguage();

        string GetCountry();

        string GetCurrentLanguage();

        bool IsValid(string langCode);

        IEnumerable<Language> GetLanguageList(bool? isInternal = null);

        IEnumerable<Language> GetSupportedUILanguageList(bool? isInternal = null);

        IEnumerable<TargetCountryLanguage> GetSystemTargetCountries();

        Dictionary<string, List<TargetCountryLanguage>> GetTargetCountryLanguages();

        IEnumerable<Language> GetLanguageByTargetCountry(string targetCountry = "");
    }
}

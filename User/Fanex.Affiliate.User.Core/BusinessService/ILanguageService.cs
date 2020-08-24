using Fanex.Affiliate.User.Core.DTO.UserPanel.MediaGallery;
using Fanex.Affiliate.User.Core.DTO;
using System.Collections.Generic;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public interface ILanguageService
    {
        void SetCulture(string languageCode);

        string GetFavoriteLanguage();

        string GetCurrentLanguage();

        IEnumerable<LanguageType> GetLanguageList(bool isInternal);
        bool IsValid(string langCode);

        IEnumerable<Language> GetSystemLanguages(bool? isInternal = null);
    }
}

using Fanex.Affiliate.User.Core.DTO.UserPanel.MediaGallery;
using System.Collections.Generic;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public interface ILanguageService
    {
        void SetCulture(string languageCode);

        string GetFavoriteLanguage();

        string GetCurrentLanguage();

        IEnumerable<LanguageType> GetLanguageList(bool isInternal);
    }
}

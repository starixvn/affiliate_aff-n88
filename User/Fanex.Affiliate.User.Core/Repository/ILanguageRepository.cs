using Fanex.Affiliate.User.Core.DTO.UserPanel.MediaGallery;
using System.Collections.Generic;

namespace Fanex.Affiliate.User.Core.Repository
{
    public interface ILanguageRepository
    {
        IEnumerable<LanguageType> GetLanguageList(bool isInternal);
    }
}

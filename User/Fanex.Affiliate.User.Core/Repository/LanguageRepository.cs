using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.UserPanel.MediaGallery;
using System.Collections.Generic;
using System.Linq;

namespace Fanex.Affiliate.User.Core.Repository
{
    public class LanguageRepository : ILanguageRepository
    {
        private readonly IObjectDBBuilder Builder;

        public LanguageRepository(IObjectDBBuilder builder)
        {
            Builder = builder;
        }

        public IEnumerable<Language> GetLanguageList(bool isInternal)
        {
            const string uSpKey = "Aff_Market_Sel";
            var dbMode = isInternal ? DBMode.View : DBMode.Main;

            using (var objectDb = Builder.Build(uSpKey, dbMode))
            {
                return objectDb.Query<Language>();
            }
        }

        public IEnumerable<TargetCountryLanguage> GetTargetCountryInfo(string targetCountryCode = "", bool isDefault = true)
        {
            const string uSpKey = "Aff_TargetCountry_Sel";

            using (var objectDb = Builder.Build(uSpKey))
            {
                return objectDb.Query<TargetCountryLanguage>(new { isDefault, targetCountryCode });
            }
        }
    }
}

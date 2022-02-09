using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.Repository;
using Fanex.Affiliate.User.Core.Utilities;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public class LanguageService : ILanguageService
    {
        private readonly ILanguageRepository LanguageRepository;
        private readonly IMemoryCacheService CacheService;

        public LanguageService(ILanguageRepository languageRepository, IMemoryCacheService cacheService)
        {
            LanguageRepository = languageRepository;
            CacheService = cacheService;
        }

        public string GetCurrentLanguage()
            => Thread.CurrentThread.CurrentCulture.Name;

        public string GetFavoriteLanguage()
        {
            var preferedUrlLang = HttpContext.Current.Request["lang"]?.Trim();
            var preferedLang = SystemLanguage.LanguageList.FirstOrDefault(i => string.Equals(i.ShortedCode, preferedUrlLang, StringComparison.OrdinalIgnoreCase))?.Code ?? string.Empty;

            if (!string.IsNullOrEmpty(preferedLang) && SystemLanguage.IsValid(preferedLang))
            {
                return preferedLang;
            }

            var langCookie = HttpContext.Current.Request.Cookies["afffavoritelang" + AppSetting.Instance.SiteName]?.Value;

            return SystemLanguage.IsValid(langCookie) ? langCookie : SystemLanguage.DefaultLanguageCode;
        }

        public void SetCulture(string languageCode)
        {

            Thread.CurrentThread.CurrentUICulture = new CultureInfo(languageCode);
            Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(languageCode);

            Thread.CurrentThread.CurrentCulture.DateTimeFormat = CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat;
            Thread.CurrentThread.CurrentCulture.NumberFormat = CultureInfo.CreateSpecificCulture("en-US").NumberFormat;
        }

        public IEnumerable<Language> GetLanguageList(bool isInternal)
        {
            var languageList = CacheService.Get<IEnumerable<Language>>(CacheKey.LanguageList) ?? LanguageRepository.GetLanguageList(isInternal);

            if (languageList != null)
            {
                CacheService.Set(CacheKey.LanguageList, languageList);
            }

            return languageList ?? new List<Language>();
        }
    }
}

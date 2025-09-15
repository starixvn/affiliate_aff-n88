using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.Extensions;
using Fanex.Affiliate.User.Core.Repository;
using Fanex.Affiliate.User.Core.Utilities;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public class LanguageService : ILanguageService
    {
        private const string LANGUAGE_COOKIE_KEY = "afffavoritelang";

        private readonly ISessionService _sessionService;
        private readonly ILanguageRepository _languageRepository;
        private readonly IMemoryCacheService _cacheService;
        private readonly IIpLocationService _ipLocationService;

        public LanguageService(
            ILanguageRepository languageRepository, 
            ISessionService sessionService, 
            IMemoryCacheService cacheService, 
            IIpLocationService ipLocationService)
        {
            _languageRepository = languageRepository;
            _sessionService = sessionService;
            _cacheService = cacheService;
            _ipLocationService = ipLocationService;
        }

        public string GetCurrentLanguage()
            => Thread.CurrentThread.CurrentCulture.Name;

        public string GetFavoriteLanguage()
        {
            var preferredUrlLang = HttpContext.Current.Request["lang"]?.Trim();
            var preferredLang = SystemLanguage.SupportedFavoriteLanguages.FirstOrDefault(i => string.Equals(i.Key, preferredUrlLang, StringComparison.OrdinalIgnoreCase)).Value;

            if (IsValid(preferredLang))
            {
                return preferredLang;
            }

            var langCookie = HttpContext.Current.Request.Cookies[LANGUAGE_COOKIE_KEY + AppSetting.Instance.SiteName]?.Value;

            return IsValid(langCookie) ? langCookie : SystemLanguage.DefaultLanguageCode;
        }

        public string GetCountry()
        {
            var preferredUrlLang = HttpContext.Current.Request["lang"]?.Trim();

            if (!string.IsNullOrWhiteSpace(preferredUrlLang) && SystemLanguage.SupportedFavoriteLanguages.ContainsKey(preferredUrlLang))
            {
                return GetCountryByLanguage(preferredUrlLang);
            }

            return GetCountryByIp();
        }

        private string GetCountryByLanguage(string languageShortedCode)
        {
            var targetCountryLanguages = GetTargetCountryLanguages();

            foreach (var dic in targetCountryLanguages)
            {
                var value = dic.Value;
                if (value.FirstOrDefault(l => l.ShortedCode == languageShortedCode) != null)
                {
                    return dic.Key;
                }
            }

            return SystemLanguage.DefaultCountryCode;
        }

        private string GetCountryByIp()
        {
            var request = HttpContext.Current.Request;
            var cookieKey = $"{AppSetting.Instance.SiteName}_country";
            var countryCookie = request.Cookies[cookieKey]?.Value;

            if (!string.IsNullOrWhiteSpace(countryCookie))
            {
                return countryCookie;
            }

            var countryByIp = _ipLocationService.GetCountryFromIp(request.GetClientIP());
            if (IsValidCountry(countryCookie))
            {
                var languageCookie = new HttpCookie(LANGUAGE_COOKIE_KEY + AppSetting.Instance.SiteName, SystemLanguage.DefaultCountryCode)
                {
                    HttpOnly = true,
                    Secure = true
                };

                HttpContext.Current.Response.Cookies.Add(languageCookie);

                return countryByIp;
            }

            return SystemLanguage.DefaultCountryCode;
        }

        public IEnumerable<Language> GetLanguageList(bool? isInternal = null)
        {
            var isForInternal = isInternal ?? _sessionService.IsInternal;
            var languageList = _cacheService.Get<IEnumerable<Language>>(CacheKey.LanguageList);

            if (languageList == null)
            {
                languageList = _languageRepository.GetLanguageList(isForInternal);
                _cacheService.Set(CacheKey.LanguageList, languageList);
            }

            return languageList ?? new List<Language>();
        }

        public IEnumerable<Language> GetSupportedUILanguageList(bool? isInternal = null)
        {
            var isForInternal = isInternal ?? _sessionService.IsInternal;
            var uiLanguageList = _cacheService.Get<IEnumerable<Language>>(CacheKey.SupportedUiLanguageList);

            if (uiLanguageList == null)
            {
                var languageList = _languageRepository.GetLanguageList(isForInternal) ?? new List<Language>();
                uiLanguageList = languageList.Where(l => !l.Code.Equals("ko-KR") && !l.Code.Equals("pt-BR"));

                _cacheService.Set(CacheKey.SupportedUiLanguageList, uiLanguageList);
            }

            return uiLanguageList;
        }

        public bool IsValid(string langCode)
            => !string.IsNullOrWhiteSpace(langCode) && GetLanguageList().Any(l => Equals(l.Code, langCode));

        private bool IsValidCountry(string countryCode)
            => !string.IsNullOrWhiteSpace(countryCode) && GetTargetCountries(countryCode).Any();

        public void SetCulture(string languageCode)
        {

            Thread.CurrentThread.CurrentUICulture = new CultureInfo(languageCode);
            Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(languageCode);

            Thread.CurrentThread.CurrentCulture.DateTimeFormat = CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat;
            Thread.CurrentThread.CurrentCulture.NumberFormat = CultureInfo.CreateSpecificCulture("en-US").NumberFormat;
        }

        public IEnumerable<TargetCountryLanguage> GetTargetCountries(string targetCountryCode = "", bool isDefault = true)
        {
            return _languageRepository.GetTargetCountryInfo(targetCountryCode, isDefault);
        }

        public Dictionary<string, List<TargetCountryLanguage>> GetTargetCountryLanguages(string targetCountryCode = "")
        {
            var targetCountryLanguages = GetTargetCountries(targetCountryCode, false);

            var result = targetCountryLanguages
                .GroupBy(tcl => tcl.TargetCountryCode)
                .ToDictionary(
                    g => g.Key,
                    g => g.OrderByDescending(m => m.Code == SystemLanguage.DefaultLanguageCode).ToList()
                );

            return result;
        }
    }
}

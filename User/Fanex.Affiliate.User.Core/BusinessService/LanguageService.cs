namespace Fanex.Affiliate.User.Core.BusinessService
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Threading;
    using System.Web;
    using Constants;
    using CoreService;
    using DTO;
    using Extensions;
    using Repository;
    using Utilities;

    public class LanguageService : ILanguageService
    {
        private static string siteName = AppSetting.Instance.SiteName.ToLowerInvariant();

        private string LANGUAGE_COOKIE_KEY = $"{siteName}_afffavoritelang";
        private string COUNTRY_COOKIE_KEY = $"{siteName}_country";
        private string COUNTRY_IP_COOKIE_KEY = $"{siteName}_ipcountry";

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

            var langCookie = HttpContext.Current.Request.Cookies[LANGUAGE_COOKIE_KEY]?.Value;
            return IsValid(langCookie) ? langCookie : GetLanguageByCountry();
        }

        private string GetLanguageByCountry()
        {
            var countryCode = GetCountry();
            if (string.IsNullOrWhiteSpace(countryCode))
            {
                return null;
            }

            return GetSystemTargetCountries()
                       .FirstOrDefault(c => c.TargetCountryCode == countryCode)
                       ?.Code
                   ?? SystemLanguage.DefaultLanguageCode;
        }

        public string GetCountry()
        {
            var countryByRoute = GetCountryByRoute();
            if (!string.IsNullOrWhiteSpace(countryByRoute))
            {
                return countryByRoute;
            }

            var countryByCookie = GetCountryByCookie();
            if (!string.IsNullOrWhiteSpace(countryByCookie))
            {
                return countryByCookie;
            }

            return GetCountryByIp();
        }

        private string GetCountryByRoute()
        {
            var languageShortedCode = HttpContext.Current.Request["lang"]?.Trim();
            if (string.IsNullOrWhiteSpace(languageShortedCode) || !SystemLanguage.SupportedFavoriteLanguages.ContainsKey(languageShortedCode))
            {
                return string.Empty;
            }

            var match = GetTargetCountryLanguages()
                .FirstOrDefault(dic => dic.Value.Any(l => l.ShortedCode == languageShortedCode));

            if (!string.IsNullOrWhiteSpace(match.Key))
            {
                SetCountryCookie(match.Key, COUNTRY_COOKIE_KEY);
                return match.Key;
            }

            return string.Empty;
        }

        private string GetCountryByCookie()
        {
            var request = HttpContext.Current.Request;
            var country = request.Cookies[COUNTRY_COOKIE_KEY]?.Value;
            if (IsValidCountry(country))
            {
                return country;
            }

            return string.Empty;
        }

        private string GetCountryByIp()
        {
            var request = HttpContext.Current.Request;
            var countryInfo = _ipLocationService.GetCountryFromIp(request.GetClientIP());
            var country = countryInfo?.CountrySHORT;
            SetCountryCookie(country, COUNTRY_IP_COOKIE_KEY);

            if (!IsValidCountry(country))
            {
                country = SystemLanguage.DefaultCountryCode;
            }

            SetCountryCookie(country, COUNTRY_COOKIE_KEY);
            return country;
        }

        private static void SetCountryCookie(string countryCode, string cookieKey)
        {
            var request = HttpContext.Current.Request;
            var response = HttpContext.Current.Response;

            var existingCookie = request.Cookies[cookieKey];
            if (existingCookie != null && existingCookie.Value == countryCode)
            {
                return;
            }

            var cookie = new HttpCookie(cookieKey, countryCode)
            {
                HttpOnly = true,
                Secure = true
            };

            response.Cookies.Set(cookie);
        }

        public IEnumerable<Language> GetLanguageList(bool? isInternal = null)
        {
            var isForInternal = isInternal ?? _sessionService.IsInternal;
            var cacheKey = (isForInternal
                               ? CacheKey.InternalLanguageList
                               : CacheKey.LanguageList)
                           + GetCountryCodeKey();

            var languageList = _cacheService.Get<IEnumerable<Language>>(cacheKey);
            if (languageList == null)
            {
                languageList = _languageRepository
                    .GetLanguageList(isForInternal)
                    .FilterPhLanguage(l => l.Code, _sessionService.UserSession?.TargetCountryCode);
                _cacheService.Set(cacheKey, languageList);
            }

            return languageList ?? new List<Language>();
        }

        public IEnumerable<Language> GetLanguageByTargetCountry(string targetCountry = "")
        {
            var cacheKey = (_sessionService.IsInternal
                               ? CacheKey.InternalLanguageListByTargetCountry
                               : CacheKey.LanguageListByTargetCountry)
                           + targetCountry;

            var languageListByTargetCountry = _cacheService.Get<IEnumerable<Language>>(cacheKey);
            if (languageListByTargetCountry == null)
            {
                languageListByTargetCountry = GetTargetCountries(targetCountry, false)
                    .Select(l => new Language
                    {
                        Code = l.Code,
                        EnglishName = l.EnglishName,
                        NativeName = l.NativeName,
                        ShortedCode = l.ShortedCode
                    })
                    .ToList();

                _cacheService.Set(cacheKey, languageListByTargetCountry);
            }

            return languageListByTargetCountry;
        }

        public IEnumerable<Language> GetSupportedUILanguageList(bool? isInternal = null)
        {
            var isForInternal = isInternal ?? _sessionService.IsInternal;
            var cacheKey = (isForInternal
                               ? CacheKey.InternalSupportedUiLanguageList
                               : CacheKey.SupportedUiLanguageList)
                           + GetCountryCodeKey();

            var uiLanguageList = _cacheService.Get<IEnumerable<Language>>(cacheKey);
            if (uiLanguageList == null)
            {
                var languageList = GetLanguageList();
                uiLanguageList = languageList.Where(l => !l.Code.Equals("ko-KR") && !l.Code.Equals("pt-BR"));

                _cacheService.Set(cacheKey, uiLanguageList);
            }

            return uiLanguageList;
        }

        public IEnumerable<TargetCountryLanguage> GetSystemTargetCountries()
        {
            var isInternal = _sessionService.IsInternal;
            var cacheKey = (isInternal
                               ? CacheKey.InternalTargetCountryList
                               : CacheKey.TargetCountryList)
                           + GetCountryCodeKey();

            var targetCountryList = _cacheService.Get<IEnumerable<TargetCountryLanguage>>(cacheKey);
            if (targetCountryList == null)
            {
                targetCountryList = GetTargetCountries();
                _cacheService.Set(cacheKey, targetCountryList);
            }

            return targetCountryList ?? new List<TargetCountryLanguage>();
        }

        public bool IsValid(string langCode)
            => !string.IsNullOrWhiteSpace(langCode) && GetLanguageList().Any(l => Equals(l.Code, langCode));

        private bool IsValidCountry(string countryCode)
            => !string.IsNullOrWhiteSpace(countryCode) && GetSystemTargetCountries().Any(t => Equals(t.TargetCountryCode, countryCode));

        public void SetCulture(string languageCode)
        {

            Thread.CurrentThread.CurrentUICulture = new CultureInfo(languageCode);
            Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(languageCode);

            Thread.CurrentThread.CurrentCulture.DateTimeFormat = CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat;
            Thread.CurrentThread.CurrentCulture.NumberFormat = CultureInfo.CreateSpecificCulture("en-US").NumberFormat;
        }

        private IEnumerable<TargetCountryLanguage> GetTargetCountries(string targetCountryCode = "", bool isDefault = true)
        {
            var isInternal = _sessionService.IsInternal;
            return _languageRepository
                .GetTargetCountryInfo(targetCountryCode, isDefault, isInternal)
                .FilterPhCountry(c => c.TargetCountryCode, _sessionService.UserSession?.TargetCountryCode);
        }

        public Dictionary<string, List<TargetCountryLanguage>> GetTargetCountryLanguages()
        {
            var cacheKey = (_sessionService.IsInternal
                               ? CacheKey.InternalTargetCountryLanguages
                               : CacheKey.TargetCountryLanguages)
                           + GetCountryCodeKey();

            var targetCountryLanguages = _cacheService.Get<IEnumerable<TargetCountryLanguage>>(cacheKey);
            if (targetCountryLanguages == null)
            {
                targetCountryLanguages = GetTargetCountries(string.Empty, false);
                _cacheService.Set(cacheKey, targetCountryLanguages);
            }

            var result = targetCountryLanguages
                .GroupBy(tcl => tcl.TargetCountryCode)
                .ToDictionary(
                    g => g.Key,
                    g => g.OrderByDescending(m => m.Code == SystemLanguage.EnglishLanguageCode).ToList()
                );

            return result;
        }

        private string GetCountryCodeKey()
        {
            var countryCode = _sessionService.UserSession?.TargetCountryCode ?? _sessionService.CountryShort;
            if (siteName == SiteName.N88.ToLowerInvariant()
                && string.Equals(countryCode, SystemLanguage.PhilippinesCountryCode, StringComparison.InvariantCultureIgnoreCase))
            {
                return $"_{countryCode}";
            }

            return "_";
        }
    }
}

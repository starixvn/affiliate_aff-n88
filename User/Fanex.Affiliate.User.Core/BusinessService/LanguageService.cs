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
        private static readonly string siteName = AppSetting.Instance.SiteName.ToLowerInvariant();

        private readonly string LANGUAGE_COOKIE_KEY = $"{siteName}_afffavoritelang";
        private readonly string COUNTRY_COOKIE_KEY = $"{siteName}_country";
        private readonly string COUNTRY_IP_COOKIE_KEY = $"{siteName}_ipcountry";

        private readonly ISessionService _sessionService;
        private readonly ILanguageRepository _languageRepository;
        private readonly IMemoryCacheService _cacheService;
        private readonly IIpLocationService _ipLocationService;
        private readonly IUnderMaintenanceService _underMaintenanceService;

        public LanguageService(
            ILanguageRepository languageRepository,
            ISessionService sessionService,
            IMemoryCacheService cacheService,
            IIpLocationService ipLocationService,
            IUnderMaintenanceService underMaintenanceService)
        {
            _languageRepository = languageRepository;
            _sessionService = sessionService;
            _cacheService = cacheService;
            _ipLocationService = ipLocationService;
            _underMaintenanceService = underMaintenanceService;
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
            var country = GetCountryFromIp();
            SetCountryCookie(country, COUNTRY_IP_COOKIE_KEY);

            if (!IsValidCountry(country))
            {
                country = SystemLanguage.DefaultCountryCode;
            }

            SetCountryCookie(country, COUNTRY_COOKIE_KEY);
            return country;
        }

        private string GetCountryFromIp()
        {
            if(_underMaintenanceService.IsUnderMaintenance())
            {
                return string.Empty;
            }

            var request = HttpContext.Current.Request;
            var countryInfo = _ipLocationService.GetCountryFromIp(request.GetClientIP());

            return countryInfo?.CountrySHORT;
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
            var cacheKey = isForInternal ? CacheKey.InternalLanguageList : CacheKey.LanguageList;
            var languageList = _cacheService.Get<IEnumerable<Language>>(cacheKey);

            if (!_underMaintenanceService.IsUnderMaintenance() && languageList == null)
            {
                languageList = _languageRepository.GetLanguageList(isForInternal);
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

            if (!_underMaintenanceService.IsUnderMaintenance() && languageListByTargetCountry == null)
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
            var cacheKey = isForInternal ? CacheKey.InternalSupportedUiLanguageList : CacheKey.SupportedUiLanguageList;
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
            var cacheKey = isInternal ? CacheKey.InternalTargetCountryList : CacheKey.TargetCountryList;

            var targetCountryList = _cacheService.Get<IEnumerable<TargetCountryLanguage>>(cacheKey);
            if (!_underMaintenanceService.IsUnderMaintenance() && targetCountryList == null)
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
            return _languageRepository.GetTargetCountryInfo(targetCountryCode, isDefault, isInternal);
        }

        public Dictionary<string, List<TargetCountryLanguage>> GetTargetCountryLanguages()
        {
            var cacheKey = _sessionService.IsInternal ? CacheKey.InternalTargetCountryLanguages : CacheKey.TargetCountryLanguages;
            var targetCountryLanguages = _cacheService.Get<IEnumerable<TargetCountryLanguage>>(cacheKey);
            if (!_underMaintenanceService.IsUnderMaintenance() && targetCountryLanguages == null)
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
    }
}

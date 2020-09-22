using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.Resources;
using Fanex.Affiliate.User.Core.Utilities;

namespace Fanex.Affiliate.User.Core.Constants
{
    public static class SystemLanguage
    {
        private static IDictionary<string, string> _supportedLanguageForGoogleAnalytics = new Dictionary<string, string>
        {
            ["en-US"] = "en",
            ["zh-CN"] = "cs",
            ["th-TH"] = "th",
            ["vi-VN"] = "vn",
            ["id-ID"] = "id",
        };

        public static IDictionary<string, string> SupportedLanguage => _supportedLanguageForGoogleAnalytics;

        public static string DefaultLanguageCode
        {
            get { return AppSetting.Instance.DefaultLanguageCode; }
        }

        public const string EnglishLanguageCode = "en-US";

        public const string IndonesiaLanguageCode = "id-ID";

        public const string ShortedDefaultCode = "en";

        public const string ShortedEuroCode = "eneuro";

        public static IEnumerable<Language> LanguageList
        {
            get
            {
                IEnumerable<Language> languageList = DefaultLanguaList.Values;

                var service = DependencyResolver.Current.GetService<IMarketingService>();
                var sessionService = DependencyResolver.Current.GetService<ISessionService>();
                if (service != null && sessionService != null)
                {
                    try
                    {
                        languageList = service.GetLanguageList(sessionService.IsInternal)
                            .Select(l => new Language
                            {
                                Code = l.MarketId,
                                DisplayName = l.DisplayName ?? DefaultLanguaList[l.MarketId].DisplayName,
                                EnglishName = l.MarketName ?? DefaultLanguaList[l.MarketId].EnglishName,
                                NativeName = l.MarketNativeName ?? DefaultLanguaList[l.MarketId].NativeName,
                                ShortedCode = l.ShortedCode ?? DefaultLanguaList[l.MarketId].ShortedCode
                            })
                            .ToList();
                    }
                    catch { }
                }

                return languageList;
            }
        }

        public static IDictionary<string,Language> DefaultLanguaList => new Dictionary<string, Language>
        {
            { "vi-VN", new Language { Code = "vi-VN", NativeName = "Tiếng Việt", DisplayName = "Vietnamese", EnglishName = "Vietnamese", ShortedCode = "vn"} },
            { "en-US", new Language { Code = "en-US", NativeName = "English", DisplayName = "English", EnglishName = "English", ShortedCode = "en"} },
            { "zh-CN", new Language { Code = "zh-CN", NativeName = "中文简体", DisplayName = "Chinese Simplified", EnglishName = "Chinese Simplified", ShortedCode = "cs"} },
            { "id-ID", new Language { Code = "id-ID", NativeName = "Indonesia", DisplayName = "Bahasa Indonesia", EnglishName = "Indonesian", ShortedCode = "id"} },
            { "th-TH", new Language { Code = "th-TH", NativeName = "ภาษาไทย", DisplayName = "Thai", EnglishName = "Thai", ShortedCode = "th"} }
        };

        public static string GetShortedCodeForTracking(string currentLanguage)
        {
            string result = string.Empty;
            if (_supportedLanguageForGoogleAnalytics.TryGetValue(currentLanguage, out result) && !string.IsNullOrEmpty(result))
            {
                return result.ToUpperInvariant();
            }

            return ShortedDefaultCode.ToUpperInvariant();
        }

        public static string GetLanguageText(string value)
        {
            return value.Equals("english (europe)", System.StringComparison.OrdinalIgnoreCase) ? Lang.EnglishEU
                  : Lang.ResourceManager.GetString(value.Replace(" ", "")) ?? value;

        }

        public static bool IsValid(string languageCode)
        {
            return !string.IsNullOrEmpty(languageCode) && LanguageList.Any(l => Equals(l.Code, languageCode));
        }


    }
}
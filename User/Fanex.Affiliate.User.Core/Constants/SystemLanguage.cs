using System;
using System.Collections.Generic;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.Resources;
using Fanex.Affiliate.User.Core.Utilities;

namespace Fanex.Affiliate.User.Core.Constants
{
    public static class SystemLanguage
    {
        private static readonly IAppSetting _appSetting = AppSetting.Instance;


        public static string DefaultLanguageCode
        {
            get { return _appSetting.DefaultLanguageCode; }
        }

        public static string DefaultShortedLanguageCode
        {
            get { return _appSetting.DefaultShortedLanguageCode; }
        }

        public const string EnglishLanguageCode = "en-US";

        public const string IndonesiaLanguageCode = "id-ID";

        public static IDictionary<string,Language> DefaultLanguageList => new Dictionary<string, Language>
        {
            { "vi-VN", new Language { Code = "vi-VN", NativeName = "Tiếng Việt", DisplayName = "Vietnamese", EnglishName = "Vietnamese", ShortedCode = "vn"} },
            { "en-US", new Language { Code = "en-US", NativeName = "English", DisplayName = "English", EnglishName = "English", ShortedCode = "en"} },
            { "zh-CN", new Language { Code = "zh-CN", NativeName = "中文简体", DisplayName = "Chinese Simplified", EnglishName = "Chinese Simplified", ShortedCode = "cs"} },
            { "id-ID", new Language { Code = "id-ID", NativeName = "Indonesia", DisplayName = "Bahasa Indonesia", EnglishName = "Indonesian", ShortedCode = "id"} },
            { "th-TH", new Language { Code = "th-TH", NativeName = "ภาษาไทย", DisplayName = "Thai", EnglishName = "Thai", ShortedCode = "th"} }
        };

        public static string GetUppercaseShortedCode(string languageCode)
        {
            string shortedCode = LanguageList.FirstOrDefault(l => string.Equals(l.Code, languageCode, StringComparison.OrdinalIgnoreCase))?.ShortedCode ?? DefaultShortedLanguageCode;

            return shortedCode.ToUpperInvariant();
        }

        public static string GetLanguageText(string value)
        {
            return value.Equals("english (europe)", StringComparison.OrdinalIgnoreCase) ? Lang.EnglishEU
                  : Lang.ResourceManager.GetString(value.Replace(" ", "")) ?? value;
        }
    }
}
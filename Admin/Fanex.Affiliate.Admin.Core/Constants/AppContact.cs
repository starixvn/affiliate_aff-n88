namespace Fanex.Affiliate.Admin.Core.Constants
{
    using System.Collections.Generic;

    public static class AppContact
    {
        public const string Telegram = "Telegram";
        public const string WhatsApp = "WhatsApp";
        public const string Line = "Line";
        public const string Facebook = "Facebook";
        public const string QQ = "QQ";
        public const string Zalo = "Zalo";
        private const string DefaultRegexValue = "^.*";

        public static readonly IReadOnlyDictionary<string, string> FirsAppContactList = new Dictionary<string, string>
        {
            [SystemLanguage.EnglishLanguageCode] = Telegram,
            [SystemLanguage.BangladeshLanguageCode] = Telegram,
            [SystemLanguage.IndiaLanguageCode] = Telegram,
            [SystemLanguage.IndonesiaLanguageCode] = Telegram,
            [SystemLanguage.MalayLanguageCode] = Telegram,
            [SystemLanguage.ThailandLanguageCode] = Telegram,
            [SystemLanguage.VietNamLanguageCode] = Telegram,
            [SystemLanguage.ChineseLanguageCode] = Telegram,

            [SystemLanguage.PhilippinesLanguageCode] = Telegram,
            [SystemLanguage.TaiwanLanguageCode] = Telegram,
            [SystemLanguage.JapanLanguageCode] = Telegram,
            [SystemLanguage.CambodianLanguageCode] = Telegram,
            [SystemLanguage.KoreaLanguageCode] = Telegram,
        };

        public static readonly IReadOnlyDictionary<string, string> SecondAppContactList = new Dictionary<string, string>
        {
            [SystemLanguage.EnglishLanguageCode] = Facebook,
            [SystemLanguage.BangladeshLanguageCode] = WhatsApp,
            [SystemLanguage.IndiaLanguageCode] = WhatsApp,
            [SystemLanguage.IndonesiaLanguageCode] = WhatsApp,
            [SystemLanguage.MalayLanguageCode] = Facebook,
            [SystemLanguage.ThailandLanguageCode] = Line,
            [SystemLanguage.VietNamLanguageCode] = Zalo,
            [SystemLanguage.ChineseLanguageCode] = QQ,

            [SystemLanguage.PhilippinesLanguageCode] = Facebook,
            [SystemLanguage.TaiwanLanguageCode] = QQ,
            [SystemLanguage.JapanLanguageCode] = Facebook,
            [SystemLanguage.CambodianLanguageCode] = Facebook,
            [SystemLanguage.KoreaLanguageCode] = Facebook,
        };

        public static readonly IReadOnlyDictionary<string, string> ThirdAppContactList = new Dictionary<string, string>
        {
        };

        private static readonly IReadOnlyDictionary<string, string> RegexValidations = new Dictionary<string, string>
        {
            [Telegram] = @"^(?!\s*$)(@.+)$",
        };

        private static readonly IReadOnlyDictionary<string, string> PlaceHolders = new Dictionary<string, string>
        {
            [Telegram] = "@xxxxxxxx",
        };

        public static string GetRegexByApp(string contactAppName)
        {
            if (string.IsNullOrEmpty(contactAppName))
            {
                return DefaultRegexValue;
            }
            return GetValueDicByAppName(RegexValidations, contactAppName);
        }

        public static string GetPlaceHolderByApp(string contactAppName)
        {
            if (string.IsNullOrEmpty(contactAppName))
            {
                return string.Empty;
            }
            return GetValueDicByAppName(PlaceHolders, contactAppName);
        }

        private static string GetValueDicByAppName(
            IReadOnlyDictionary<string, string> dictionary,
            string contactAppName,
            string defaultValue = "")
        {
            if (dictionary.TryGetValue(contactAppName, out var value))
            {
                return value;
            }

            return defaultValue;
        }
    }
}

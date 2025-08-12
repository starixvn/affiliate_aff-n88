using System.Collections.Generic;

namespace Fanex.Affiliate.Link.Constants
{
    public static class MappingDomainControl
    {
        public static readonly IReadOnlyDictionary<string, Dictionary<string, string>> SettingMapping = new Dictionary<string, Dictionary<string, string>>
        {
            ["Nova88"] = new Dictionary<string, string>
            {
                { "en_go.nova8801.net", "https://www.nova8801.net" },
                { "en_go.nova88101.net", "https://www.nova88101.net" },
                { "en_go.nova88bkk.com", "https://www.nova88bkk.com" },
                { "en_go.nova88bkk101.com", "https://www.nova88bkk101.com" },
                { "en_go.nova88bkk105.com", "https://www.nova88bkk105.com" },
                { "en_go.nova88india.com", "https://www.nova88india.com" },
                { "en_go.nova88india101.com", "https://www.nova88india101.com" },
                { "en_go.nova88-indo103.info", "https://www.nova88-indo103.info" },
                { "en_go.nova88mas105.com", "https://www.nova88mas105.com" },

                { "hi_go.nova88india.com", "https://www.nova88india.com" },
                { "hi_go.nova88india101.com", "https://www.nova88india101.com" },

                { "id_go.nova88-indo103.info", "https://www.nova88-indo103.info" },

                { "ms_go.nova88101.net", "https://www.nova88101.net" },

                { "th_go.nova88.net", "https://www.nova88gol.com" }, //
                { "th_go.nova88apple.com", "https://www.nova88apple.com" }, //
                { "th_go.nova88bkk.com", "https://www.nova88bkk.com" },
                { "th_go.nova88bkk103.com", "https://www.nova88bkk103.com" }, //
                { "th_go.nova88bkk105.com", "https://www.nova88bkk105.com" },

                { "vn_go.nova88mas105.com", "https://www.nova88mas105.com" },

                { "cs_go.nova88101.net", "https://www.nova88101.net" },
                { "cs_go.nova88bkk.com", "https://www.nova88bkk.com" },

                { "en_aff-b2c.nexdev.net/n88go2", "https://www.nova88bkk.com" },
                { "hi_aff-b2c.nexdev.net/n88go2", "https://www.nova88bkk.com" },
                { "id_aff-b2c.nexdev.net/n88go2", "https://www.nova88bkk.com" },
                { "en_localhost:51957", "https://www.nova88bkk.com" },
            },
            ["Bwing"] = new Dictionary<string, string>
            {
                { "en_go.bomtanhoitu.live", "https://www.bomtanhoitu.live" },
                { "vn_go.bomtanhoitu.live", "https://www.bomtanhoitu.live" },

                { "vn_aff-b2c.nexdev.net/n88go", "https://www.bwing.com" },
            },
            ["Goal123"] = new Dictionary<string, string>
            {
                { "en_go.duongdenkhungthanh.com", "https://www.duongdenkhungthanh.com" },
                { "vn_go.duongdenkhungthanh.com", "https://www.duongdenkhungthanh.com" },

                { "vn_aff-b2c.nexdev.net/n88go1", "https://www.goal123.com" },
            },
        };
    }
}
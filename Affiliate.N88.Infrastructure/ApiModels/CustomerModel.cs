using System;
using System.Collections.Generic;
using System.Text;

namespace Affiliate.N88.ApiModels
{
    public class CustomerModel
    {
        public int SiteId { get; set; }
        public string SiteName { get; set; }
        public int CustId { get; set; }
        public string UserName { get; set; }
        public int CurrencyId { get; set; }
        public int ActStatus { get; set; }
        public int AgentId { get; set; }
        public string AllAgentId { get; set; }
        public DateTime RegTime { get; set; }
        public bool Status { get; set; }
    }
}

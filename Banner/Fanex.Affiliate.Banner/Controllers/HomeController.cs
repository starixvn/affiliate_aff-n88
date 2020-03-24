namespace Affiliate.Banner
{
    using System;
    using System.Collections;
    using System.Configuration;
    using System.Web;
    using System.Web.Mvc;
    using Fanex.Data;
    using System.Text;

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult MediaScript(int textId, int targetId = 1)
        {
            var content = System.IO.File.ReadAllText(Server.MapPath("~/Scripts/affiliate.text.js"));
            content = content.Replace("{requesttime}", ConfigurationManager.AppSettings["RequestTime"]);
            content = content.Replace("{url}", ConfigurationManager.AppSettings["BannerUrl"]);
            content = content.Replace("{affid}", textId.ToString()).Replace("{targetId}", targetId.ToString());

            return JavaScript(content);
        }

        public ActionResult MediaText(int textId, int targetId)
        {
            var encodedMessage = GetMessageContent(textId, targetId);
            var message = HttpUtility.HtmlDecode(encodedMessage);
            return JavaScript("document.getElementById('_affMediaText').innerHTML ='" + message.Replace("\r\n", "<br/>").Replace("\n", "<br/>") + "';");
        }

        public ActionResult Error()
        {
            return View();
        }

        private static string GetMessageContent(int textId, int targetId = 1)
        {
            using (var objectDb = new ObjectDb("Aff_Admin_Text_Sel"))
            {
                var param = new Hashtable()
                {
                    { "textid", textId },
                    { "targetId", targetId }
                };
                var reader = objectDb.ExecuteReader(param);
                if (reader.Read())
                {
                    var message = reader["Message"];
                    return message == DBNull.Value ? string.Empty : message.ToString();
                }

                return string.Empty;
            }
        }
    }
}

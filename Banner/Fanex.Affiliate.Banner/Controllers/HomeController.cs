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

        public ActionResult MediaScript(int textId)
        {
            var content = System.IO.File.ReadAllText(Server.MapPath("~/Scripts/affiliate.text.js"));
            content = content.Replace("{requesttime}", ConfigurationManager.AppSettings["RequestTime"]);
            content = content.Replace("{url}", ConfigurationManager.AppSettings["BannerUrl"]);
            content = content.Replace("{affid}", textId.ToString());

            return JavaScript(content);
        }

        public ActionResult MediaText(int textId)
        {
            var encodedMessage = GetMessageContent(textId);
            var message = HttpUtility.HtmlDecode(encodedMessage);
            return JavaScript("document.getElementById('_affMediaText').innerHTML ='" + message.Replace("\r\n", "<br/>").Replace("\n", "<br/>") + "';");
        }

        public ActionResult Error()
        {
            return View();
        }

        private static string GetMessageContent(int textId)
        {
            using (var objectDb = new ObjectDb("Aff_TextSelDetail"))
            {
                var param = new Hashtable()
                {
                    { "textid", textId }
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

using System.IO;
using System.Web;
using System.Web.SessionState;

namespace Fanex.Affiliate.Admin.Core.UnitTests.Common
{
    public static class MockSession
    {
        public static void SetUpHttpContextSession()
        {
            var request = new HttpRequest(null, "https://affiliate.nova88.net", null);
            var respone = new HttpResponse(new StringWriter());
            HttpContext.Current = new HttpContext(request, respone);
            var sessionContainer = new HttpSessionStateContainer("id", new SessionStateItemCollection(), new HttpStaticObjectsCollection(), 10, true, HttpCookieMode.AutoDetect, SessionStateMode.InProc, false);
            SessionStateUtility.AddHttpSessionStateToContext(HttpContext.Current, sessionContainer);
        }
    }
}

namespace Fanex.Affiliate.User.Core.Controllers
{
    using System.Linq;
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using Filters;
    using MetalModels.UserPanel;
    using Utilities;
    using ViewModels.UserPanel;

    [CustomAuthorize]
    public class NewsController : BaseController
    {
        private readonly IAppSetting _appSetting;
        private readonly INewsService _newsService;

        public NewsController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService,
            IIpLocationService ipLocationService,
            INewsService newsService) 
            : base(sessionService, languageService, ipLocationService)
        {
            _appSetting = appSetting;
            _newsService = newsService;
        }

        [HttpGet]
        public ActionResult MessageHistory()
        {
            var param = new MessageHistoryParam
            {
                IsInternal = SessionService.IsInternal,
                Important = null,
                Language = SessionService.CurrentLanguage
            };

            var messageList = _newsService.GetMessageList(param);
            var viewModel = new MessageHistoryViewModel
            {
                MessageList = messageList,
                TotalItems = param.Nrows
            };

            ViewBag.StartRowNumber = 1;

            var viewPath = PathHelper.GetViewPath("News", "MessageHistory", _appSetting.SiteName);
            return View(viewPath, viewModel);
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult GetMessageHistory(MessageHistoryParam param)
        {
            param.IsInternal = SessionService.IsInternal;
            param.Language = SessionService.CurrentLanguage;

            var messageList = _newsService.GetMessageList(param);
            var viewModel = new MessageHistoryViewModel
            {
                MessageList = messageList,
                TotalItems = param.Nrows
            };

            ViewBag.StartRowNumber = (param.PageIndex - 1) * param.PageSize + 1;

            var viewPath = PathHelper.GetViewPath("News", "_MessageContent", _appSetting.SiteName);
            return PartialView(viewPath, viewModel);
        }

        [HttpGet]
        [AllowAnonymous]
        [AjaxOnly]
        public ActionResult LatestHotNews()
        {
            var userSession = SessionService.UserSession;
            var isInternal = (userSession != null) && SessionService.IsInternal;

            var hotNews = _newsService.GetLatestHotNews(isInternal);
            var preferredLanguage = SessionService.CurrentLanguage;
            var viewModel = new LatestHotNewViewModel();
            if (hotNews != null)
            {
                var hotNewsList = hotNews.HotNewsList;

                viewModel = new LatestHotNewViewModel
                {
                    IsImportant = hotNews.IsImportant,
                    IsAuthenticated = HttpContext.User.Identity.IsAuthenticated && SessionService.UserSession != null
                };

                if (hotNewsList != null && hotNewsList.Any())
                {
                    viewModel.SelectedHotNews = hotNewsList.ContainsKey(preferredLanguage) ?
                                        hotNewsList[preferredLanguage] :
                                        hotNewsList.First().Value;
                }
            }

            return PartialView("~/Views/News/_LatestHotNews.cshtml", viewModel);
        }
    }
}

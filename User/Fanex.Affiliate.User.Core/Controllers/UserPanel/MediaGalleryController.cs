namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Mvc.Html;
    using Fanex.Affiliate.User.Core.BusinessService;
    using Fanex.Affiliate.User.Core.CoreService;
    using Fanex.Affiliate.User.Core.Enum;
    using Fanex.Affiliate.User.Core.Resources;
    using Fanex.Affiliate.User.Core.Utilities;
    using Filters;
    using MetalModels.UserPanel;
    using ViewModels.UserPanel.Marketing;

    public class MediaGalleryController : BaseMarketingController
    {
        public MediaGalleryController(ISessionService sessionService, IAppSetting appSetting,
            ILanguageService languageService,
            IMarketingService marketingService) :
            base(sessionService, appSetting, languageService, marketingService)
        {
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult Index()
        {
            var searchFormVM = GetSearchFormViewModel();
            return View("~/Views/UserPanel/AccountOverview/MediaGallery/Index.cshtml", searchFormVM);
        }


        private MediaGallerySearchFormViewModel GetSearchFormViewModel()
        {
            var userSession = SessionService.UserSession;

            var channels = MarketingService.GetChannels(SessionService.UserSession.AffId);
            var categoryList = Enum.GetValues(typeof(AffiliateLinkType)).Cast<int>()
                .ToDictionary(t => t.ToString(), t => GetMediaMainCategory((AffiliateLinkType)t));
            var languageList = LanguageService.GetLanguageList(SessionService.IsInternal);
            var currencyList = MarketingService.GetCurrencyList(SessionService.IsInternal)
                .Select(i => new SelectListItem
                {
                    Value = i.Currency,
                    Text = Lang.ResourceManager.GetString(i.Currency.Trim()) ?? i.Currency
                });


            var sizeParam = new SizeParam
            {
                AffType = userSession.AffType,
                Language = userSession.PreferredLanguage
            };
            var sizeList = MarketingService.GetSizeList(sizeParam, SessionService.IsInternal)
                .Select(i => new SelectListItem { Value = i.Size, Text = i.Size });

            var refs = new List<RefLinkViewModel>
            {
                GetAffLinkTypeViewModel(),
                GetSubAffLinkTypeViewModel()
            };

            return new MediaGallerySearchFormViewModel
            {
                CategoryList = categoryList,
                Channels = channels,
                CurrencyList = currencyList,
                DeviceList = EnumHelper.GetSelectList(typeof(DeviceType)),
                Languages = languageList,
                RefLinks = refs,
                SizeList = sizeList
            };
        }

        private IEnumerable<SelectListItem> GetMediaMainCategory(AffiliateLinkType type)
            => MarketingService.GetCategoryList(true, type, SessionService.IsInternal)
            .Where(c => string.IsNullOrEmpty(c.SubCategory))
            .Select(c => new SelectListItem
            {
                Value = c.Category,
                Text = Lang.ResourceManager.GetString(c.Category.Trim()) ?? c.Category
            });
    }
}
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web.Mvc;
using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.Filters;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.Resources;
using Fanex.Affiliate.User.Core.Utilities;
using Fanex.Affiliate.User.Core.ViewModels.UserPanel.Marketing;

namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    [CustomAuthorize]
    public class BaseMarketingController : BaseController
    {
        protected readonly IMarketingService MarketingService;
        protected readonly IAppSetting AppSetting;

        public BaseMarketingController(ISessionService sessionService,
            IAppSetting appSetting,
            ILanguageService languageService,
            IMarketingService marketingService)
            : base(sessionService, languageService)
        {
            MarketingService = marketingService;
            AppSetting = appSetting;
        }
        protected SearchFormViewModel GetSearchFormViewModel(bool isMediaPage, int targetId = TargetSite.TargetToMember)
        {
            var categoryList = MarketingService.GetCategoryList(isMediaPage, targetId, SessionService.IsInternal).Where(c => string.IsNullOrEmpty(c.SubCategory));
            var languageList = MarketingService.GetLanguageList(SessionService.IsInternal);

            var userSession = SessionService.UserSession;
            var viewModel = new SearchFormViewModel
            {
                CategoryList = categoryList.Select(i => new SelectListItem { Value = i.Category, Text = Lang.ResourceManager.GetString(i.Category.Trim()) ?? i.Category }),
                LanguageList = MarketingHelper.GetLanguageList(languageList, userSession.PreferredLanguage),
                TargetId = targetId
            };

            if (targetId == TargetSite.TargetToMember)
            {
                var currencyList = MarketingService.GetCurrencyList(SessionService.IsInternal);
                viewModel.CurrencyList = currencyList
                    .Select(i => new SelectListItem 
                    { 
                        Value = i.Currency, 
                        Text = Lang.ResourceManager.GetString(i.Currency.Trim()) ?? i.Currency 
                    });              
            }

            if (isMediaPage)
            {
                var sizeList = MarketingService.GetSizeList(new SizeParam 
                { 
                    AffType = userSession.AffType, 
                    Language = userSession.PreferredLanguage 
                }, 
                SessionService.IsInternal);

                viewModel.SizeList = sizeList.Select(i => new SelectListItem { Value = i.Size, Text = i.Size });
            }

            return viewModel;
        }

        protected LinkFormViewModel GetLinkFormViewModel(bool isTargetToMemberSite = true)
        {
            var userSession = SessionService.UserSession;
            var isInternal = SessionService.IsInternal;
            var targetId = isTargetToMemberSite ? TargetSite.TargetToMember : TargetSite.TargetToSubAff;

            var viewModel = new LinkFormViewModel
            {
                DomainList = MarketingService.GetDomainList(userSession.AffId, targetId, isInternal),
                MemberSitePageList = MarketingService.GetLandingPageList(isInternal, isTargetToMemberSite)
            };

            return viewModel;
        }

        protected IDictionary<string, string> GetTextLinkList(string selectedLanguage, string selectedPage,
            Domain selectedDomain, IEnumerable<SelectListItem> languageList)
        {
            if (selectedDomain == null)
            {
                return new Dictionary<string, string>();
            }

            var userSession = SessionService.UserSession;

            var linkGenerationParam = new LinkGenerationParam
            {
                AffId = userSession.AffId,
                TextLinkTemplate = AppSetting.TextLinkTemplate,
                PreferredLanguage = userSession.PreferredLanguage,
                SelectedLanguage = selectedLanguage,
                SelectedDomain = selectedDomain,
                SelectedPage = selectedPage,
                LanguageList = languageList,            
            };

            return MarketingService.GenerateLinkList(linkGenerationParam);
        }

        protected IDictionary<string, string> GetAffLinks(string selectedLanguage, string selectedPage,
            Domain selectedDomain, IEnumerable<SelectListItem> languageList)
        {
            if (selectedDomain == null)
            {
                return new Dictionary<string, string>();
            }

            var userSession = SessionService.UserSession;

            var linkGenerationParam = new LinkGenerationParam
            {
                AffId = userSession.AffId,
                TextLinkTemplate = AppSetting.SubAffTextLinkTemplate,
                PreferredLanguage = userSession.PreferredLanguage,
                SelectedLanguage = selectedLanguage,
                SelectedDomain = selectedDomain,
                SelectedPage = selectedPage,
                LanguageList = languageList
            };

            return MarketingService.GenerateLinkList(linkGenerationParam);
        }

    }
}

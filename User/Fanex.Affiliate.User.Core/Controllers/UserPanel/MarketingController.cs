namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Constants;
    using DTO.UserPanel;
    using Extensions;
    using Fanex.Affiliate.User.Core.Resources;
    using Fanex.Affiliate.User.Core.BusinessService;
    using Fanex.Affiliate.User.Core.CoreService;
    using Fanex.Affiliate.User.Core.Utilities;
    using Filters;
    using MetalModels.UserPanel;
    using System.Drawing;
    using ViewModels.UserPanel.Marketing;
    using System;

    [CustomAuthorize]
    public class MarketingController : BaseMarketingController
    {

        private readonly IQrCodeGeneratorService _qrCodeGeneratorService;

        public MarketingController(ISessionService sessionService, IAppSetting appSetting,
            ILanguageService languageService,
            IMarketingService marketingService,
            IQrCodeGeneratorService QrCodeGeneratorService) : base(sessionService, appSetting, languageService, marketingService)
        {
            _qrCodeGeneratorService = QrCodeGeneratorService;
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult Index(bool isTargetToMemberSite = true)
        {
            var userSession = SessionService.UserSession;
            var linkForm = GetLinkFormViewModel(isTargetToMemberSite);
            var languageList = MarketingService.GetLanguageList(SessionService.IsInternal);

            var selectedLanguage = userSession.PreferredLanguage;
            var selectedDomain = linkForm.DomainList.FirstOrDefault();
            var selectedPage = linkForm.MemberSitePageList.FirstOrDefault()?.PageCode ?? string.Empty;
            var selectedLanguageList = MarketingHelper.GetLanguageList(languageList, SessionService.UserSession.PreferredLanguage);

            var linkList = isTargetToMemberSite 
                ? GetTextLinkList(selectedLanguage, selectedPage, selectedDomain, selectedLanguageList)
                : GetAffLinks(selectedLanguage, selectedPage, selectedDomain, selectedLanguageList);

            var qrCodes = GetQrCodes(linkList, true);

            var marketingViewModel = new MarketingViewModel
            {
                QrCodeList = qrCodes,
                LinkForm = linkForm
            };
            ViewBag.IsTargetToMemberSite = isTargetToMemberSite;
            ViewBag.SelectedDomainId = selectedDomain?.DomainId;
            ViewBag.SeletedPage = selectedPage;

            return View("~/Views/UserPanel/AccountOverview/Partial/_GeneratedQrCode.cshtml", marketingViewModel);
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult GetSubCategory(string category, int targetId = TargetSite.TargetToMember)
        {
            var subCategoryList = MarketingService.GetCategoryList(true, targetId, SessionService.IsInternal)
                .Where(c => c.Category.MatchWith(category) && !string.IsNullOrEmpty(c.SubCategory));

            return Json(subCategoryList.Select(i => new SelectListItem 
                { 
                    Value = i.SubCategory, 
                    Text = Lang.ResourceManager.GetString(i.SubCategory.Trim()) ?? i.SubCategory 
                }),
                JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult GetSize(SizeParam param)
        {
            param.AffType = SessionService.UserSession.AffType;
            param.Language = SystemLanguage.LanguageList.FirstOrDefault(l => l.Code.MatchWith(param.Language))?.EnglishName;
            var sizeList = MarketingService.GetSizeList(param, SessionService.IsInternal);

            return Json(sizeList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult GetBanner(MarketingBannerParam bannerParam)
        {
            var userSession = SessionService.UserSession;
            var selectedDomain = MarketingService.GetDomainList(userSession.AffId, bannerParam.TargetId, SessionService.IsInternal)
                                                    .FirstOrDefault(d => d.DomainId == bannerParam.SelectedDomainId);

            var bannerSettingKey = userSession.PreferredLanguage.Replace("-", string.Empty).ToUpperInvariant();

            bannerParam.AffId = userSession.AffId;
            bannerParam.AffType = userSession.AffType;
            bannerParam.SelectedDomain = selectedDomain;
            bannerParam.TextLinkTemplate = MarketingService.GetTextLinkTemplate(bannerParam.TargetId);
            bannerParam.BannerDomain = AppSetting.GetValue($"BannerDomain{bannerSettingKey}") ??
                AppSetting.BannerDomain;
            bannerParam.Language = SystemLanguage.LanguageList.FirstOrDefault(l => l.Code.MatchWith(bannerParam.Language))?.EnglishName;

            var bannerList = GetBannerList(bannerParam);
            ViewBag.TotalItem = bannerParam.Nrows;

            return View("~/Views/UserPanel/AccountOverview/Partial/_BannerList.cshtml", bannerList);
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult GetText(MarketingTextParam textParam)
        {
            var userSession = SessionService.UserSession;
            var selectedDomain = MarketingService.GetDomainList(userSession.AffId, textParam.TargetId, SessionService.IsInternal)
                                                    .FirstOrDefault(d => d.DomainId == textParam.SelectedDomainId);

            textParam.AffId = userSession.AffId;
            textParam.SelectedDomain = selectedDomain;
            textParam.TextLinkTemplate = MarketingService.GetTextLinkTemplate(textParam.TargetId);
            textParam.ScriptUrl = AppSetting.MediaScriptUrl;
            textParam.Language = SystemLanguage.LanguageList.FirstOrDefault(l => l.Code.MatchWith(textParam.Language))?.EnglishName;

            var textList = GetTextList(textParam);
            ViewBag.TotalItem = textParam.Nrows;

            return View("~/Views/UserPanel/AccountOverview/Partial/_TextList.cshtml", textList);
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult GenerateLink(QrCodeParam param)
        {
            IDictionary<string, QrCodeLinkViewModel> result = new Dictionary<string, QrCodeLinkViewModel>();

            if (param.SelectedDomainId != null)
            {
                result = GenerateQrCodeViewModel(param);
            }

            ViewBag.SelectedDomainId = param.SelectedDomainId;
            ViewBag.SelectedPage = param.SelectedPage;

            return View("~/Views/UserPanel/AccountOverview/Partial/_TextLink.cshtml", result);
        }

        [HttpGet]
        public ActionResult DownloadQrCode(QrCodeParam param)
        {
            var qrCodes = GenerateQrCodeViewModel(param, false);
            if (qrCodes.Count == 0)
            {
                return HttpNotFound();
            }
            var qrCode = qrCodes.First();
            var imageFile = Convert.FromBase64String(qrCode.Value.QrCode);
            return File(imageFile, "image/png", $"{param.SelectedLanguage}.png");
        }

        private IEnumerable<MarketingItem> GetBannerList(MarketingBannerParam bannerParam)
        {
            if (bannerParam.SelectedDomain == null)
            {
                return new List<MarketingItem>();
            }
            return MarketingService.GetBannerList(bannerParam);
        }

        private IEnumerable<MarketingItem> GetTextList(MarketingTextParam textParam)
        {
            if (textParam.SelectedDomain == null)
            {
                return new List<MarketingItem>();
            }

            return MarketingService.GetTextList(textParam);
        }

        private IDictionary<string, QrCodeLinkViewModel> GenerateQrCodeViewModel(QrCodeParam param, bool includePrefix = true)
        {
            var selectedLanguage = param.SelectedLanguage;
            var selectedDomainId = param.SelectedDomainId;
            var targetId = param.TargetId;
            var selectedPage = param.SelectedPage;

            IDictionary<string, QrCodeLinkViewModel> result;
            var userSession = SessionService.UserSession;
            var selectedDomain = MarketingService.GetDomainList(userSession.AffId, targetId, SessionService.IsInternal)
                                                    .FirstOrDefault(d => d.DomainId == selectedDomainId);
            var languageList = string.IsNullOrEmpty(selectedLanguage) ?
                MarketingHelper.GetLanguageList(MarketingService.GetLanguageList(SessionService.IsInternal), userSession.PreferredLanguage) : null;

            var textLinkList = targetId == TargetSite.TargetToMember
                ? GetTextLinkList(selectedLanguage, selectedPage, selectedDomain, languageList)
                : GetAffLinks(selectedLanguage, selectedPage, selectedDomain, languageList);

            result = GetQrCodes(textLinkList, includePrefix);
            return result;
        }

        private IDictionary<string, QrCodeLinkViewModel> GetQrCodes(IDictionary<string, LanguageLinkViewModel> txtLinkList, bool includePrefix)
        {
            var qrCodeLinks = txtLinkList.Select(link => GetQrCodeParam(link, includePrefix));
            return qrCodeLinks.ToDictionary(itm => itm.DisplayName);
        }

        private QrCodeLinkViewModel GetQrCodeParam(KeyValuePair<string, LanguageLinkViewModel> link, bool includePrefix)
        {
            var icon = GetQrCodeIcon();
            var language = link.Value.Language;
            var textLink = link.Value.Link;
            var qrCode = _qrCodeGeneratorService.GenerateBase64QrCode(textLink, icon, includePrefix);
            return new QrCodeLinkViewModel
            {
                Language = language,
                Link = textLink,
                QrCode = qrCode,
                DisplayName = link.Key
            };
        }

        private Image GetQrCodeIcon()
        {
            var path = HttpContext.Server.MapPath($"~/www/build/styles/Images/themes/{AppSetting.SiteName}.png");
            var img = new Bitmap(path);
            return img;
        }
    }
}
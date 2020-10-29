namespace Fanex.Affiliate.User.Core.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Mvc;
    using BusinessService;
    using CoreService;
    using DTO;
    using MetalModels;
    using MetalModels.Email;
    using Newtonsoft.Json;
    using Resources;
    using Utilities;

    public class SignupController : BaseController
    {
        private readonly IAccountService _accountService;
        private readonly IAppSetting _appSetting;
        private readonly ICaptchaService _captchaService;
        private readonly ISecurityQuestionService _securityQuestionService;
        private const string ParentCodeCookieName = "Fanex.UserSite.RefCode";
        private const int CookieTimeOut = 6;

        public SignupController(
            ISessionService sessionService,
            IAppSetting appSetting,
            IAccountService accountService,
            ILanguageService languageService,
            ICaptchaService captchaService,
            ISecurityQuestionService securityQuestionService) : base(sessionService, languageService)
        {
            _accountService = accountService;
            _captchaService = captchaService;
            _appSetting = appSetting;
            _securityQuestionService = securityQuestionService;
        }

        [HttpGet]
        public ActionResult Index(string refId = null, string refCode = null)
        {
            if(!string.IsNullOrEmpty(refId))
            {
                bool isParsableId = int.TryParse(refId, out int parentAffId);

                if (isParsableId)
                {
                    var affCode = _accountService.GetAffCodeByAffId(parentAffId);

                    refCode = affCode.ToString();
                }
            }

            if((string.IsNullOrEmpty(refCode)) || string.Equals(refCode, "index", StringComparison.CurrentCultureIgnoreCase))
            {
                return View(new UserSignUpParam { IsValidParentCode = true });
            }

            bool isParsable = int.TryParse(refCode, out int parentAffCode);

            var vm = new UserSignUpParam
            {
                ParentAffCode = parentAffCode
            };

            if (isParsable)
            {
                var result = _accountService.GetLevelAffiliate(parentAffCode);

                if (result.IsValidAff)
                {
                    vm.IsValidParentCode = result.IsValidAff;

                    var cookie = new HttpCookie(ParentCodeCookieName)
                    {
                        HttpOnly = true,
                        Expires = DateTime.Now.AddHours(CookieTimeOut),
                        Value = vm.ParentAffCode.ToString(),
                    };

                    HttpContext.Response.Cookies.Add(cookie);
                }
            }

            return View(vm);
        }

        [HttpGet]
        [ChildActionOnly]
        public ActionResult SecurityQuestion()
        {
            var model = _securityQuestionService.GetSecurityQuestions(SessionService.CurrentLanguage);

            return PartialView("~/Views/Signup/_SecurityQuestion.cshtml", model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Index(UserSignUpParam param)
        {
            var result = new ResultInfo { IsOk = false };
            var refId = HttpContext.Request.Cookies[ParentCodeCookieName]?.Value;
            if (!_captchaService.IsValid(param.Captcha, SessionService.SignUpCaptchaCode, Request.UserHostAddress))
            {
                result.Message = Lang.ValidationCode;
            }
            else if (!IsValidAppContactList(param.ContactAppList))
            {
                result.Message = Error.RequireIMAccount;
            }
            else if (ModelState.IsValid)
            {
                var signUpParam = new UserSignUpParam
                {
                    FirstName = Server.HtmlEncode(param.FirstName),
                    LastName = Server.HtmlEncode(param.LastName),
                    Email = Server.HtmlEncode(param.Email),
                    Phone = Server.HtmlEncode(param.Phone),
                    Address = Server.HtmlEncode(param.Address),
                    City = Server.HtmlEncode(param.City),
                    Postal = Server.HtmlEncode(param.Postal),
                    Country = Server.HtmlEncode(param.Country),
                    SiteUrl = Server.HtmlEncode(param.SiteUrl),
                    MoreSiteUrls = Server.HtmlEncode(param.MoreSiteUrls),
                    NoSiteDesc = Server.HtmlEncode(param.NoSiteDesc),
                    PreferredLanguage = Server.HtmlEncode(param.PreferredLanguage),
                    QuestionId = param.QuestionId,
                    Answer = Server.HtmlEncode(param.Answer),
                    Player_UserName = Server.HtmlEncode(param.Player_UserName),
                    ContactApps = JsonConvert.SerializeObject(param.ContactAppList.Select(p => new ContactApp
                    {
                        Name = Server.HtmlEncode(p.Name),
                        Value = Server.HtmlEncode(p.Value),
                        Order = p.Order
                    })),
                    Gender = param.Gender,
                    State = Server.HtmlEncode(param.State),
                    Language = SessionService.CurrentLanguage,
                    AffType = _appSetting.AllowedAffiliateTypes.FirstOrDefault(),
                    Ip = Request.UserHostAddress,
                    IsLocal = _appSetting.IsLocal,
                    ParentAffCode = string.IsNullOrWhiteSpace(refId) ? param.ParentAffCode : Convert.ToInt32(refId)
                };

                var mailContact = _appSetting.GetMailContactByLanguageCode(signUpParam.PreferredLanguage ?? SessionService.CurrentLanguage);
                var emailParam = new EmailBaseParam
                {
                    MailCc = _appSetting.MailCc,
                    MailContact = mailContact,
                    SiteFriendlyName = _appSetting.SiteFriendlyName,
                    MailBcc = _appSetting.MailBcc,
                    RootDomain = SiteDomainHelper.GetRootUrl(this, _appSetting),
                    MailTo = mailContact
                };

                result = await _accountService.CreateAffiliate(signUpParam, emailParam);
            }
            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                result.Message = string.Join("<br>", errors);
            }

            return Json(result);
        }

        private static bool IsValidAppContactList(IEnumerable<ContactApp> contactAppList)
        {
            return contactAppList != null && !contactAppList.All(c => string.IsNullOrEmpty(c.Value));
        }
    }
}
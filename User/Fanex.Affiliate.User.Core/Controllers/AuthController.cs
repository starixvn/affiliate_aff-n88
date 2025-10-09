namespace Fanex.Affiliate.User.Core.Controllers
{
    using System;
    using System.Web.Mvc;
    using System.Web.UI;
    using BusinessService;
    using Constants;
    using CoreService;
    using DTO;
    using DTO.VerificationAccount;
    using Extensions;
    using Filters;
    using MetalModels;
    using Repository.UserPanel;
    using Resources;
    using Utilities;
    using ViewModels;

    public class AuthController : AuthBaseController
    {
        private const int CaptchaImgWidth = 65;
        private const int CaptchaImgHeight = 26;

        private const string DefaultCountryShort = "-";

        public AuthController(
            ISessionService sessionService,
            IAppSetting appSetting,
            ILanguageService languageService,
            IAuthService authService,
            ICaptchaService captchaService,
            IAccountRepository accountRepository,
            IIpLocationService ipLocationService)
            : base(
                sessionService,
                languageService,
                appSetting,
                captchaService,
                authService,
                ipLocationService,
                accountRepository
                )
        {
        }

        [ChildActionOnly]
        [HttpGet]
        [AllowAnonymous]
        public ActionResult AuthenticationForm()
        {
            var viewModel = new AuthenticationFormViewModel
            {
                IsAuthenticated = User.Identity.IsAuthenticated && SessionService.UserSession != null
            };

            if (viewModel.IsAuthenticated)
            {
                viewModel.UserName = SessionService.UserSession.UserName;
            }
            else
            {
                viewModel.PublicKey = AppSetting.RsaPublicKey;
            }

            var viewPath = PathHelper.GetViewPath("Auth", "AuthenticationForm", AppSetting.SiteName);
            return View(viewPath, viewModel);
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        [AllowAnonymous]
        public ActionResult SignIn([Bind(Include = "LoginInfo,ValidationKey")] UserLoginParam userParam)
        {
            if (SessionService.VerificationSession != null)
            {
                return Json(new LoginResultInfo { IsOk = false, ShouldVerifyAccount = true });
            }

            var requestValidation = ValidateLoginRequest(userParam.ValidationKey, SessionService.CaptchaCode);
            if (!requestValidation.IsOk)
            {
                return Json(requestValidation);
            }

            var clientIp = Request.GetClientIP();
            userParam.LoginIp = clientIp;
            userParam.Language = SessionService.CurrentLanguage;
            userParam.UserAgent = Request.UserAgent;
            userParam.IsVerifyingAccount = false;
            userParam.LoginInfo = Uri.UnescapeDataString(userParam.LoginInfo);
            var loginResult = AuthService.GetLoginResult(userParam, false);

            if (loginResult.Result.ShouldVerifyAccount)
            {
                SessionService.VerificationSession = new VerificationSession { AffId = loginResult.UserInfo.AffId, PreferredLanguage = loginResult.UserInfo.PreferredLanguage };
                return Json(loginResult.Result);
            }

            var userInfo = loginResult.UserInfo;
            var countryCode = IpLocationService.GetCountryFromIp(clientIp).CountrySHORT;

            if (userInfo != null)
            {
                if (IsInvalidCountryAccess(userInfo.TargetCountryCode, countryCode, AppSetting.SiteName))
                {
                    return Json(GetErrorResult(Lang.NotAllowOnCountry));
                }

                if (!IsValidAffiliateType(userInfo.AffType))
                {
                    return Json(GetErrorResult(Lang.NotAllowOnDomain));
                }

                if (loginResult.Result.IsOk)
                {
                    AssignLoginInfoAndSetAuth(userInfo, userParam.LoginIp);
                }
            }

            return Json(loginResult.Result);
        }

        [HttpGet]
        public ActionResult SignOut()
        {
            DoSignOut();

            return Redirect("~/Home");
        }

        [HttpGet]
        [SkipIpRestriction]
        public ActionResult AdminLogin(InternalLoginParam loginParam)
        {
            if (ModelState.IsValid)
            {
                var adminSessionId = AuthService.GetSessionId(loginParam.AccOnId);
                var hashedPassword = Generator.GenerateSHA512String(adminSessionId + loginParam.ChalengeStr);
                if (string.Equals(loginParam.AccKey, hashedPassword))
                {
                    var clientIpAddress = Request.GetClientIP();
                    var userLoginParam = new UserLoginParam
                    {
                        UserName = loginParam.CustName,
                        LoginIp = clientIpAddress,
                        Language = SessionService.CurrentLanguage,
                        UserAgent = Request.UserAgent,
                        IsVerifyingAccount = false
                    };

                    SessionService.IsInternal = true;
                    var loginResult = AuthService.GetLoginResult(userLoginParam, true);
                    var user = loginResult.UserInfo;

                    if (loginResult.Result.IsOk && user != null && IsValidAffiliateType(user.AffType))
                    {
                        var adminId = loginParam.AccId * -1;
                        AssignLoginInfoAndSetAuth(loginResult.UserInfo, clientIpAddress, adminId);
                    }
                    else
                    {
                        return Redirect(Url.Content("~/Notify/PageNotFound"));
                    }
                }
                else
                {
                    return Redirect(Url.Content("~/Notify/PageNotFound"));
                }
            }

            return Redirect(Url.Content("~/UserPanel/Main/#AccountOverView"));
        }

        [HttpGet]
        [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None)]
        [CustomAuthorize]
        public ActionResult ReCheckin()
        {
            var onUserId = SessionService.UserSession.OnUserId;
            var isKickOut = onUserId > 0 && AuthService.Recheckin(SessionService.UserSession.OnUserId,
                SessionService.IsInternal);

            if (isKickOut)
            {
                DoSignOut();
            }

            return Json(new
            {
                IsKickOut = isKickOut,
                Message = isKickOut ? Lang.Msgkickout : string.Empty
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None, VaryByParam = "*")]
        public ActionResult CaptchaImage(byte type = 0)
        {
            var captcha = CaptchaService.GenerateCaptcha();
            if (type == 0)
            {
                SessionService.CaptchaCode = captcha;
            }
            else
            {
                SessionService.SignUpCaptchaCode = captcha;
            }

            return File(CaptchaService.GenerateImageBuffer(captcha, CaptchaImgWidth, CaptchaImgHeight), "image/png");
        }

        private void DoSignOut()
        {
            Session.Clear();
            AuthService.SignOut();
        }

        private bool IsInvalidCountryAccess(string targetCountryCode, string countryShort, string siteName)
        {
            if (siteName != SiteName.N88)
            {
                return false; // only apply to N88 site
            }

            bool isCountryShortEmpty = string.IsNullOrEmpty(countryShort) || countryShort == DefaultCountryShort;
            bool isTargetCountrySpecial = SystemLanguage.SpecialCountry.ContainsKey(targetCountryCode);

            // Case 1: IP country not detected
            if (isCountryShortEmpty)
            {
                // Invalid only if target is special (restricted access)
                return isTargetCountrySpecial;
            }

            bool isCountryShortSpecial = SystemLanguage.SpecialCountry.ContainsKey(countryShort);

            // Case 2: IP country is special → only valid if target matches
            if (isCountryShortSpecial)
            {
                return targetCountryCode != countryShort;
            }

            // Case 3: IP country is normal → valid if both are normal (not special)
            return isTargetCountrySpecial;
        }
    }
}
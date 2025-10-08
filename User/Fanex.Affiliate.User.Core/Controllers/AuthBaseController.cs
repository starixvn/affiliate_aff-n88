namespace Fanex.Affiliate.User.Core.Controllers
{
    using System.Linq;
    using System.Web.Mvc;
    using BusinessService;
    using Constants;
    using CoreService;
    using DTO;
    using DTO.Auth;
    using Extensions;
    using MetalModels;
    using Repository.UserPanel;
    using Resources;
    using Utilities;

    public class AuthBaseController : BaseController
    {
        private readonly ICaptchaService _captchaService;
        private readonly IAppSetting _appSetting;
        private readonly IAuthService _authService;
        protected readonly IAccountRepository _accountRepository;

        public AuthBaseController(
            ISessionService sessionService,
            ILanguageService languageService,
            IAppSetting appSetting,
            ICaptchaService captchaService,
            IAuthService authService,
            IIpLocationService ipLocationService,
            IAccountRepository accountRepository) : base(sessionService, languageService, ipLocationService)
        {
            _captchaService = captchaService;
            _appSetting = appSetting;
            _authService = authService;
            _accountRepository = accountRepository;
        }

        protected ICaptchaService CaptchaService => _captchaService;

        protected IAppSetting AppSetting => _appSetting;

        protected IAuthService AuthService => _authService;

        protected ResultInfo ValidateLoginRequest(string inputCaptcha, string sessionCaptcha)
        {
            if (!Request.IsAjaxRequest())
            {
                return GetErrorResult(Lang.ErrAuthorized);
            }

            if (!ModelState.IsValid)
            {
                return GetErrorResult(string.Join(", ", ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage)));
            }

            if (!_captchaService.IsValid(inputCaptcha, sessionCaptcha, Request.GetClientIP()))
            {
                return GetErrorResult(Lang.ValidationCode);
            }

            return new ResultInfo { IsOk = true };
        }

        protected bool IsValidAffiliateType(string affType)
        {
            return _appSetting.AllowedAffiliateTypes.Any(t => t.Equals(affType));
        }

        protected void AssignLoginInfoAndSetAuth(AuthorizedUserInfo user, string clientIpAddress, int adminId = 0)
        {
            var onUserIdParam = GetOnUserIdParam(user.AffId, clientIpAddress, adminId);
            user.OnUserId = _authService.GetOnUserId(onUserIdParam);
            var accountInfo = _accountRepository.GetAccountInfo(user.AffId);

            SessionService.AssignSessions(user);
            SessionService.UserSession.BaseCurrency = accountInfo.DefaultBaseCurrency;
            SessionService.UserSession.IsMarketingAccount = accountInfo.AffCategoryId == AffCategory.Marketing;
            AuthService.SignIn(user.UserName, false);
        }

        protected ResultInfo GetErrorResult(string message)
        {
            return new ResultInfo
            {
                IsOk = false,
                Message = message
            };
        }

        private OnUserIdParam GetOnUserIdParam(int affId, string clientIpAddress, int adminId)
        {
            return new OnUserIdParam
            {
                CustId = affId,
                ServerId = _appSetting.ServerId,
                Ip = clientIpAddress,
                NetSessionId = HttpContext.Session.SessionID,
                SubAccId = adminId,
                IsInternal = SessionService.IsInternal
            };
        }
    }
}

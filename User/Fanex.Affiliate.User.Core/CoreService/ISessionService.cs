namespace Fanex.Affiliate.User.Core.CoreService
{
    using DTO.Auth;
    using DTO.VerificationAccount;

    public interface ISessionService
    {
        UserSession UserSession { get; }

        string CaptchaCode { get; set; }

        string CurrentLanguage { get; set; }

        string CurrentCountry { get; set; }

        string CountryShort { get; set; }

        bool IsInternal { get; set; }

        bool IsUnauthorized { get; }

        string SignUpCaptchaCode { get; set; }

        string PrivateKey { get; set; }

        void AssignSessions(AuthorizedUserInfo authorizedUser);

        VerificationSession VerificationSession { get; set; }
    }
}
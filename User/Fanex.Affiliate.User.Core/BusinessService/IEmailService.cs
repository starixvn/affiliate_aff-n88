namespace Fanex.Affiliate.User.Core.BusinessService
{
    using Fanex.Affiliate.User.Core.MetalModels.Email;

    public interface IEmailService
    {
        void SendRecoverPasswordEmail(RecoverPasswordEmailParam emailParam);

        void SendNewPasswordEmail(NewPasswordEmailParam emailParam);

        void SendPaymentEmail(PaymentEmailParam emailParam);

        void SendNoticeEmailToCsd(NoticeEmailParam emailParam);

        void SendVerificationEmail(VerificationAccountEmailParam emailParam);

        void SendContactUsEmail(ContactUsEmailParam emailParam);
    }
}
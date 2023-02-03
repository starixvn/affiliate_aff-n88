using System.Web;
using System.Web.Mvc;
using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.Controllers;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.Auth;
using Fanex.Affiliate.User.Core.MetalModels;
using Fanex.Affiliate.User.Core.MetalModels.Email;
using Fanex.Affiliate.User.Core.Repository.UserPanel;
using Fanex.Affiliate.User.Core.Resources;
using Fanex.Affiliate.User.Core.UnitTests.TestHelper;
using Fanex.Affiliate.User.Core.Utilities;
using Moq;
using Newtonsoft.Json;
using Xunit;

namespace Fanex.Affiliate.User.Core.UnitTests.Controllers
{
    public class ContactUsControllerTest
    {
        [Fact]
        public void Index_WhenCallWithGet_ReturnCorrectView()
        {
            // Arrange
            var controller = CreateController();

            // Action
            var actionResult = controller.Index() as ViewResult;
            var result = actionResult.ViewName;

            // Assert
            Assert.NotEmpty(result);
        }

        [Fact]
        public void Index_IsInternal_ReturnJsonResultCorrectly()
        {
            // Arrange
            var sessionService = MockingHelper.GetSessionService();
            sessionService.IsInternal = true;
            var controller = CreateController(sessionService: sessionService);

            var expectedResult = new ResultInfo { IsOk = false, Message = Lang.ErrAuthorized };

            // Action
            var actionResult = controller.Index(new ContactUsParam()) as JsonResult;
            var result = actionResult.Data as ResultInfo;

            // Assert
            Assert.Equal(expectedResult.IsOk, result.IsOk);
            Assert.Equal(expectedResult.Message, result.Message);
        }

        [Fact]
        public void Index_CaptchaIsNotValid_ReturnJsonResultCorrectly()
        {
            // Arrange
            var controller = CreateController();
            var param = new ContactUsParam { Captcha = "Wrong Value" };

            var expectedResult = new ResultInfo { IsOk = false, Message = Lang.ValidationCode };

            // Action
            var actionResult = controller.Index(param) as JsonResult;
            var result = actionResult.Data as ResultInfo;

            // Assert
            Assert.Equal(expectedResult.IsOk, result.IsOk);
            Assert.Equal(expectedResult.Message, result.Message);
        }

        [Fact]
        public void Index_IsValid_CallServiceWithCorrectParemeter()
        {
            // Arrange
            ContactUsParam passedParam = null;
            var param = CreateParam();
            var expectedResult = new ResultInfo { IsOk = true };

            var service = new Mock<IContactService>();
            service.Setup(s => s.SendRequest(param, It.IsAny<EmailBaseParam>()))
                .Returns(expectedResult)
                .Callback<ContactUsParam, EmailBaseParam>((p, e) => passedParam = p);

            var captchaService = new Mock<ICaptchaService>();
            captchaService.Setup(c => c.IsValid(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .Returns(true);
            var controller = CreateController(service.Object, captchaService: captchaService.Object);

            var expectedParam = JsonConvert.SerializeObject(CreateExpectedParam());

            // Action
            var actionResult = controller.Index(param) as JsonResult;
            var result = actionResult.Data as ResultInfo;
            var paramResult = JsonConvert.SerializeObject(passedParam);

            // Assert
            Assert.Equal(expectedResult, result);
            Assert.Equal(expectedParam, paramResult);
        }

        [Fact]
        public void Index_IsValid_CallServiceWithCorrectEmailParemeter()
        {
            // Arrange
            EmailBaseParam passedParam = null;
            var param = CreateParam();
            var expectedResult = new ResultInfo { IsOk = true };

            var service = new Mock<IContactService>();
            service.Setup(s => s.SendRequest(param, It.IsAny<EmailBaseParam>()))
                .Returns(expectedResult)
                .Callback<ContactUsParam, EmailBaseParam>((p, e) => passedParam = e);

            var captchaService = new Mock<ICaptchaService>();
            captchaService.Setup(c => c.IsValid(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).Returns(true);
            var appSetting = Mock.Of<IAppSetting>(ap => ap.GetMailContactByLanguageCode(It.IsAny<string>()) == Constant.DefaultMailContact && ap.MailCc == Constant.DefaultMailCc);
            var controller = CreateController(service.Object, appSetting: appSetting, captchaService: captchaService.Object);

            var expectedParam = JsonConvert.SerializeObject(new EmailBaseParam
            {
                MailCc = Constant.DefaultMailCc,
                MailTo = Constant.DefaultMailContact,
                User = new UserInfo { PreferredLanguage = Constant.DefaultLanguage },
            });

            // Action
            controller.Index(param);
            var paramResult = JsonConvert.SerializeObject(passedParam);

            // Assert
            Assert.Equal(expectedParam, paramResult);
        }

        [Fact]
        public void Index_UserSessionIsNull_CreatorValueShouldBeCorrect()
        {
            // Arrange
            const int ExpectedCreator = -1;
            ContactUsParam passedParam = null;
            var param = CreateParam();
            var expectedResult = new ResultInfo { IsOk = true };

            var service = new Mock<IContactService>();
            service.Setup(s => s.SendRequest(param, It.IsAny<EmailBaseParam>()))
                .Returns(expectedResult)
                .Callback<ContactUsParam, EmailBaseParam>((p, e) => passedParam = p);

            var sessionService = MockingHelper.GetSessionService();
            var sessionServiceMock = Mock.Get(sessionService);

            UserSession expectedUserSession = null;
            sessionServiceMock.Setup(s => s.UserSession).Returns(expectedUserSession);

            var captchaService = new Mock<ICaptchaService>();
            captchaService.Setup(c => c.IsValid(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .Returns(true);

            var controller = CreateController(service.Object, sessionService, captchaService: captchaService.Object);

            // Action
            controller.Index(param);
            var result = passedParam.Creator;

            // Assert
            Assert.Equal(ExpectedCreator, result);
        }

        [Fact]
        public void Index_IsInvalid_NotCallService()
        {
            // Arrange
            var param = CreateParam();
            var captchaService = new Mock<ICaptchaService>();
            captchaService.Setup(c => c.IsValid(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .Returns(true);
            var controller = CreateController(null, captchaService: captchaService.Object);
            controller.ModelState.AddModelError("Error1", "Model is invalid!");

            // Action
            var actionResult = controller.Index(param) as JsonResult;
            var result = actionResult.Data as ResultInfo;

            // Assert
            Assert.False(result.IsOk);
            Assert.Equal("Model is invalid!", result.Message);
        }

        private static ContactUsController CreateController(
            IContactService contactService = null,
            ISessionService sessionService = null,
            IAppSetting appSetting = null,
            ICaptchaService captchaService = null,
            ILanguageService languageService = null)
        {
            contactService = contactService ?? Mock.Of<IContactService>();
            sessionService = sessionService ?? MockingHelper.GetSessionService();
            appSetting = appSetting ?? Mock.Of<IAppSetting>();
            captchaService = captchaService ?? Mock.Of<ICaptchaService>();
            languageService = languageService ?? Mock.Of<ILanguageService>();

            var controller = new ContactUsController(appSetting, sessionService, languageService, contactService, captchaService);
            var request = MockingHelper.GetHttpRequest();
            var server = new Mock<HttpServerUtilityBase>();
            server.Setup(s => s.HtmlEncode(It.IsAny<string>())).Returns<string>(s => $"Encoded{s}");

            controller.ControllerContext = Mock.Of<ControllerContext>(ctx =>
                ctx.HttpContext.Request == request &&
                ctx.HttpContext.Server == server.Object &&
                ctx.HttpContext.Session.SessionID == "SessionId"
            );

            return controller;
        }

        private ContactUsParam CreateParam()
        {
            return new ContactUsParam
            {
                Captcha = Constant.Captcha,
                Affiliate = "B2CAFF001",
                Content = "Content",
                Email = Constant.DefaultMailUser,
                Sender = "Sender",
                Subject = "Subject",
                SubjectRaw = "Subject"
            };
        }

        private ContactUsParam CreateExpectedParam()
        {
            var param = CreateParam();

            param.Affiliate = $"Encoded{param.Affiliate}";
            param.Content = $"Encoded{param.Content}";
            param.Email = $"Encoded{param.Email}";
            param.Sender = $"Encoded{param.Sender}";
            param.Subject = $"Encoded{param.Subject}";

            param.Browser = Constant.Browser;
            param.Creator = Constant.DefaultAffId;
            param.Ip = "::1";
            param.SessionId = "SessionId";

            return param;
        }
    }
}

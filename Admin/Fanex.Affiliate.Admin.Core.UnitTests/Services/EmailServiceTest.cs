using Fanex.Affiliate.Admin.Core.Services;
using Xunit;

namespace Fanex.Affiliate.Admin.Core.UnitTests.Services
{
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Major Code Smell", "S125:Sections of code should not be commented out", Justification = "<Pending>")]
    public class EmailServiceTest
    {
        [Fact]
        public void MappingLanguage_WhenCall_ReturnVN()
        {
            //Arrange
            //Action
            var result = EmailService.MappingLanguage("vi-VN");

            //Assert
            Assert.Equal("vi-VN", result);
        }

        [Fact]
        public void MappingLanguage_WhenCall_ReturnUS()
        {
            //Arrange
            //Action
            var result = EmailService.MappingLanguage("abc");

            //Assert
            Assert.Equal("en-US", result);
        }

        //private EmailService CreateEmailService(
        //    IMailProcessor mailProcessor = null,
        //    IAppSetting appSetting = null,
        //    ILanguageService languageService = null
        //    )
        //{
        //    var fakeMailProcessor = mailProcessor ?? Mock.Of<IMailProcessor>();
        //    var fakeAppSetting = appSetting ?? Mock.Of<IAppSetting>();
        //    var fakeLanguageService = languageService ?? Mock.Of<ILanguageService>();

        //    return new EmailService(fakeMailProcessor, fakeAppSetting, fakeLanguageService);
        //}
    }
}

namespace Fanex.Affiliate.User.Core.Controllers
{
    using BusinessService;
    using CoreService;
    using Utilities;
    using ViewModels;

    public class BaseLayoutController : BaseController
    {
        protected readonly IAppSetting AppSetting;

        public BaseLayoutController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService,
            IIpLocationService ipLocationService) 
            : base(sessionService, languageService, ipLocationService)
        {
            AppSetting = appSetting;
        }

        protected BaseLayoutViewModel GetBaseLayoutViewModel()
        {
            return new BaseLayoutViewModel
            {
                SiteName = AppSetting.SiteName,
                SiteFriendlyName = AppSetting.SiteFriendlyName,
                CurrentLanguage = SessionService.CurrentLanguage,
                CurrentCountry = SessionService.CurrentCountry
            };
        }

        protected void AssignBaseLayoutViewModel(BaseLayoutViewModel model)
        {
            model.SiteName = AppSetting.SiteName;
            model.SiteFriendlyName = AppSetting.SiteFriendlyName;
            model.CurrentLanguage = SessionService.CurrentLanguage;
            model.CurrentCountry = SessionService.CurrentCountry;
        }
    }
}

using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.Filters;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.Repository.UserPanel;
using Fanex.Affiliate.User.Core.Utilities;
using Fanex.Affiliate.User.Core.ViewModels.UserPanel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    [CustomAuthorize]
    public class SummaryController : BaseController
    {
        private const string PARTIAL_SUMMARY_PATH = "UserPanel/AccountOverView/Summary";
        private readonly IAppSetting _appSetting;
        private readonly IAccountOverviewRepository _accountOverviewRepository;

        public SummaryController(
            IAppSetting appSetting,
            ISessionService sessionService,
            ILanguageService languageService,
            IAccountOverviewRepository accountOverviewRepository
            ) : base(sessionService, languageService)
        {
            _appSetting = appSetting;
            _accountOverviewRepository = accountOverviewRepository;
        }

        [HttpGet]
        [AjaxOnly]
        public ActionResult Index()
        {
            var viewPath = PathHelper.GetViewPath(PARTIAL_SUMMARY_PATH, "Index", _appSetting.SiteName);

            return PartialView(viewPath, model: SessionService.UserSession.IsMaxSubLevel);
        }

        [HttpPost]
        [AjaxOnly]
        public ActionResult Dashboard(DateTime monthDate)
        {
            var model = _accountOverviewRepository.GetUserOverviewSummary(SessionService.UserSession.AffId, monthDate);
            model.IsMaxSubLevel = SessionService.UserSession.IsMaxSubLevel;

            var viewPath = PathHelper.GetViewPath(PARTIAL_SUMMARY_PATH, "Dashboard", _appSetting.SiteName);
            return PartialView(viewPath, model);
        }

        [HttpPost]
        [AjaxOnly]
        public ActionResult Overview(DateTime monthDate)
        {
            var model = _accountOverviewRepository.GetUserOverviewDetailList(SessionService.UserSession.AffId, monthDate);

            var itemTotal = new OverviewDetail
            {
                Signups = model.Sum(item => item.Signups),
                Deposit = model.Sum(item => item.Deposit),
                ActiveMembers = model.Sum(item => item.ActiveMembers),
                QualifiedMember = model.Sum(item => item.QualifiedMember),
                Turnover = model.Sum(item => item.Turnover),
                GGR = model.Sum(item => item.GGR),
                Withdrawal = model.Sum(item => item.Withdrawal),
                DepositedMembers = model.Sum(item => item.DepositedMembers)
            };

            var viewPath = PathHelper.GetViewPath(PARTIAL_SUMMARY_PATH, "Overview", _appSetting.SiteName);
            return PartialView(viewPath, model.Concat(new List<OverviewDetail> { itemTotal }));
        }

        [HttpPost]
        [AjaxOnly]
        public ActionResult PlayersDetails(PlayerDetailParam param)
        {
            var model = GetPlayerDetailViewModel(param);

            var viewPath = PathHelper.GetViewPath(PARTIAL_SUMMARY_PATH, "PlayersDetails", _appSetting.SiteName);
            return PartialView(viewPath, model);
        }

        [HttpPost]
        [AjaxOnly]
        public ActionResult PlayersDetailsContent(PlayerDetailParam param)
        {
            var model = GetPlayerDetailViewModel(param);

            var viewPath = PathHelper.GetViewPath(PARTIAL_SUMMARY_PATH, "PlayersDetailsContent", _appSetting.SiteName);
            return PartialView(viewPath, model);
        }

        [HttpPost]
        [AjaxOnly]
        public ActionResult SubAffDetails(SubAffDetailParam param)
        {
            param.AffId = SessionService.UserSession.AffId;
            var model = _accountOverviewRepository.GetSubAffDetails(param);

            var viewPath = PathHelper.GetViewPath(PARTIAL_SUMMARY_PATH, "SubAffDetails", _appSetting.SiteName);
            return PartialView(viewPath, model);
        }

        private PlayerDetailViewModel GetPlayerDetailViewModel(PlayerDetailParam param)
        {
            param.AffId = SessionService.UserSession.AffId;
            var playerDetailList = _accountOverviewRepository.GetPlayerDetailList(param);

            return new PlayerDetailViewModel
            {
                PlayerDetailList = playerDetailList,
                TotalItem = param.NRows,
                StartRowNumber = (param.PageIndex - 1) * param.PageSize + 1,
                IsDepositFeePercent = SessionService.UserSession.IsDepositFeePercent,
                IsWithdrawalFeePercent = SessionService.UserSession.IsWithdrawalFeePercent
            };
        }
    }
}

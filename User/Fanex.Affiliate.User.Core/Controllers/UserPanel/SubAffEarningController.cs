using Fanex.Affiliate.User.Core.BusinessService;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.Filters;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.Repository.UserPanel;
using Fanex.Affiliate.User.Core.ViewModels.UserPanel;
using System;
using System.Linq;
using System.Web.Mvc;

namespace Fanex.Affiliate.User.Core.Controllers.UserPanel
{
    [CustomAuthorize]
    public class SubAffEarningController : BaseController
    {
        private readonly IStatementHistoryRepository _statementHistoryRepository;

        public SubAffEarningController(ISessionService sessionService,
            ILanguageService languageService,
            IStatementHistoryRepository statementHistoryRepository

            ) : base(sessionService, languageService)
        {
            _statementHistoryRepository = statementHistoryRepository;
        }

        [AjaxOnly]
        public ActionResult Index(SubAffComParam param)
        {
            param.AffId = SessionService.UserSession.AffId;
            param.IsInternal = SessionService.IsInternal;
            param.MonthDate = param.MonthDate.HasValue ? param.MonthDate.Value : DateTime.Now.AddDays(-1);

            var subAffComs = _statementHistoryRepository.GetSubAffCommission(param);
            var vms = subAffComs.Select(s => new SubAffComViewModel
            {
                Commission = s.Commission,
                SubAffCommission = s.SubAffCommission,
                SubAffUserName = s.UserName
            });

            ViewBag.MonthDate = param.MonthDate;

            return View("~/Views/UserPanel/StatementHistory/SubAffEarning.cshtml", vms);
        }
    }
}

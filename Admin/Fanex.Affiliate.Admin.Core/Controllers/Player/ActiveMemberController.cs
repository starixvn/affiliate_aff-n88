using System.Collections.Generic;
using System.Web.Mvc;
using Fanex.Affiliate.Admin.Core.Services.Common;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.Resources;
using Fanex.Affiliate.Admin.Core.Attributes;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.Services.Member;
using Fanex.Affiliate.Admin.Core.Extensions;

namespace Fanex.Affiliate.Admin.Core.Controllers.Player
{
    [FunctionAuthorize(FunctionName = Function.ActiveMembers)]
    public class ActiveMemberController: BaseController
    {
        private readonly IActiveMemberService _activeMemberService;

        public ActiveMemberController(
            ISessionService sessionService,
            IActiveMemberService activeMemberService) : base(sessionService)
        {
            _activeMemberService = activeMemberService;
        }

        public ActionResult Index()
        {
            var subMenu = new List<SubMenu>
            {
                new SubMenu { Name = Lang.Player, Url = Url.Content("~/Portal/Player") },
                new SubMenu { Name = Lang.ActivePlayer, Url = Url.Content("~/Portal/ActiveMember"), IsActive = true }
            };

            return View("~/Areas/Portal/Views/Player/ActiveMember.cshtml", subMenu);
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetAllMembers(string userNames)
        {
            return new JsonNetResult
            {
                Data = _activeMemberService.GetAllMembers(userNames)
            };
        }
    }
}

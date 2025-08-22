using System.Collections.Generic;
using System.Web.Mvc;
using Fanex.Affiliate.Admin.Core.Attributes;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Affiliate.Admin.Core.MetaModels.Domain;
using Fanex.Affiliate.Admin.Core.Resources;
using Fanex.Affiliate.Admin.Core.Services.Common;
using Fanex.Affiliate.Admin.Core.Services.Domain;
using Fanex.Affiliate.Admin.Core.Utilities;
using Fanex.Affiliate.Admin.Core.ViewModels.Domain;

namespace Fanex.Affiliate.Admin.Core.Controllers.Domain
{
    [FunctionAuthorize(FunctionName = Function.Domain)]
    public class DomainControlController : ReadOnlySessionBaseController
    {
        private readonly IDomainControlService _domainControlService;
        private readonly ISystemService _systemService;

        public DomainControlController(
            ISessionService sessionService,
            IDomainControlService domainControlService,
            ISystemService systemService) : base(sessionService)
        {
            _domainControlService = domainControlService;
            _systemService = systemService;
        }

        public ActionResult Index()
        {
            var subMenu = new List<SubMenu>
            {
                new SubMenu { Name = Lang.AffiliateDomain, Url = Url.Content("~/Portal/Domain?isAffDomain=true") },
                new SubMenu { Name = SiteFriendlyNameHelper.ReplaceB2C(Lang.TextB2CDomains), Url = Url.Content("~/Portal/Domain?isAffDomain=false") },
                new SubMenu { Name = Lang.DomainControl, Url = Url.Content("~/Portal/DomainControl"), IsActive = true },
                new SubMenu { Name = Lang.SubAffiliateDomain, Url = Url.Content("~/Portal/SubAffDomain") }
            };

            var model = new DomainControlViewModel
            {
                SubMenuList = subMenu,
                MarketList = _systemService.GetSupportedUiLanguageList()
            };

            return View("~/Areas/Portal/Views/Domain/DomainControl.cshtml", model);
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetDomainControlList(string market)
        {
            return new JsonNetResult
            {
                Data = _domainControlService.GetDomainControlList(market)
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.Domain, IsHost = true)]
        public ActionResult InsertDomainControl(InsertUpdateDomainControlParam param)
        {
            if (ModelState.IsValid)
            {
                AssignUserInfoParam(param);

                return new JsonNetResult
                {
                    Data = _domainControlService.InsertDomainControl(param)
                };
            }

            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = "Domain's info is invalid!"
                }
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.Domain, IsHost = true)]
        public ActionResult UpdateDomainControl(InsertUpdateDomainControlParam param)
        {
            var isValidDomainId = param.DomainId >= Validation.MinId;
            if (ModelState.IsValid && isValidDomainId)
            {
                AssignUserInfoParam(param);

                return new JsonNetResult
                {
                    Data = _domainControlService.UpdateDomainControl(param)
                };
            }

            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = !isValidDomainId ? "Domain Id is invalid." : "Domain's info is invalid!"
                }
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.Domain, IsHost = true)]
        public ActionResult DeleteDomainControl(DeleteDomainControlParam param)
        {
            if (ModelState.IsValid)
            {
                AssignUserInfoParam(param);

                return new JsonNetResult
                {
                    Data = _domainControlService.DeleteDomainControl(param)
                };
            }

            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = "Domain Id is invalid."
                }
            };
        }
    }
}

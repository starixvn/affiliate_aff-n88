using Fanex.Affiliate.Admin.Core.Attributes;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Affiliate.Admin.Core.MetaModels;
using Fanex.Affiliate.Admin.Core.MetaModels.Domain;
using Fanex.Affiliate.Admin.Core.Resources;
using Fanex.Affiliate.Admin.Core.Services.Common;
using Fanex.Affiliate.Admin.Core.Services.Domain;
using Fanex.Affiliate.Admin.Core.Utilities;
using Fanex.Affiliate.Admin.Core.ViewModels.Domain;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Fanex.Affiliate.Admin.Core.Controllers.Domain
{
    [FunctionAuthorize(FunctionName = Function.Domain)]
    public class SubAffDomainController : BaseController
    {
        private readonly ISubAffDomainService _subAffDomainService;

        public SubAffDomainController(
            ISessionService sessionService,
            ISubAffDomainService subAffDomainService) : base(sessionService)
        {
            _subAffDomainService = subAffDomainService;
        }

        public ActionResult Index()
        {
            var subMenu = new List<SubMenu>
            {
                new SubMenu { Name = Lang.AffiliateDomain, Url = Url.Content("~/Portal/Domain?isAffDomain=true") },
                new SubMenu { Name = SiteFriendlyNameHelper.Replace12Bet(Lang.Text12BetDomains), Url = Url.Content("~/Portal/Domain?isAffDomain=false") },
                new SubMenu { Name = Lang.DomainControl, Url = Url.Content("~/Portal/DomainControl") },
                new SubMenu { Name = Lang.SubAffiliateDomain, Url = Url.Content("~/Portal/SubAffDomain"), IsActive = true },
            };

            var model = new DomainViewModel
            {
                SubMenuList = subMenu
            };

            return View("~/Areas/Portal/Views/Domain/SubAffDomain.cshtml", model);
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetSubAffDomainList()
        {
            return new JsonNetResult
            {
                Data = _subAffDomainService.GetSubAffDomainList()
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.Media, IsHost = true)]
        public ActionResult InsertSubAffDomain(InsertUpdateDomainParam param)
        {
            if (ModelState.IsValid)
            {
                var encodeParam = EncodeParam(param);
                GetUserInfoParam(encodeParam);

                return new JsonNetResult
                {
                    Data = _subAffDomainService.InsertSubAffDomain(encodeParam)
                };
            }

            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = "Please input Sub-Affiliate Domain's name."
                }
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.Media, IsHost = true)]
        public ActionResult UpdateSubAffDomain(InsertUpdateDomainParam param)
        {
            var isValidDomainId = param.DomainId >= Validation.MinId;
            if (ModelState.IsValid && isValidDomainId)
            {
                var encodeParam = EncodeParam(param);
                GetUserInfoParam(encodeParam);

                return new JsonNetResult
                {
                    Data = _subAffDomainService.UpdateSubAffDomain(encodeParam)
                };
            }

            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = !isValidDomainId ? "Sub-Affiliate Domain Id is invalid." : "Please input Sub-Affiliate Domain's name."
                }
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.Media, IsHost = true)]
        public ActionResult DeleteSubAffDomain(DeleteDomainParam param)
        {
            if (ModelState.IsValid)
            {
                GetUserInfoParam(param);

                return new JsonNetResult
                {
                    Data = _subAffDomainService.DeleteSubAffDomain(param)
                };
            }

            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = "Sub-Affiliate Domain Id is incorrect."
                }
            };
        }

        private InsertUpdateDomainParam EncodeParam(InsertUpdateDomainParam param)
        {
            return new InsertUpdateDomainParam
            {
                DomainId = param.DomainId,
                DomainName = Server.HtmlEncode(param.DomainName),
                IsSSL = param.IsSSL,
                IsAffDomain = param.IsAffDomain
            };
        }

        private void GetUserInfoParam(UserInfoParam param)
        {
            param.UserId = SessionService.UserId;
            param.Ip = Request.UserHostAddress;
        }
    }
}

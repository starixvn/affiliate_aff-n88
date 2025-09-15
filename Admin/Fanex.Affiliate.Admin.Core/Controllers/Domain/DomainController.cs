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
    public class DomainController : ReadOnlySessionBaseController
    {
        private readonly IDomainService _domainService;

        private readonly ISystemService _systemService;

        public DomainController(
            ISessionService sessionService,
            IDomainService domainService,
            ISystemService systemService) : base(sessionService)
        {
            _domainService = domainService;
            _systemService = systemService;
        }

        public ActionResult Index(bool isAffDomain = true)
        {
            var subMenu = new List<SubMenu>
            {
                new SubMenu { Name = Lang.AffiliateDomain, Url = Url.Content("~/Portal/Domain?isAffDomain=true"), IsActive = isAffDomain },
                new SubMenu { Name = SiteFriendlyNameHelper.ReplaceB2C(Lang.TextB2CDomains), Url = Url.Content("~/Portal/Domain?isAffDomain=false"), IsActive = !isAffDomain },
                new SubMenu { Name = Lang.DomainControl, Url = Url.Content("~/Portal/DomainControl") },
                new SubMenu { Name = Lang.SubAffiliateDomain, Url = Url.Content("~/Portal/SubAffDomain") }
            };

            var model = new DomainViewModel
            {
                SubMenuList = subMenu,
                IsAffDomain = isAffDomain
            };

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetDomainList(bool isAffDomain)
        {
            return new JsonNetResult
            {
                Data = _domainService.GetDomainList(isAffDomain)
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetDomainById(int domainId, bool isAffDomain = true)
        {
            return new JsonNetResult
            {
                Data = _domainService.GetDomainById(domainId, isAffDomain)
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetTargetCountryListByDomain(int affDomainId = 0, int redirectDomainId = 0)
        {
            return new JsonNetResult
            {
                Data = _domainService.GetTargetCountryListByDomain(affDomainId, redirectDomainId)
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.Domain, IsHost = true)]
        public ActionResult InsertDomain(InsertUpdateDomainParam param)
        {
            if (ModelState.IsValid && TargetCountryHelper.IsValidTargetCountryCodes(param.BlockTargetCountry, _systemService.GetTargetCountryList()))
            {
                HandleEncodeParam(param);

                return GenerateJsonNetResult(_domainService.InsertDomain(param));
            }

            return GenerateErrResult("The Domain' info is invalid!");
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.Domain, IsHost = true)]
        public ActionResult UpdateDomain(InsertUpdateDomainParam param)
        {
            if (ModelState.IsValid && TargetCountryHelper.IsValidTargetCountryCodes(param.BlockTargetCountry, _systemService.GetTargetCountryList()))
            {
                HandleEncodeParam(param);

                return GenerateJsonNetResult(_domainService.UpdateDomain(param));
            }

            return GenerateErrResult("The Domain' info is invalid!");
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.Domain, IsHost = true)]
        public ActionResult DeleteDomain(DeleteDomainParam param)
        {
            if (ModelState.IsValid)
            {
                AssignUserInfoParam(param);

                return GenerateJsonNetResult(_domainService.DeleteDomain(param));
            }

            return GenerateErrResult("The Domain is incorrect!");
        }

        private void HandleEncodeParam(InsertUpdateDomainParam param)
        {
            param.DomainName = Server.HtmlEncode(param.DomainName);
            param.BlockTargetCountry = Server.HtmlEncode(param.BlockTargetCountry);
            AssignUserInfoParam(param);
        }
    }
}
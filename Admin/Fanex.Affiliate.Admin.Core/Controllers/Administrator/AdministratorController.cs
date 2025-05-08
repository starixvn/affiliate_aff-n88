using Fanex.Affiliate.Admin.Core.Attributes;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Affiliate.Admin.Core.MetaModels;
using Fanex.Affiliate.Admin.Core.MetaModels.Administrator;
using Fanex.Affiliate.Admin.Core.Resources;
using Fanex.Affiliate.Admin.Core.Services.Administrator;
using Fanex.Affiliate.Admin.Core.Services.Auth;
using Fanex.Affiliate.Admin.Core.Services.Common;
using Fanex.Affiliate.Admin.Core.Utilities;
using ONEbook.UM.AspNetMVC.Filters;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web.Mvc;

namespace Fanex.Affiliate.Admin.Core.Controllers.Administrator
{
    [CustomAuthorize]
    [CheckUMFilter]
    [FunctionAuthorize(FunctionName = Function.UserControl)]
    public class AdministratorController : Controller
    {
        private const string BreakLine = "<br />";
        private readonly IAuthService _authService;
        private readonly ISessionService _sessionService;
        private readonly IAdministratorService _administratorService;

        public AdministratorController(
            ISessionService sessionService,
            IAdministratorService administratorService,
            IAuthService authService)
        {
            _authService = authService;
            _sessionService = sessionService;
            _administratorService = administratorService;
        }

        public ActionResult Index()
        {
            var subMenu = new List<SubMenu>
            {
                new SubMenu { Name = Lang.AdminList, Url = Url.Content("~/Portal/Administrator"), IsActive = true },
                new SubMenu { Name = Lang.DeptList, Url = Url.Content("~/Portal/Department") }
            };

            return View(subMenu);
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetAccountPolicyList(int groupId)
        {
            return new JsonNetResult
            {
                Data = _administratorService.GetAccountPolicyList(groupId)
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetPolicyListByGroupIds(string groupIds)
        {
            return new JsonNetResult
            {
                Data = _administratorService.GetPolicyListByGroupIds(groupIds)
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetUserList(string userName, string firstLetter, int groupId = 0)
        {
            return new JsonNetResult
            {
                Data = _administratorService.GetUserList(groupId, userName, firstLetter)
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        public ActionResult GetUserDetail(int selectedUserId)
        {
            return new JsonNetResult
            {
                Data = _administratorService.GetUserDetail(selectedUserId)
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.UserControl, IsHost = true)]
        public ActionResult InsertUser(InsertUserParam param)
        {
            if (ModelState.IsValid)
            {
                var encodeParam = new InsertUserParam
                {
                    UserName = Server.HtmlEncode(param.UserName.Trim()),
                    Password = CryptographyHelper.Encrypt(param.Password.Trim()),
                    FirstName = Server.HtmlEncode(param.FirstName),
                    LastName = Server.HtmlEncode(param.LastName),
                    GroupId = param.GroupId
                };

                GetUserInfoParam(encodeParam);

                return new JsonNetResult
                {
                    Data = _administratorService.InsertUser(encodeParam)
                };
            }

            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = string.Join(BreakLine, ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage))
                }
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.UserControl, IsHost = true)]
        public ActionResult InsertExistedUser(InsertExistedUserParam param)
        {
            if (ModelState.IsValid)
            {
                var encodeParam = new InsertExistedUserParam
                {
                    UserName = Server.HtmlEncode(param.UserName.Trim()),
                    GroupId = param.GroupId
                };

                GetUserInfoParam(encodeParam);

                return new JsonNetResult
                {
                    Data = _administratorService.InsertExistedUser(encodeParam)
                };
            }

            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = string.Join(BreakLine, ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage))
                }
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.UserControl, IsHost = true)]
        public ActionResult UpdateUser(UpdateUserParam param)
        {
            if (ModelState.IsValid)
            {
                var encodeParam = new UpdateUserParam
                {
                    AccountId = param.AccountId,
                    FirstName = Server.HtmlEncode(param.FirstName),
                    LastName = Server.HtmlEncode(param.LastName),
                    GroupId = param.GroupId
                };

                GetUserInfoParam(encodeParam);

                return new JsonNetResult
                {
                    Data = _administratorService.UpdateUser(encodeParam)
                };
            }

            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = string.Join(BreakLine, ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage))
                }
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.UserControl, IsHost = true)]
        public ActionResult ChangeStatus(ChangeStatusParam param)
        {
            if (ModelState.IsValid)
            {
                GetUserInfoParam(param);

                return new JsonNetResult
                {
                    Data = _administratorService.ChangeStatus(param)
                };
            }

            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = "Account Id is invalid"
                }
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.UserControl, IsHost = true)]
        public ActionResult UpdateAccountPolicy(UpdatePolicyParam param)
        {
            if (ModelState.IsValid)
            {
                var encodeParam = new UpdatePolicyParam
                {
                    GroupPolicies = Server.HtmlEncode(param.GroupPolicies.Trim())
                };
                GetUserInfoParam(encodeParam);

                var result = _administratorService.UpdateAccountPolicy(encodeParam);

                if (result.IsSuccessful)
                {
                    HandleChangePermissions(encodeParam.UserId);
                }

                return new JsonNetResult
                {
                    Data = result
                };
            }

            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = "The account policy is invalid."
                }
            };
        }

        [HttpPost]
        [ValidateAntiForgeryHeader]
        [FunctionAuthorize(FunctionName = Function.UserControl, IsHost = true)]
        public ActionResult ChangePassword(UpdatePasswordParam param)
        {
            if (ModelState.IsValid)
            {
                param.Password = CryptographyHelper.Encrypt(param.Password);
                GetUserInfoParam(param);

                return new JsonNetResult
                {
                    Data = _administratorService.ChangePassword(param)
                };
            }

            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = string.Join(BreakLine, ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage))
                }
            };
        }

        private void HandleChangePermissions(int userId)
        {
            var permissionList = _authService.GetPermissionList(userId);

            _sessionService.UserPermissionList = permissionList;
            _sessionService.ClaimIdentities = new List<ClaimsIdentity> { new ClaimsIdentity(_authService.GetClaims(userId, permissionList)) };
        }

        private void GetUserInfoParam(UserInfoParam param)
        {
            param.UserId = _sessionService.UserId;
            param.Ip = Request.GetClientIP();
        }
    }
}

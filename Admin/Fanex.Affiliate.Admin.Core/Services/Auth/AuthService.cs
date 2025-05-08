
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Administrator;
using Fanex.Affiliate.Admin.Core.DTO.Common;
using Fanex.Affiliate.Admin.Core.MetaModels;
using Fanex.Affiliate.Admin.Core.MetaModels.Login;
using Fanex.Affiliate.Admin.Core.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Fanex.Affiliate.Admin.Core.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;


        public AuthService(
            IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }
        public IList<UserPermission> GetPermissionList(int userId)
        {
            return _authRepository.GetPermissionList(userId);
        }

        public bool ReCheckin(int onUserId)
        {
            return _authRepository.ReCheckin(onUserId);
        }

        public ResultInfo Login(LoginParam param)
        {
            return _authRepository.Login(param);
        }

        public int LoginOnUser(LoginParam param, string sessionId, string serverId)
        {
            return _authRepository.LoginOnUser(param, sessionId, serverId);
        }

        public void Logout(int onUserId)
        {
            _authRepository.Logout(onUserId);
        }

        public ResultInfo CheckPermission(CheckPermissionParam param)
        {
            return _authRepository.CheckPermission(param);
        }


        public IEnumerable<Claim> GetClaims(int userId, IList<UserPermission> permissions)
        {
            var userInfo = _authRepository.GetUserInfo(userId);

            return BuildClaims(userInfo, permissions);
        }

        private static IEnumerable<Claim> BuildClaims(AdministratorInfo adminInfo, IList<UserPermission> permissions)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, adminInfo.UserId.ToString()),
                new Claim(ClaimTypes.GivenName, adminInfo.UserName ?? string.Empty),
                new Claim(ClaimTypes.Role, adminInfo.GroupId.ToString())
            };

            if (permissions != null)
            {
                claims.AddRange(permissions.Select(p => BuildClaimFromPermission(p)));
            }

            return claims;
        }

        private static Claim BuildClaimFromPermission(UserPermission p)
        {
            var claimValue = p.IsHost ? Function.WritePermission : string.Empty;
            var claim = new Claim(p.FunctionName, claimValue);
            return claim;
        }
    }
}
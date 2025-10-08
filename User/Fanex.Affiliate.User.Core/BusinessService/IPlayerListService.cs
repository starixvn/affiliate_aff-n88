namespace Fanex.Affiliate.User.Core.BusinessService
{
    using Fanex.Affiliate.User.Core.DTO.UserPanel;
    using Fanex.Affiliate.User.Core.MetalModels.UserPanel;

    public interface IPlayerListService
    {
        PlayerListResult GetPlayerList(PlayerListParam param);
    }
}
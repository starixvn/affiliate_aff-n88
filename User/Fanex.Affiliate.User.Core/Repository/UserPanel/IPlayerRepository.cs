namespace Fanex.Affiliate.User.Core.Repository.UserPanel
{
    using Fanex.Affiliate.User.Core.DTO.UserPanel;
    using Fanex.Affiliate.User.Core.MetalModels.UserPanel;

    public interface IPlayerRepository
    {
        PlayerListResult GetPlayerList(PlayerListParam param);
    }
}
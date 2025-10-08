namespace Fanex.Affiliate.User.Core.BusinessService
{
    using Fanex.Affiliate.User.Core.DTO.UserPanel;
    using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
    using Fanex.Affiliate.User.Core.Repository.UserPanel;

    public class PlayerListService : IPlayerListService
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayerListService(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        public PlayerListResult GetPlayerList(PlayerListParam param)
        {
            return _playerRepository.GetPlayerList(param);
        }
    }
}
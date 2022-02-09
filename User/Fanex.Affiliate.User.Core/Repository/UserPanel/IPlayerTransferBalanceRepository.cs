using Fanex.Affiliate.User.Core.DTO.UserPanel.PlayerTransferBalance;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.Repository.UserPanel
{
    public interface IPlayerTransferBalanceRepository
    {
        PlayerTransferBalanceInfo GetPlayerTransferBalanceInfo(int affId, string playerName);

        PlayerTransferBalanceHistoryResult GetPlayerTransferBalanceHistory(PlayerTransferBalanceHistoryParam param);

        (int TransId, int ErrCode, string ErrMsg) InsertTransferBalanceRequest(PlayerTransferBalanceInsParam param);

        (int ErrCode, string ErrMsg) UpdateTransferBalanceRequest(int transId, string status);
    }
}

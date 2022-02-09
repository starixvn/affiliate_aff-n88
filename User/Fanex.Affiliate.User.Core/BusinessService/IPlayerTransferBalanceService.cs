using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.UserPanel;
using Fanex.Affiliate.User.Core.DTO.UserPanel.PlayerTransferBalance;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.ViewModels.UserPanel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public interface IPlayerTransferBalanceService
    {
        Task<ResultInfo<PlayerTransferBalanceInfo>> GetPlayerTransferBalanceInfoAsync(int affId, string playerName);

        Task<(int errCode, string errMsg)> SubmitTransferBalanceRequestAsync(TransMoneyRequestViewModel param);

        PlayerTransferBalanceHistoryResult GetPlayerTransferBalanceHistory(PlayerTransferBalanceHistoryParam param);
    }
}

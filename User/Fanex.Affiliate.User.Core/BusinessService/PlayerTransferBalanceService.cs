using Fanex.Affiliate.User.Core.Apis;
using Fanex.Affiliate.User.Core.Constants;
using Fanex.Affiliate.User.Core.Constants.Apis;
using Fanex.Affiliate.User.Core.CoreService;
using Fanex.Affiliate.User.Core.DTO;
using Fanex.Affiliate.User.Core.DTO.Api;
using Fanex.Affiliate.User.Core.DTO.UserPanel.PlayerTransferBalance;
using Fanex.Affiliate.User.Core.MetalModels.UserPanel;
using Fanex.Affiliate.User.Core.Repository.UserPanel;
using Fanex.Affiliate.User.Core.Resources;
using Fanex.Affiliate.User.Core.Utilities;
using Fanex.Affiliate.User.Core.ViewModels.UserPanel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Affiliate.User.Core.BusinessService
{
    public class PlayerTransferBalanceService : IPlayerTransferBalanceService
    {
        private readonly IPlayerTransferBalanceRepository _repo;
        private readonly ILicenseeApi _api;
        private readonly ISessionService _sessionService;
        private readonly IAppSetting _appSetting;

        private const int GENERAL_ERR = 999;

        public PlayerTransferBalanceService(IPlayerTransferBalanceRepository playerTransferBalanceRepository, 
            IAppSetting appSetting,
            ILicenseeApi licenseeApi,
            ISessionService sessionService)
        {
            _repo = playerTransferBalanceRepository;
            _api = licenseeApi;
            _sessionService = sessionService;
            _appSetting = appSetting;
        }

        public PlayerTransferBalanceHistoryResult GetPlayerTransferBalanceHistory(PlayerTransferBalanceHistoryParam param)
            => _repo.GetPlayerTransferBalanceHistory(param);

        public async Task<ResultInfo<PlayerTransferBalanceInfo>> GetPlayerTransferBalanceInfoAsync(int affId, string playerName)
        {
            var result = new ResultInfo<PlayerTransferBalanceInfo>();

            var summaryInfo = _repo.GetPlayerTransferBalanceInfo(affId, playerName);
            if (summaryInfo == null || summaryInfo.PaymentAccountId <=0 || summaryInfo.PlayerId <= 0)
            {
                result.IsOk = false;
                result.Message = Lang.InvalidPlayer;
                return result;
            }
            
            var accWalletInfos = await _api.GetCustBalanceAsync(new [] { summaryInfo.PaymentAccountId, summaryInfo.PlayerId });
            var affWalletInfo = accWalletInfos.FirstOrDefault(w => w.CustId == summaryInfo.PaymentAccountId);
            var playerWalletInfo = accWalletInfos.FirstOrDefault(w => w.CustId == summaryInfo.PlayerId);
            result = CheckPlayerAcc(playerWalletInfo);
            if (!result.IsOk)
            {
                return result;
            }
            result = CheckPaymetWalletInfo(affWalletInfo);
            if (!result.IsOk)
            {
                return result;
            }

            summaryInfo.Balance = affWalletInfo.Balance;
            result.Data = summaryInfo;

            return result;
        }

        public async Task<(int errCode, string errMsg)> SubmitTransferBalanceRequestAsync(TransMoneyRequestViewModel param)
        {
            var affId = _sessionService.UserSession.AffId;
            var summaryInfo = _repo.GetPlayerTransferBalanceInfo(affId, param.SubmitName);
            if (param.ExchangeRate != summaryInfo.ExchangeRate)
            {
                return (GENERAL_ERR, Lang.ExchageRateChange);
            }

            if(param.Amount <=0)
            {
                return (GENERAL_ERR, Lang.AmountMustPositiveNumber);
            }

            var baseAmount = param.Amount / (decimal)param.ExchangeRate;
            if (baseAmount > summaryInfo.TransferLimit)
            {
                return (GENERAL_ERR, Lang.AmountMustNotExceedLimit);
            }

            var insResult = _repo.InsertTransferBalanceRequest(new PlayerTransferBalanceInsParam
            {
                AffId = affId,
                Amount = param.Amount,
                Currency = summaryInfo.PaymentAccountCurrencyId,
                CustId = summaryInfo.PaymentAccountId,
                Player_Currency = summaryInfo.PlayerCurrencyId,
                ExRate = param.ExchangeRate,
                Player_CustId = summaryInfo.PlayerId
            });

            if (insResult.ErrCode != 0)
            {
                var errMsg = TranslateInsTransferRequestErrCodeToErrMsg(insResult.ErrCode, insResult.ErrMsg);
                return (insResult.ErrCode, errMsg);
            }

            var callApiResult = await _api.TransferMoneyToPlayerAsync(new MetalModels.Api.TransferMoneyParam
            {
                FromAmount = baseAmount,
                FromCustId = summaryInfo.PaymentAccountId,
                MaxTransferAmount = summaryInfo.TransferLimit,
                RefTransId = insResult.TransId.ToString(),
                SiteId = _appSetting.MemberSiteId,
                ToAmount = param.Amount,
                ToCustId = summaryInfo.PlayerId
            });
           
            if (!callApiResult.IsSuccess)
            {
                _repo.UpdateTransferBalanceRequest(insResult.TransId, TransferBalanceStatus.Failed);
                return (GENERAL_ERR, callApiResult.ErrMsg);
            }

            var updResult = _repo.UpdateTransferBalanceRequest(insResult.TransId, TransferBalanceStatus.Completed);

            return (updResult.ErrCode, updResult.ErrMsg);

        }

        private static string TranslateInsTransferRequestErrCodeToErrMsg(int errCode, string defaultErrMsg)
        {
            const int EXCHANGE_RATE_CHANGE = 101;
            const int HAS_PENDING_TRANS = 103;

            switch (errCode)
            {
                case EXCHANGE_RATE_CHANGE:
                    return Lang.ExchageRateChange;
                case HAS_PENDING_TRANS:
                    return Lang.HasAPendingTransaction;
                default:
                    return defaultErrMsg;
            }
        }

        private static ResultInfo<PlayerTransferBalanceInfo> CheckPlayerAcc(CustomerBalanceInfo balanceInfo)
        {
            var result = new ResultInfo<PlayerTransferBalanceInfo>
            {
                IsOk = true
            };
            if (balanceInfo == null)
            {
                result.IsOk = false;
                result.Message = Lang.InvalidPlayer;
                return result;
            }

            if (balanceInfo.Status != CustomerStatus.RUNNING)
            {
                result.IsOk = false;
                result.Message = Lang.PlayerNotActive;
                return result;
            }

            return result;
        }

        private static ResultInfo<PlayerTransferBalanceInfo> CheckPaymetWalletInfo(CustomerBalanceInfo affWalletInfo)
        {
            var result = new ResultInfo<PlayerTransferBalanceInfo>
            {
                IsOk = true
            };
            if (affWalletInfo == null)
            {
                result.IsOk = false;
                result.Message = Error.PaymentAccNotExist;
                return result;
            }

            if (affWalletInfo.Status != CustomerStatus.RUNNING )
            {
                result.IsOk = false;
                result.Message = Error.PaymentAccNotActive;
                return result;
            }

            return result;
        }

    }

}

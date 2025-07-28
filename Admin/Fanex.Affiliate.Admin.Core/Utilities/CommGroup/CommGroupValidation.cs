using System;
using System.Collections.Generic;
using System.Linq;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Affiliate.Admin.Core.MetaModels.CommissionGroup;
using Fanex.Affiliate.Admin.Core.Repository;
using Fanex.Affiliate.Admin.Core.Services;
using Fanex.Affiliate.Admin.Core.Services.CommGroup;

namespace Fanex.Affiliate.Admin.Core.Utilities.CommGroup
{
    public class CommGroupValidation : ICommGroupValidation
    {
        private const string brElementHtml = "<br />";

        private readonly IAuthRepository _authRepository;
        private readonly IAffiliateService _affiliateService;
        private readonly IProductRepository _productRepository;
        private readonly ICommGroupCommonService _commGroupCommonService;

        public CommGroupValidation(
            IAuthRepository authRepository,
            IAffiliateService affiliateService,
            IProductRepository productRepository,
            ICommGroupCommonService commGroupCommonService)
        {
            _authRepository = authRepository;
            _affiliateService = affiliateService;
            _productRepository = productRepository;
            _commGroupCommonService = commGroupCommonService;
        }

        public bool HasPermissionAssignOnAff(int userId, int affId)
        {
            var affInfo = _affiliateService.GetAffiliateBasicInfo(affId);

            if (string.IsNullOrEmpty(affInfo.AffCode))
            {
                var permissionList = _authRepository.GetPermissionList(userId);

                return permissionList.Any(i => i.FunctionName.MatchWith(Function.EditAffStatus) && i.IsHost);
            }

            return true;
        }

        public ResultInfo ValidateCommGroup(CommGroupSettingParam commGroup)
        {
            var validateGroupType = ValidateGroupType(commGroup.GroupTypeId);

            var result = ValidateAllFees(commGroup);

            var validateTierSettingList = ValidateTierSettingList(commGroup.TierSettingList, commGroup.IsCheckedMinFTDCount, commGroup.IsCheckedMinTotalDeposit);

            if (!validateGroupType.IsSuccessful || !validateTierSettingList.IsSuccessful)
            {
                result.Code = ErrCode.GeneralErrorCode;
                result.Message = string.Join(validateGroupType.Message, result.Message, validateTierSettingList.Message);
            }

            return result;
        }

        private ResultInfo ValidateAllFees(CommGroupSettingParam commGroup)
        {
            var result = new ResultInfo();
            var productIdOfDB = _productRepository.GetProductList().Select(p => p.ProductId.ToString());
            var validatePlatformFeeList = ValidateDeductionList(commGroup.PlatformFeeList, productIdOfDB, CommGroupErrorMessage.InvalidPlatformFee);
            if (!validatePlatformFeeList.IsSuccessful)
            {
                UpdateResult(result, validatePlatformFeeList.Message);
            }

            var validateDepositFee = ValidateFixedAmountDeductedFee(commGroup.DepositFee, CommGroupErrorMessage.InvalidDepositFee);
            if (!validateDepositFee.IsSuccessful)
            {
                UpdateResult(result, validateDepositFee.Message);
            }

            var validateWithdrawalFee = ValidateFixedAmountDeductedFee(commGroup.WithdrawalFee, CommGroupErrorMessage.InvalidWithdrawalFee);
            if (!validateWithdrawalFee.IsSuccessful)
            {
                UpdateResult(result, validateWithdrawalFee.Message);
            }

            return result;
        }

        private static ResultInfo ValidateTierSettingList(IEnumerable<TierSettingParam> tierSettingList, bool isCheckedMinFdm, bool isCheckedMinTotalDeposit)
        {
            var result = new ResultInfo();

            var tierSettingListByGroupProduct = tierSettingList.GroupBy(t => t.GroupProductId);
            var firstTierSetting = tierSettingListByGroupProduct.FirstOrDefault().ToList();
            var index = 0;

            foreach (var tierSettings in tierSettingListByGroupProduct)
            {
                var validateMinAmountResult = ValidateMinAmount(tierSettings);

                if (!validateMinAmountResult.IsSuccessful)
                {
                    UpdateResult(result, validateMinAmountResult.Message);
                }

                if (tierSettings.Any(item => item.MinQm > Validation.InfinityQualifiedMember))
                {
                    UpdateResult(result, "Min QP must be lesser than or equal to 1,000,000,000");
                }

                var allTierSettingsMatchGroupProduct1 = ValidateAllTierSettingsMatchGroupProduct1(index, tierSettings.ToList(), firstTierSetting, isCheckedMinFdm, isCheckedMinTotalDeposit);
                if (!allTierSettingsMatchGroupProduct1.IsSuccessful)
                {
                    UpdateResult(result, allTierSettingsMatchGroupProduct1.Message);
                }

                if (index == 0)
                {
                    var minFtdMessages = new Dictionary<string, string>
                    {
                        { "greaterThanMin", "Min Total FTD Count must be greater than 0." },
                        { "lesserThanMax", "Min Total FTD Count must be lesser than or equal to 1,000,000,000." },
                        { "mustIncreaseSequentially", "The values in the Min Total FTD Count column must increase sequentially." }
                    };

                    var minFtdCountValidationResult = ValidateField(
                        isCheckedMinFdm,
                        tierSettings,
                        x => x.MinFTDCount,
                        0,
                        Validation.InfinityFTDCount,
                        minFtdMessages
                    );

                    if (!minFtdCountValidationResult.IsSuccessful)
                    {
                        UpdateResult(result, minFtdCountValidationResult.Message);
                    }

                    var minTotalDepositMessages = new Dictionary<string, string>
                    {
                        { "greaterThanMin", "Min Total Deposit (New Player) must be greater than 0." },
                        { "lesserThanMax", "Min Total Deposit (New Player) must be lesser than or equal to 100,000,000,000." },
                        { "mustIncreaseSequentially", "The values in the Min Total Deposit (New Player) column must increase sequentially." }
                    };

                    var minTotalDepositValidationResult = ValidateField(
                        isCheckedMinTotalDeposit,
                        tierSettings,
                        x => x.MinTotalDeposit,
                        0m,
                        Validation.InfinityAmount,
                        minTotalDepositMessages
                    );

                    if (!minTotalDepositValidationResult.IsSuccessful)
                    {
                        UpdateResult(result, minTotalDepositValidationResult.Message);
                    }
                }

                index++;
            }

            return result;
        }

        private static ResultInfo ValidateMinAmount(IEnumerable<TierSettingParam> tierSettings)
        {
            var result = new ResultInfo();

            if (tierSettings == null || !tierSettings.Any())
            {
                UpdateResult(result, "Tier Setting must have at least 1 tier!");
                return result;
            }

            var firsMinAmount = tierSettings.First().MinAmount;
            if (firsMinAmount != 0 && firsMinAmount != Validation.NegativeInfinityAmount)
            {
                UpdateResult(result, "The first Tier of the Min Net Win column must be = 0 or -∞");
                return result;
            }

            if (IsMinNetWinNotStartFromOneAfterNegative(tierSettings))
            {
                UpdateResult(result, "The next Tier after a negative Tier must start from 1 in the Min Net Win column.");
                return result;
            }

            if (IsNotIncreaseSequentially(tierSettings, x => x.MinAmount))
            {
                UpdateResult(result, "The values in the Min Net Win column must increase sequentially.");
                return result;
            }

            if (tierSettings.Any(item => item.MinAmount < Validation.NegativeInfinityAmount))
            {
                UpdateResult(result, "Min Net Win must be greater than or equal to -100,000,000,000");
                return result;
            }

            if (tierSettings.Any(item => item.MinAmount > Validation.InfinityAmount))
            {
                UpdateResult(result, "Min Amount must be lesser than or equal to 100,000,000,000");
                return result;
            }

            return result;
        }

        private static ResultInfo ValidateAllTierSettingsMatchGroupProduct1(
            int index,
            List<TierSettingParam> groupTiers,
            List<TierSettingParam> firstGroupTiers,
            bool isCheckedMinFTDCount,
            bool isCheckedMinTotalDeposit
        )
        {
            if (index != 0 && !IsGroup2MatchGroup1(groupTiers, firstGroupTiers, isCheckedMinFTDCount, isCheckedMinTotalDeposit))
            {
                return new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = $"Product Group {index + 1} has different Min Total FTD Count or Min Total Deposit (New Player) values in some tiers compared to Product Group 1."
                };
            }

            return new ResultInfo
            {
                Code = 0,
                Message = string.Empty
            };
        }

        private static bool IsGroup2MatchGroup1(
            List<TierSettingParam> group2,
            List<TierSettingParam> group1,
            bool isCheckedMinFTDCount,
            bool isCheckedMinTotalDeposit
        )
        {
            if (group2.Count > group1.Count)
            {
                return false;
            }

            int group1Index = 0;

            foreach (var item2 in group2)
            {
                bool found = false;

                while (group1Index < group1.Count)
                {
                    var item1 = group1[group1Index++];

                    bool isMinFTDCountMatch = !isCheckedMinFTDCount || item1.MinFTDCount == item2.MinFTDCount;
                    bool isMinTotalDepositMatch = !isCheckedMinTotalDeposit || item1.MinTotalDeposit == item2.MinTotalDeposit;

                    if (isMinFTDCountMatch && isMinTotalDepositMatch)
                    {
                        found = true;
                        break;
                    }
                }

                if (!found)
                {
                    return false;
                }
            }

            return true;
        }

        private static ResultInfo ValidateField<T>(
            bool isChecked,
            IEnumerable<TierSettingParam> tierSettings,
            Func<TierSettingParam, T> selector,
            T minValue,
            T maxValue,
            IDictionary<string, string> messages
        ) where T : IComparable<T>
        {
            var result = new ResultInfo();
            if (!isChecked)
            {
                return result;
            }

            const string groupProductName = "Product Group 1";

            if (tierSettings.Any(item => selector(item).CompareTo(minValue) < 0))
            {
                UpdateResult(result, $"{groupProductName} - {messages["greaterThanMin"]}");
            }

            if (tierSettings.Any(item => selector(item).CompareTo(maxValue) > 0))
            {
                UpdateResult(result, $"{groupProductName} - {messages["lesserThanMax"]}");
            }

            if (IsNotIncreaseSequentially(tierSettings, selector))
            {
                UpdateResult(result, $"{groupProductName} - {messages["mustIncreaseSequentially"]}");
            }

            return result;
        }


        private static bool IsNotIncreaseSequentially<T>(IEnumerable<TierSettingParam> tierSettingList, Func<TierSettingParam, T> selector) where T : IComparable<T>
        {
            var tierSettingArray = tierSettingList.ToArray();
            for (var i = 1; i < tierSettingArray.Length; i++)
            {
                var current = selector(tierSettingArray[i]);
                var previous = selector(tierSettingArray[i - 1]);

                if (current.CompareTo(previous) <= 0)
                {
                    return true;
                }
            }

            return false;
        }

        private static bool IsMinNetWinNotStartFromOneAfterNegative(IEnumerable<TierSettingParam> tierSettingList)
        {
            TierSettingParam previous = null;

            foreach (var tierSetting in tierSettingList)
            {
                var minAmount = tierSetting.MinAmount;

                if (previous != null && previous.MinAmount < 0 && (minAmount == 0 || minAmount > 1))
                {
                    return true;
                }
                previous = tierSetting;
            }

            return false;
        }

        private ResultInfo ValidateDeductionList(IEnumerable<DeductionSettingParam> deductionList, IEnumerable<string> productIdOfDB, string message)
        {
            var result = new ResultInfo
            {
                Code = ErrCode.GeneralErrorCode,
                Message = message
            };

            if (deductionList == null || !deductionList.Any())
            {
                return result;
            }

            if (deductionList.Any(item => string.IsNullOrEmpty(item.ProductIds)))
            {
                return deductionList.Count() == Validation.OnlyOneRow ? new ResultInfo() : result;
            }

            var productIdOfDeduction = string.Join(",", deductionList.Select(p => p.ProductIds.Replace(" ", "")))
                                        .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            var distinctProductIdOfPlatform = productIdOfDeduction.Distinct();

            if (distinctProductIdOfPlatform.Any(item => !productIdOfDB.Contains(item)))
            {
                return result;
            }

            return new ResultInfo();
        }

        private static ResultInfo ValidateFixedAmountDeductedFee(TierDeductionSettingParam deductedFee, string message)
        {
            var result = new ResultInfo
            {
                Code = ErrCode.GeneralErrorCode,
                Message = message
            };

            if (!deductedFee.IsDeductedPercent)
            {
                try
                {
                    var deductedAmount = Convert.ToDecimal(deductedFee.DeductedAmount);

                    if (deductedAmount < 0 || deductedAmount > Money.AllowedMaxValue)
                    {
                        return result;
                    }
                }
                catch
                {
                    return result;
                }
            }

            return new ResultInfo();
        }

        private ResultInfo ValidateGroupType(int groupTypeId)
        {
            var commGroupTypeList = _commGroupCommonService.GetCommGroupTypes();

            var groupType = commGroupTypeList.FirstOrDefault(_ => _.GroupTypeId == groupTypeId);

            var result = new ResultInfo();

            if (groupType is null)
            {
                UpdateResult(result, CommGroupErrorMessage.InvalidGroupType);
            }

            return result;
        }

        private static void UpdateResult(ResultInfo initialResult, string message)
        {
            initialResult.Code = ErrCode.GeneralErrorCode;
            initialResult.Message = string.Join(initialResult.Message + brElementHtml, message);
        }
    }
}
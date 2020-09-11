using System;
using System.Collections.Generic;
using System.Linq;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.CommissionGroup;
using Fanex.Affiliate.Admin.Core.Repository;

namespace Fanex.Affiliate.Admin.Core.Utilities.CommGroup
{
    public class CommGroupValidationHelper : ICommGroupValidation
    {
        private const string brElementHtml = "<br />";

        private readonly IProductRepository _productRepository;

        public CommGroupValidationHelper(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public ResultInfo ValidateCommGroup(CommissionGroupSetting commGroup)
        {
            var result = ValidateAllFees(commGroup);

            var validateTierSettingList = ValidateTierSettingList(commGroup.TierSettingList);

            if(!validateTierSettingList.IsSuccessful)
            {
                result.Code = Code.GeneralErrorCode;
                result.Message = string.Join(result.Message, validateTierSettingList.Message);
            }

            return result;
        }

        private ResultInfo ValidateAllFees(CommissionGroupSetting commGroup)
        {
            var result = new ResultInfo();

            var validatePlatformFeeList = ValidatePlatformFeeList(commGroup.PlatformFeeList);

            if(!validatePlatformFeeList.IsSuccessful)
            {
                result.Code = Code.GeneralErrorCode;
                result.Message = validatePlatformFeeList.Message;
            }

            var validateOperationalFee = ValidateFixedAmountDeductedFee(commGroup.OperationalFee, CommGroupErrorMessage.InvalidOperationalFee);

            if (!validateOperationalFee.IsSuccessful)
            {
                result.Code = Code.GeneralErrorCode;
                result.Message = string.Join(result.Message + brElementHtml, validateOperationalFee.Message);
            }

            var validateDepositFee = ValidateFixedAmountDeductedFee(commGroup.DepositFee, CommGroupErrorMessage.InvalidDepositFee);

            if (!validateDepositFee.IsSuccessful)
            {
                result.Code = Code.GeneralErrorCode;
                result.Message = string.Join(result.Message + brElementHtml, validateDepositFee.Message);
            }

            var validateWithdrawalFee = ValidateFixedAmountDeductedFee(commGroup.WithdrawalFee, CommGroupErrorMessage.InvalidWithdrawalFee);

            if (!validateWithdrawalFee.IsSuccessful)
            {
                result.Code = Code.GeneralErrorCode;
                result.Message = string.Join(result.Message + brElementHtml, validateWithdrawalFee.Message);
            }

            return result;
        }

        private ResultInfo ValidatePlatformFeeList(IEnumerable<DeductionSetting> platformFeeList)
        {
            var result = new ResultInfo
            {
                Code = Code.GeneralErrorCode,
                Message = CommGroupErrorMessage.InvalidPlatformFee
            };

            if (platformFeeList == null || !platformFeeList.Any() || platformFeeList.Any(item => string.IsNullOrEmpty(item.ProductIds)))
            {
                return result;
            }

            var productIdOfDB = _productRepository.GetProductList().Select(p => p.ProductId.ToString());
            var productIdOfPlatform = string.Join(",", platformFeeList.Select(p => p.ProductIds.Replace(" ", "")))
                                        .Split(new[] { ',' }, System.StringSplitOptions.RemoveEmptyEntries);

            var productIdValidation = ValidateProductIds(productIdOfDB, productIdOfPlatform);
            if (!productIdValidation.IsSuccessful)
            {
                return result;
            }

            return new ResultInfo();
        }

        private static ResultInfo ValidateTierSettingList(IEnumerable<TierSetting> tierSettingList)
        {
            var result = new ResultInfo();

            if (tierSettingList == null || !tierSettingList.Any())
            {
                result.Code = Code.GeneralErrorCode;
                result.Message = string.Join(result.Message + brElementHtml, "Tier Setting must have at least 1 tier!");
                return result;
            }

            if (!tierSettingList.Any(item => (item.MaxAmount == Validation.InfinityAmount && item.MaxAp == Validation.InfinityQualifiedMember)))
            {
                result.Code = Code.GeneralErrorCode;
                result.Message = string.Join(result.Message + brElementHtml, "Last Tier Setting must have maximum value=∞!");
                return result;
            }

            if (tierSettingList.Any(item => item.MinAmount > item.MaxAmount))
            {
                result.Code = Code.GeneralErrorCode;
                result.Message = string.Join(result.Message + brElementHtml, "Max Amount must be greater than or equal to Min Amount!");
                return result;
            }

            if (tierSettingList.Any(item => item.MinAp > item.MaxAp))
            {
                result.Code = Code.GeneralErrorCode;
                result.Message = string.Join(result.Message + brElementHtml, "Min AP must be lesser than or equal to 1,000,000,000!");
            }

            return result;
        }

        private static ResultInfo ValidateProductIds(IEnumerable<string> productIdOfDB, IEnumerable<string> productIdOfPlatform)
        {
            var result = new ResultInfo { Code = Code.GeneralErrorCode };

            var inputProductIdListCount = productIdOfPlatform.Count();
            if (productIdOfDB.Count() != inputProductIdListCount)
            {
                return result;
            }

            var distinctProductIdOfPlatform = productIdOfPlatform.Distinct();
            if (inputProductIdListCount != distinctProductIdOfPlatform.Count() ||
                distinctProductIdOfPlatform.Any(item => !productIdOfDB.Contains(item)))
            {
                return result;
            }

            return new ResultInfo();
        }

        private static ResultInfo ValidateFixedAmountDeductedFee(DeductionSetting deductedFee, string message)
        {
            var result = new ResultInfo
            {
                Code = Code.GeneralErrorCode,
                Message = message
            };

            if(!deductedFee.IsDeductedPercent)
            {
                try
                {
                    var deductedAmount = Convert.ToDecimal(deductedFee.DeductedAmount);

                    if(deductedAmount < 0 || deductedAmount > Money.AllowedMaxValue)
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
    }
}
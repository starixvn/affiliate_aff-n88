import { deductionNameList, messages, money, INFINITY_QM, INFINITY_FTD_COUNT, INFINITY_TOTAL_DEPOSIT, defaultSubAffCommRate, regExp, regexValidNegativeAmount, tierSettingDefault } from './constant';

const emptyCommGroup = {
    GroupId: 0,
    GroupTypeId: 1,
    GroupName: '',
    Description: '',
    QmTurnover: 100,
    SubAffCommRate: defaultSubAffCommRate,
    IsActivePlayerSum: true,
    IsCheckedMinFTDCount: false,
    IsCheckedMinTotalDeposit: false,
    TierSettingList: [{ ...tierSettingDefault }],
    PlatformFeeList: [],
    DepositFee: {},
    WithdrawalFee: {}
}

export const buildDefaultCommGroup = (deductionList, productList) => {
    const deductionSetting = getDeductionSetting(deductionList);

    const { platformFeeSetting, killRateFeeSetting } = deductionSetting;
    const platformFeeList = buildProductGroupsDeductionFeeList(productList, platformFeeSetting);
    const killRateFeeList = buildProductGroupsDeductionFeeList([], killRateFeeSetting);

    const depositFee = createDefaultDepositSetting(deductionSetting.depositFeeSetting);
    const withdrawalFee = createDefaultWithdrawalSetting(deductionSetting.withdrawalFeeSetting);

    return Object.assign({}, emptyCommGroup, {
        PlatformFeeList: platformFeeList,
        KillRateFeeList: killRateFeeList,
        DepositFee: depositFee,
        WithdrawalFee: withdrawalFee
    });
}

export const getDeductionSetting = (deductionList) => {
    const deductionObj = convertDeductionList(deductionList);
    const platformFeeSetting = deductionObj[deductionNameList.platformFee];
    const killRateFeeSetting = deductionObj[deductionNameList.killRate]
    const depositFeeSetting = deductionObj[deductionNameList.depositFee];
    const withdrawalFeeSetting = deductionObj[deductionNameList.withdrawalFee];

    return {
        platformFeeSetting,
        killRateFeeSetting,
        depositFeeSetting,
        withdrawalFeeSetting
    }
}

export const createDefaultDepositSetting = (depositFeeSetting) => {
    return {
        DeductionId: depositFeeSetting.DeductionId,
        ProductIds: 0,
        DeductedPercentage: depositFeeSetting.DeductedPercentage,
        DeductedAmount: depositFeeSetting.DeductedAmount,
        IsDeductedPercent: depositFeeSetting.IsDeductedPercent
    }
}

export const createDefaultWithdrawalSetting = (withdrawalFeeSetting) => {
    return {
        DeductionId: withdrawalFeeSetting.DeductionId,
        ProductIds: 0,
        DeductedPercentage: withdrawalFeeSetting.DeductedPercentage,
        DeductedAmount: withdrawalFeeSetting.DeductedAmount,
        IsDeductedPercent: withdrawalFeeSetting.IsDeductedPercent
    }
}

export const buildProductGroupsDeductionFeeList = (platformFeeProductList, feeSetting) => {
    const products = convertProductList(platformFeeProductList);
    return [{
        GroupProductId: 0,
        DeductionId: feeSetting.DeductionId,
        ProductIds: products.map(p => p.ProductId).join(','),
        DeductedPercentage: feeSetting.DeductedPercentage,
        DeductedAmount: feeSetting.DeductedAmount,
        IsDeductedPercent: feeSetting.IsDeductedPercent
    }];
}

export const createDefaultProductGroupsDeductionFee = (productList, feeSetting) => {
    return {
        deductionId: feeSetting.DeductionId,
        productList: convertProductList(productList),
        deductedPercentage: feeSetting.DeductedPercentage
    };
}

export const convertDeductionList = (deductionList) => {
    const deductions = {};
    for (let item of deductionList) {
        deductions[item.DeductionName] = item;
    }

    return deductions;
}

export const convertProductList = (productList, productIds = '') => {
    const idList = productIds.split(',').filter(p => !!p);
    const isCheckAll = idList.length === productList.length;

    return productList.map(item => {
        return {
            ProductId: item.ProductId,
            ProductName: item.ProductName,
            Checked: isCheckAll || idList.filter(i => Number(i) === item.ProductId).length > 0
        }
    })
}

export const convertStringToArrayNumber = (stringIds) => {
    return stringIds.split(',').filter(id => !!id).map(i => Number(i));
}

export const validate = (selectedGroup) => {
    const { GroupName, TierSettingList, PlatformFeeList, DepositFee, WithdrawalFee, IsCheckedMinFTDCount, IsCheckedMinTotalDeposit } = selectedGroup;

    const groupNameValidation = validateGroupName(GroupName);
    const tierSettingValidation = validateTierSettingList(TierSettingList, IsCheckedMinFTDCount, IsCheckedMinTotalDeposit);
    const selectedProductValidation = validateItemMustHaveAProduct(PlatformFeeList);
    const depositFeeValidation = validateDeductedFees(DepositFee, messages.requireDepositAmount, messages.invalidDepositAmount);
    const withdrawalFeeValidation = validateDeductedFees(WithdrawalFee, messages.requireWithdrawalAmount, messages.invalidWithdrawalAmount);

    const isValid = groupNameValidation.isValid && tierSettingValidation.isValid && selectedProductValidation.isValid
        && depositFeeValidation.isValid && withdrawalFeeValidation.isValid;
    const messageList = [...groupNameValidation.messageList, ...tierSettingValidation.messageList, ...selectedProductValidation.messageList,
    ...depositFeeValidation.messageList, ...withdrawalFeeValidation.messageList
    ];

    return { isValid, messageList };
}

export const validateDeductedFees = (deductedFee, requiredMessage, invalidMessage) => {
    let isValid = true;
    const messageList = [];

    if (!deductedFee.IsDeductedPercent) {
        let deductionAmount = deductedFee.DeductedAmount && deductedFee.DeductedAmount.replace(/,/g, '');
        if (!deductionAmount) {
            isValid = false;
            messageList.push(requiredMessage);
        } else {
            const regexValidAmount = new RegExp(regExp.validAmount);
            if (!regexValidAmount.test(deductionAmount)) {
                isValid = false;
                messageList.push(invalidMessage);
            }
        }
    }

    return { isValid, messageList };
}

export const validateGroupName = (groupName) => {
    let isValid = true;
    const messageList = [];

    if (!groupName) {
        isValid = false;
        messageList.push(messages.requireGroupName);
    }

    return { isValid, messageList };
}

export const validateTierSettingList = (tierSettingList, isCheckedMinFTDCount, isCheckedMinTotalDeposit) => {
    let isValid = true;
    const messageList = [];

    const tierSettingListByGroupProduct = handleGroupBy(tierSettingList, "GroupProductId");

    Object.values(tierSettingListByGroupProduct).forEach((tierSettings, i) => {
        const groupProductName = `Product Groups ${i + 1}`;

        if (tierSettings.length === 0) {
            isValid = false;
            messageList.push(`${groupProductName} - ${messages.requireTier}`);
        } else {
            const firstMinAmount = tierSettings[0].MinAmount;

            if (!regexValidNegativeAmount.test(firstMinAmount) && Number(firstMinAmount) != 0 && Number(firstMinAmount) != money.AllowedMinValue) {
                isValid = false;
                messageList.push(`${groupProductName} - ${messages.minNetWinFirstMustBeZero}`);
            } else if (isMinNetWinNotStartFromOneAfterNegative(tierSettings)) {
                isValid = false;
                messageList.push(`${groupProductName} - ${messages.minNetWinMustStartFromOne}`);
            } else if (isNotIncreaseSequentially(tierSettings, 'MinAmount')) {
                isValid = false;
                messageList.push(`${groupProductName} - ${messages.minNetWinMustIncreaseSequentially}`);
            } else if (tierSettings.filter(item => item.MinAmount < money.AllowedMinValue).length > 0) {
                isValid = false;
                messageList.push(`${groupProductName} - ${messages.minNetWinGreaterThanNegativeInfinity}`);
            } else if (tierSettings.filter(item => item.MinAmount > money.AllowedMaxValue).length > 0) {
                isValid = false;
                messageList.push(`${groupProductName} - ${messages.minNetWinLesserThanInfinity}`);
            }

            if (tierSettings.filter(item => item.MinQm > INFINITY_QM).length > 0) {
                isValid = false;
                messageList.push(`${groupProductName} - ${messages.qmConstrain}`);
            }

            const allTierSettingsMatchGroupProduct1 = validateAllTierSettingsMatchGroupProduct1(i, tierSettings, tierSettingListByGroupProduct[1], isCheckedMinFTDCount, isCheckedMinTotalDeposit);
            if (!allTierSettingsMatchGroupProduct1.isValid) {
                isValid = false;
                messageList.push(...allTierSettingsMatchGroupProduct1.messageList);
            }

            const validateField = (isChecked, fieldName, minValue, maxValue, messagesMap) => {
                if (!isChecked) return;

                if (tierSettings.some(item => item[fieldName] <= minValue)) {
                    isValid = false;
                    messageList.push(`${groupProductName} - ${messagesMap.greaterThanMin}`);
                } else if (tierSettings.some(item => item[fieldName] > maxValue)) {
                    isValid = false;
                    messageList.push(`${groupProductName} - ${messagesMap.lesserThanMax}`);
                } else if (isNotIncreaseSequentially(tierSettings, fieldName)) {
                    isValid = false;
                    messageList.push(`${groupProductName} - ${messagesMap.mustIncreaseSequentially}`);
                }
            };

            if (i === 0) {
                validateField(isCheckedMinFTDCount, 'MinFTDCount', 0, INFINITY_FTD_COUNT,
                    {
                        greaterThanMin: messages.minFTDCountGreaterThanZero,
                        lesserThanMax: messages.minFTDCountLesserThanInfinity,
                        mustIncreaseSequentially: messages.minFTDCountMustIncreaseSequentially
                    }
                );

                validateField(isCheckedMinTotalDeposit, 'MinTotalDeposit', 0, INFINITY_TOTAL_DEPOSIT,
                    {
                        greaterThanMin: messages.minTotalDepositGreaterThanZero,
                        lesserThanMax: messages.minTotalDepositLesserThanInfinity,
                        mustIncreaseSequentially: messages.minTotalDepositMustIncreaseSequentially
                    }
                );
            }
        }
    });

    return { isValid, messageList };
}

// Start validate all tier settings match group product 1
const validateAllTierSettingsMatchGroupProduct1 = (index, groupTiers, firstGroupTiers, isCheckedMinFTDCount, isCheckedMinTotalDeposit) => {
    let isValid = true;
    const messageList = [];

    if (index !== 0 && !isGroup2MatchGroup1(groupTiers, firstGroupTiers, isCheckedMinFTDCount, isCheckedMinTotalDeposit)) {
        isValid = false;
        messageList.push(messages.requireAllTierSettingsMatchGroupProduct1.replace('{0}', index + 1));
    }

    return { isValid, messageList };
}

const isGroup2MatchGroup1 = (group2, group1, isCheckedMinFTDCount, isCheckedMinTotalDeposit) => {
    if (group2.length > group1.length) return false;

    let group1Index = 0;

    for (const item2 of group2) {
        let found = false;

        while (group1Index < group1.length) {
            const item1 = group1[group1Index++];

            const isMinFTDCountMatch = !isCheckedMinFTDCount || item1.MinFTDCount === item2.MinFTDCount;
            const isMinTotalDepositMatch = !isCheckedMinTotalDeposit || item1.MinTotalDeposit === item2.MinTotalDeposit;

            if (isMinFTDCountMatch && isMinTotalDepositMatch) {
                found = true;
                break;
            }
        }

        if (!found) return false;
    }

    return true;
};
// End validate all tier settings match group product 1

export const validateItemMustHaveAProduct = (platformFeeList) => {
    let isValid = true;

    if (platformFeeList.length > 1 && platformFeeList.filter(item => !item.ProductIds).length > 0) {
        isValid = false;
    }

    return { isValid, messageList: isValid ? [] : [messages.requireSelectedProduct] };
}

export const removeTierItem = (tierId, groupProductId, dataList) => {
    return dataList.filter(item => !(item.TierId === tierId && item.GroupProductId === groupProductId));
}

export const handleKillRateListData = (platformFeeList, killRateFeeList) => {
    return platformFeeList.map((item, index) => {
        return {
            ProductIds: item.ProductIds,
            DeductedPercentage: killRateFeeList[index].DeductedPercentage,
            DeductionId: killRateFeeList[index].DeductionId,
            GroupProductId: item.GroupProductId,
            IsDeductedPercent: item.IsDeductedPercent
        }
    });
}

const isNotIncreaseSequentially = (tierSettingList, propName) => {
    return tierSettingList.some((tier, i) => i != 0 && Number(tier[propName]) <= Number(tierSettingList[i - 1][propName]));
}

const isMinNetWinNotStartFromOneAfterNegative = (tierSettingList) => {
    return tierSettingList.some((tier, i) => {
        const minAmount = Number(tier.MinAmount);

        return i != 0 && Number(tierSettingList[i - 1].MinAmount) < 0 && (minAmount == 0 || minAmount > 1);
    });
}

const handleGroupBy = (items, key) => {
    return items.reduce(function (result, item) {
        (result[item[key]] ??= []).push(item);
        return result;
    }, {});
};
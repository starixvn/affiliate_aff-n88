import { deductionNameList, messages, INFINITY_AM, INFINITY_QM, regExp } from './constant';

const emptyCommGroup = {
    GroupId: 0,
    GroupName: '',
    Description: '',
    TierSettingList: [],
    PlatformFeeList: [],
    OperationalFee: {},
    DepositFee: {},
    WithdrawalFee: {}
}

export const buildDefaultCommGroup = (deductionList, productList) => {
    const deductionSetting = getDeductionSetting(deductionList);

    const platformFeeParam = { productList, deductionSetting, platformFeeList: [] };
    const platformFeeList = buildPlatformFeeList(platformFeeParam);

    const operationalFee = createDefaultOperationalSetting(deductionSetting.operationalFeeSetting);
    const depositFee = createDefaultDepositSetting(deductionSetting.depositFeeSetting);
    const withdrawalFee = createDefaultWithdrawalSetting(deductionSetting.withdrawalFeeSetting);

    return Object.assign({}, emptyCommGroup, {
        PlatformFeeList: platformFeeList,
        OperationalFee: operationalFee,
        DepositFee: depositFee,
        WithdrawalFee: withdrawalFee
    });
}

export const getDeductionSetting = (deductionList) => {
    const deductionObj = convertDeductionList(deductionList);
    const platformFeeSetting = deductionObj[deductionNameList.platformFee];
    const operationalFeeSetting = deductionObj[deductionNameList.operationalFee];
    const depositFeeSetting = deductionObj[deductionNameList.depositFee];
    const withdrawalFeeSetting = deductionObj[deductionNameList.withdrawalFee];

    return {
        platformFeeSetting,
        operationalFeeSetting,
        depositFeeSetting,
        withdrawalFeeSetting
    }
}

export const createDefaultOperationalSetting = (operationalFeeSetting) => {
    return {
        DeductionId: operationalFeeSetting.DeductionId,
        ProductIds: 0,
        DeductedPercentage: operationalFeeSetting.DeductedPercentage,
        DeductedAmount: operationalFeeSetting.DeductedAmount,
        IsDeductedPercent: operationalFeeSetting.IsDeductedPercent
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

export const buildPlatformFeeList = ({ productList, deductionSetting, productIds, platformFeeList = [] }) => {
    const { platformFeeSetting } = deductionSetting;

    const products = convertProductList(productList, productIds);
    return !!platformFeeList.length ? platformFeeList : [{
        DeductionId: platformFeeSetting.DeductionId,
        ProductIds: products.map(p => p.ProductId).join(','),
        DeductedPercentage: platformFeeSetting.DeductedPercentage,
        DeductedAmount: platformFeeSetting.DeductedAmount,
        IsDeductedPercent: platformFeeSetting.IsDeductedPercent
    }];
}

export const createDefaultPlatformfee = (productList, platformFeeSetting) => {
    return {
        deductionId: platformFeeSetting.DeductionId,
        productList: convertProductList(productList),
        commission: platformFeeSetting.DeductedPercentage
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

    const idList = Array.isArray(productIds) ? productIds : productIds.split(',').filter(p => !!p);
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
    const { GroupName, TierSettingList, PlatformFeeList, OperationalFee, DepositFee, WithdrawalFee } = selectedGroup;

    const groupNameValidation = validateGroupName(GroupName);
    const tierSettingValidation = validateTierSettingList(TierSettingList);
    const platformFeeListValidation = validatePlatformFeeList(PlatformFeeList);
    const operationalFeeValidation = validateDeductedFees(OperationalFee, messages.requireOperationalAmount, messages.invalidOperationalAmount);
    const depositFeeValidation = validateDeductedFees(DepositFee, messages.requireDepositAmount, messages.invalidDepositAmount);
    const withdrawalFeeValidation = validateDeductedFees(WithdrawalFee, messages.requireWithdrawalAmount, messages.invalidWithdrawalAmount);

    const isValid = groupNameValidation.isValid && tierSettingValidation.isValid && platformFeeListValidation.isValid
        && operationalFeeValidation.isValid && depositFeeValidation.isValid && withdrawalFeeValidation.isValid;
    const messageList = [...groupNameValidation.messageList, ...tierSettingValidation.messageList, ...platformFeeListValidation.messageList,
        ...operationalFeeValidation.messageList, ...depositFeeValidation.messageList, ...withdrawalFeeValidation.messageList
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

export const validateTierSettingList = (tierSettingList) => {
    let isValid = true;
    const messageList = [];

    if (tierSettingList.length === 0) {
        isValid = false;
        messageList.push(messages.requireTier);
    } else if (tierSettingList.filter(item => item.MaxAmount === INFINITY_AM && item.MaxAp === INFINITY_QM).length === 0) {
        isValid = false;
        messageList.push(messages.requireInfinity);
    } else if (tierSettingList.filter(item => item.MinAmount > item.MaxAmount).length > 0) {
        isValid = false;
        messageList.push(messages.amountConstrain);
    } else if (tierSettingList.filter(item => item.MinAp > item.MaxAp).length > 0) {
        isValid = false;
        messageList.push(messages.qmConstrain);
    }

    return { isValid, messageList };
}

export const validatePlatformFeeList = (platformFeeList) => {
    let isValid = true;
    const messageList = [];

    if (platformFeeList.filter(item => !item.ProductIds).length > 0) {
        isValid = false;
        messageList.push(messages.requireSelectedProduct);
    }

    return { isValid, messageList };
}
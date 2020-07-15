import { deductionNameList, messages, INFINITY_AM, INFINITY_QM, regExp } from './constant';

const emptyCommGroup = {
    GroupId: 0,
    GroupName: '',
    Description: '',
    TierSettingList: [],
    PlatformFeeList: [],
    OperationalFee: {},
    BankingFee: {}
}

export const buildDefaultCommGroup = (deductionList, productList) => {
    const deductionSetting = getDeductionSetting(deductionList);

    const platformFeeParam = { productList, deductionSetting, platformFeeList: [] };
    const platformFeeList = buildPlatformFeeList(platformFeeParam);

    const operationalFee = createDefaultOperationalSetting(deductionSetting.operationalFeeSetting);
    const bankingFee = createDefaultBankingSetting(deductionSetting.bankingFeeSetting);

    return Object.assign({}, emptyCommGroup, {
        PlatformFeeList: platformFeeList,
        OperationalFee: operationalFee,
        BankingFee: bankingFee
    });
}

export const getDeductionSetting = (deductionList) => {
    const deductionObj = convertDeductionList(deductionList);
    const platformFeeSetting = deductionObj[deductionNameList.platformFee];
    const operationalFeeSetting = deductionObj[deductionNameList.operationalFee];
    const bankingFeeSetting = deductionObj[deductionNameList.bankingFee];

    return {
        platformFeeSetting,
        operationalFeeSetting,
        bankingFeeSetting
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

export const createDefaultBankingSetting = (bankingFeeSetting) => {
    return {
        DeductionId: bankingFeeSetting.DeductionId,
        ProductIds: 0,
        DeductedPercentage: bankingFeeSetting.DeductedPercentage,
        DeductedAmount: bankingFeeSetting.DeductedAmount,
        IsDeductedPercent: bankingFeeSetting.IsDeductedPercent
    }
}

export const buildPlatformFeeList = ({ productList, deductionSetting, productIds, platformFeeList = [] }) => {
    const { platformFeeSetting } = deductionSetting;

    const products = convertProductList(productList, productIds);
    const convertedPlatformFeeList = platformFeeList.length ? platformFeeList : [{
        DeductionId: platformFeeSetting.DeductionId,
        ProductIds: products.map(p => p.ProductId).join(','),
        DeductedPercentage: platformFeeSetting.DeductedPercentage,
        DeductedAmount: platformFeeSetting.DeductedAmount,
        IsDeductedPercent: platformFeeSetting.IsDeductedPercent
    }];

    return convertedPlatformFeeList;
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
    for (let i = 0; i < deductionList.length; i++) {
        const item = deductionList[i];
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

export const validate = (selectedGroup) => {
    const { GroupName, TierSettingList, PlatformFeeList, OperationalFee, BankingFee } = selectedGroup;

    const groupNameValidation = validateGroupName(GroupName);
    const tierSettingValidation = validateTierSettingList(TierSettingList);
    const platformFeeListValidation = validatePlatformFeeList(PlatformFeeList);
    const operationalFeeValidation = validateDeductedFees(OperationalFee, messages.requireOperationalAmount, messages.invalidOperationalAmount);
    const bankingFeeValidation = validateDeductedFees(BankingFee, messages.requireBankingAmount, messages.invalidBankingAmount);

    const isValid = groupNameValidation.isValid && tierSettingValidation.isValid && platformFeeListValidation.isValid
        && operationalFeeValidation.isValid && bankingFeeValidation.isValid;
    const messageList = [...groupNameValidation.messageList, ...tierSettingValidation.messageList, ...platformFeeListValidation.messageList,
        ...operationalFeeValidation.messageList, ...bankingFeeValidation.messageList
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
    } else if (tierSettingList.filter(item => item.MaxAmount === INFINITY_AM && item.MaxAm === INFINITY_QM).length === 0) {
        isValid = false;
        messageList.push(messages.requireInfinity);
    } else if (tierSettingList.filter(item => item.MinAmount > item.MaxAmount).length > 0) {
        isValid = false;
        messageList.push(messages.amountConstrain);
    } else if (tierSettingList.filter(item => item.MinAm > item.MaxAm).length > 0) {
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
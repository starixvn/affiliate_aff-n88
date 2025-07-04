import {
    messageList,
    regexEmail,
    countriesList,
    requiredFieldList,
    requiredBankTranferList,
    playerMethod,
    moneybookersMethod,
    wireMethod
} from './constants'

const getMessage = (fieldName, value) => {
    return value === '' ? messageList[fieldName] + "<br />" : '';
}

const getMessageIfEmpty = (fieldName, value) => {
    return !value ? messageList[fieldName] + "<br />" : '';
}

const validateContactApps = (contactApps, isMarketingAccount) => {
    if (isMarketingAccount) {
        return ""
    }

    const isTelegramInvalid = (value) => value && (!value.startsWith('@') || value.length <= 1);

    if (!Array.isArray(contactApps)
        || contactApps.length === 0
        || (contactApps.length === 1 && contactApps[0].Name === 'Skype')) {
        return message = 'At least one IM account is required';
    }

    const getValue = name => contactApps.find(a => a.Name === name)?.Value?.trim() || '';
    const contactNotSkype = contactApps.filter(a => a.Name !== 'Skype');

    if (contactNotSkype.length === 1) {
        const { Name } = contactNotSkype[0];
        const value = getValue(Name);

        if (!value) {
            return message = `${Name} is required`;
        }
    }

    if (contactNotSkype.every(a => !a.Value?.trim())) {
        const names = contactNotSkype.map(a => a.Name).join(', ');
        return message = `Contact Apps (${names}): At least one IM account is required`;
    }

    const telegramValue = getValue('Telegram');
    if (isTelegramInvalid(telegramValue)) {
        return message = 'Telegram is invalid';
    }

    return message;
};

export const validateUserAccount = (userAccountInfo, moreSiteUrlsList, licenseeName) => {
    let message = '';
    const selectedField = userAccountInfo.HasWebSite ? 'SiteUrl' : `NoSiteDescription${licenseeName}`;

    message += validateEmail(userAccountInfo);
    message += validateGender(userAccountInfo);
    message += validateCountry(userAccountInfo);
    message += validateRequiredField(userAccountInfo, selectedField);
    message += validateContactApps(userAccountInfo.ContactAppList, userAccountInfo.IsMarketingAccount);
    message += validatePaymentMethods(userAccountInfo);
    message += validateEmptyUrl(moreSiteUrlsList);

    return {
        message: message,
        isValid: message === ''
    };
}

const validateEmail = (userAccountInfo) => {
    const checkEmail = new RegExp(regexEmail);
    const isValidEmail = !userAccountInfo.HasHostAffPersonalInfoPermission || checkEmail.test(userAccountInfo.Email);
    return isValidEmail ? "" : messageList.Email + "<br />";
}

const validateGender = (userAccountInfo) => {
    const isValidGender = userAccountInfo.Gender != null;
    return isValidGender ? "" : messageList.Gender + "<br />";
}

const validateCountry = (userAccountInfo) => {
    const country = countriesList[userAccountInfo.Country] === undefined ? "" : userAccountInfo.Country;
    return getMessage('Country', country);
}

const validateRequiredField = (userAccountInfo, selectedField) => {
    if (userAccountInfo.IsMarketingAccount) {
        return ""
    }

    const newRequiredFieldList = [...requiredFieldList, selectedField];
    return newRequiredFieldList.reduce((accumulator, field) => { return accumulator + getMessageIfEmpty(field, userAccountInfo[field]) }, '');
}

const validatePaymentMethods = (userAccountInfo) => {
    let message = '';

    if (userAccountInfo.IsMarketingAccount) {
        return ""
    }

    switch (userAccountInfo.PreferredPayment) {
        case playerMethod:
            message = getMessageIfEmpty('PlayerUsername', userAccountInfo.PlayerUsername);
            break;
        case moneybookersMethod:
            message = getMessageIfEmpty('MoneybookersEmail', userAccountInfo.MoneybookersEmail);
            break;
        case wireMethod:
            message = requiredBankTranferList.reduce((accumulator, field) => accumulator + getMessageIfEmpty(field, userAccountInfo[field]), '');
            break;
    }

    return message;
}

const validateEmptyUrl = (moreSiteUrlsList) => {
    const isExistEmptyUrl = moreSiteUrlsList.some(siteUrl => siteUrl.trim() === '');

    return isExistEmptyUrl ? `Website URL ${emptySiteUrlIndex + 2} is required<br />` : '';
}

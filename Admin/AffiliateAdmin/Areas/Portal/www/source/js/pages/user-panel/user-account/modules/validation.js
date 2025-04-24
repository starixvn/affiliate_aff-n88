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

const validateMoreSiteUrls = (moreSiteUrlsList) => {
    const moreSiteUrls = moreSiteUrlsList.map(siteUrl => siteUrl.trim());
    const emptySiteUrlIndex = moreSiteUrls.indexOf('');
    const hasEmptySiteUrl = emptySiteUrlIndex !== -1;
    const message = hasEmptySiteUrl ? `Website URL ${emptySiteUrlIndex + 2} is required<br />` : '';

    return {
        message,
        isValid: !hasEmptySiteUrl
    }
}

const validatePaymentMethod = (userAccountInfo) => {
    let message = '';
    let isValid = true;

    switch (userAccountInfo.PreferredPayment) {
        case playerMethod:
            message = getMessage('PlayerUsername', userAccountInfo.PlayerUsername);
            isValid = userAccountInfo.PlayerUsername !== '';
            break;
        case moneybookersMethod:
            message = getMessage('MoneybookersEmail', userAccountInfo.MoneybookersEmail);
            isValid = userAccountInfo.MoneybookersEmail !== '';
            break;
        case wireMethod:
            message = requiredBankTranferList.reduce((accumulator, field) => accumulator + getMessage(field, userAccountInfo[field]), '');
            isValid = userAccountInfo.BankName !== '' && userAccountInfo.BankAddress !== '' &&
                userAccountInfo.BankAccountName !== '' && userAccountInfo.BankAccountNumber !== '';
            break;
    }

    return {
        message,
        isValid
    };
}

const validateContactApps = (contactApps) => {
    const getValue = name => contactApps.find(a => a.Name === name)?.Value?.trim() || '';

    if (contactApps.length === 2 && contactApps[0].Name === 'Skype') {
        if (!contactApps[1].Value?.trim()) {
            return { message: `${contactApps[1].Name} is required`, isValid: false };
        }
    } else {
        const contactNotSkype = contactApps.filter(a => a.Name !== 'Skype');

        const allEmpty = contactNotSkype.every(a => !a.Value?.trim());
        if (allEmpty) {
            const names = contactNotSkype.map(a => a.Name).join(', ');
            return { message: `Contact Apps (${names}): At least one IM account is required`, isValid: false };
        }

        const telegram = getValue('Telegram');
        if (telegram && (!telegram.startsWith('@') || telegram.length <= 1)) {
            return { message: 'Telegram is invalid', isValid: false };
        }
    }

    return { message: '', isValid: true };
};



export const validateUserAccount = (userAccountInfo, moreSiteUrlsList, licenseeName) => {
    let message = '';
    const checkEmail = new RegExp(regexEmail);
    const isValidGender = userAccountInfo.Gender != null;
    const isValidEmail = checkEmail.test(userAccountInfo.Email);
    const country = countriesList[userAccountInfo.Country] === undefined ? "" : userAccountInfo.Country;
    const selectedField = userAccountInfo.HasWebSite ? 'SiteUrl' : `NoSiteDescription${licenseeName}`;

    const newRequiredFieldList = [...requiredFieldList, selectedField];
    message = isValidGender ? message : message + messageList.Gender + "<br />";
    message = isValidEmail ? message : message + messageList.Email + "<br />";
    message += getMessage('Country', country);

    const resultValidateContactApps = validateContactApps(userAccountInfo.ContactAppList);
    message += resultValidateContactApps.isValid ? '' : resultValidateContactApps.message + '<br />';

    message += newRequiredFieldList.reduce((accumulator, field) => { return accumulator + getMessage(field, userAccountInfo[field]) }, '');

    let isValid = isValidGender && isValidEmail && userAccountInfo.FirstName !== '' && userAccountInfo.LastName !== '' &&
        userAccountInfo.Phone !== '' && userAccountInfo.Address !== '' && userAccountInfo.City !== '' &&
        userAccountInfo.Postcode !== '' && userAccountInfo.Country !== '' && userAccountInfo[selectedField] !== '';

    const resultValidateMoreSiteUrls = (userAccountInfo.HasWebSite && moreSiteUrlsList) ? validateMoreSiteUrls(moreSiteUrlsList) : ({ message: '', isValid: true });
    const resultValidatePaymentMethod = validatePaymentMethod(userAccountInfo);

    return {
        message: message + resultValidateMoreSiteUrls.message + resultValidatePaymentMethod.message,
        isValid: isValid && resultValidateMoreSiteUrls.isValid && resultValidatePaymentMethod.isValid && resultValidateContactApps.isValid
    };
}
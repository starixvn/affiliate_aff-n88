import { regexEmail } from '../../user-panel/user-account/modules/constants';

export const validationEmail = (email) => {
    const checkEmail = new RegExp(regexEmail);
    const isValidEmail = !email
        || checkEmail.test(email);

    return isValidEmail
        ? { isValid: true, message: '' }
        : { isValid: false, message: 'Email Address is invalid' };
}
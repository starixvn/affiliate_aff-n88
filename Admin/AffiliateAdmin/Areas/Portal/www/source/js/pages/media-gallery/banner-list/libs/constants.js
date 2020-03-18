import { deviceTypes, pcLaptop, mobile } from '../../../../modules/constants';
import { globalResource } from '../../../../modules/globalResource';

export { deviceTypes, globalResource, pcLaptop, mobile };

export const Casino = 'Casino';
export const Sportsbook = 'Sportsbook';

const defaultLanguage = 'Vietnamese';
export const Asian = 1;
export const maxWidthHeight = 501;
export const maxLength = 50;
export const regSpecialCharacters = '[\/\:\*\?\"\<\>\|]';

export const headerText = {
    Index: '#',
    UserType: 'User Type',
    Images: 'Images',
    FileName: 'File Name',
    Category: 'Category',
    SubCategory: 'Sub Category',
    Language: 'Language',
    Currency: 'Currency',
    Size: 'Size',
    AffType: 'Affiliate Type',
    Device: 'Device'
}

export const memberBanner = 1;
const affiliateBanner = 2;

export const userTypeList = {
    [memberBanner]: 'Players',
    [affiliateBanner]: 'Sub-Affiliate'
}

export const messages = {
    PleaseSelect: 'Please select banner(s) to delete',
    AreYouSureDeleteItems: 'Are you sure to delete the selected banner(s)?',
    DeleteItemsSuccessfully: 'Delete banner(s) Successfully'
}

export const defaultState = {
    files: [],
    inputFileNames: [''],
    language: defaultLanguage,
    isInsert: true,
    isShowMessage: false,
    isSuccess: true,
    message: '',
    isDisabled: true,
    messageNotificationPopup: ''
}
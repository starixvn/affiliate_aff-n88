import { deviceTypes, pcLaptop, mobile } from '../../../../modules/constants';
import { globalResource } from '../../../../modules/globalResource';

export { deviceTypes, globalResource, pcLaptop, mobile };

export const defaultInsertId = 0;
export const messages = {
    NoFileChoosen: 'No file choosen',
    Files: 'files'
}

export const memberBanner = 1;
const affiliateBanner = 2;

export const userTypeList = {
    [memberBanner]: 'Players',
    [affiliateBanner]: 'Sub-Affiliate'
}
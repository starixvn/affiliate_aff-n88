import { targetCountryStatus } from '../../../../modules/constants';

export const getBlockTargetCountryList = (targetCountryList) => {
    return targetCountryList.filter(m => m.Status === targetCountryStatus.Blocked).map(m => m.TargetCountryCode);
}
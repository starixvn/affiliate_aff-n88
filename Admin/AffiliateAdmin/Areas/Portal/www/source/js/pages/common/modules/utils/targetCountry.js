import { targetCountryStatus } from '../../../../modules/constants';

export const getBlockTargetCountryList = (targetCountryList) => {
    return targetCountryList.filter(m => m.Status === targetCountryStatus.Blocked).map(m => m.TargetCountryCode);
}

export const convertListToMutilpleSelected = (initialList) => {
    return initialList ? initialList.map(item => {
        return {
            key: item.TargetCountryCode,
            name: item.TargetCountryName,
            checked: item.Status === targetCountryStatus.Blocked
        };
    }) : [];
}
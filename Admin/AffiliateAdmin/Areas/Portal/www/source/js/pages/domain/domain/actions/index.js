import { post } from '../../../../modules/ajaxRequest';
import { toggleLoader } from '../../../../actions/loaderAction';
import { targetCountryStatus } from '../../../../modules/constants';
import { SHOULD_RESET_SCROLL_POSITION, SET_SELECTED_DOMAIN_ID, SET_GRID_DATA } from './types';

export { toggleLoader };

export const setShouldResetScrollPosition = (data) => {
    return {
        type: SHOULD_RESET_SCROLL_POSITION,
        data
    }
}

export const setGridData = (data) => {
    return {
        type: SET_GRID_DATA,
        data
    }
}

export const setSelectedDomainId = (data) => {
    return {
        type: SET_SELECTED_DOMAIN_ID,
        data
    }
}

export const getDomainList = async (isAffDomain) => {
    const url = 'Portal/Domain/GetDomainList';
    const response = await post(url, { isAffDomain });

    return response && response.status === 200 ? response.data : [];
}

export const fetchData = (isAffDomain) => async (dispatch) => {
    dispatch(toggleLoader(true));

    const data = await getDomainList(isAffDomain);

    dispatch(setGridData(data));
    dispatch(setShouldResetScrollPosition(true));
    dispatch(toggleLoader(false));
}

export const getDomainById = (domainId, isAffDomain) => async () => {
    const url = 'Portal/Domain/GetDomainById';
    const response = await post(url, { domainId, isAffDomain });

    return response && response.status === 200 ? response.data : null;
}

export const getTargetCountryListByDomain = (param) => async () => {
    const url = 'Portal/Domain/GetTargetCountryListByDomain';
    const response = await post(url, param);

    if (response && response.status === 200 && response.data) {
        return response.data.map(item => ({
            ...item,
            key: item.TargetCountryCode,
            name: item.TargetCountryName,
            checked: item.Status === targetCountryStatus.Blocked
        }));
    }

    return null;
}

export const insertDomain = (param) => async () => {
    const url = 'Portal/Domain/InsertDomain';
    const response = await post(url, param);

    return response && response.status === 200 ? response.data : null;
}

export const updateDomain = (param) => async () => {
    const url = 'Portal/Domain/UpdateDomain';
    const response = await post(url, param);

    return response && response.status === 200 ? response.data : null;
}

export const deleteDomain = (param) => async () => {
    const url = 'Portal/Domain/DeleteDomain';
    const response = await post(url, param);

    return response && response.status === 200 ? response.data : null;
}
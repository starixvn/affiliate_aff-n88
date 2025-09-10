import { post } from '../../../../modules/ajaxRequest';
import { toggleLoader } from '../../../../actions/loaderAction';
import * as types from './types';
import { getDomainList, getTargetCountryListByDomain } from '../../domain/actions/index';

export { toggleLoader, getTargetCountryListByDomain as getTargetCountryListByDomains };

export const setSelectedDomainId = (data) => {
    return {
        type: types.SET_SELECTED_DOMAIN_ID,
        data
    }
}

export const setSelectedTargetCountry = (data) => {
    return {
        type: types.SET_SELECTED_TARGET_COUNTRY,
        data
    }
}

export const setShouldResetScrollPosition = (data) => {
    return {
        type: types.SHOULD_RESET_SCROLL_POSITION,
        data
    }
}

export const setGridData = (data) => {
    return {
        type: types.SET_GRID_DATA,
        data
    }
}

export const fetchData = (targetCountryCode) => async (dispatch) => {
    dispatch(toggleLoader(true));

    const url = 'Portal/DomainControl/GetDomainControlList';
    const response = await post(url, { targetCountryCode });

    const data = response && response.status === 200 ? response.data : [];

    dispatch(setGridData(data));
    dispatch(setShouldResetScrollPosition(true));
    dispatch(toggleLoader(false));
}

export const getDomainControlById = (domainControlId) => async () => {
    const url = 'Portal/DomainControl/GetDomainControlById';
    const response = await post(url, { domainControlId });

    return response && response.status === 200 ? response.data : null;
}

export const insertDomain = (param) => async () => {
    const url = 'Portal/DomainControl/InsertDomainControl';
    const response = await post(url, param);

    return response && response.status === 200 ? response.data : null;
}

export const updateDomain = (param) => async () => {
    const url = 'Portal/DomainControl/UpdateDomainControl';
    const response = await post(url, param);

    return response && response.status === 200 ? response.data : null;
}

export const deleteDomain = (param) => async () => {
    const url = 'Portal/DomainControl/DeleteDomainControl';
    const response = await post(url, param);

    return response && response.status === 200 ? response.data : null;
}

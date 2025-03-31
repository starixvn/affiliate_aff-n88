import * as types from './types'

import { post } from '../../../../modules/ajaxRequest';
import { setPagingOption } from '../../../../actions/pagingAction';
import { toggleLoader } from '../../../../actions/loaderAction';

export { setPagingOption, toggleLoader };

export const setParam = (data) => {
    return {
        type: types.SET_PARAM,
        data
    }
}

export const setLanguageCodeList = (data) => {
    return {
        type: types.SET_LANGUAGE_CODE_LIST,
        data
    }
}

export const setExpandAffChannel = (data) => {
    return {
        type: types.SET_EXPAND_AFF_CHANNEL,
        data
    }
}

export const fetchData = (param) => async () => {
    const url = 'Portal/MarketingStatisticsReport/GetReport';
    const response = await post(url, param);

    return response && response.status === 200 ? response.data : null;
}

export const setDetailGridData = (data) => {
    return {
        type: types.SET_DETAIL_GRID_DATA,
        data
    }
}

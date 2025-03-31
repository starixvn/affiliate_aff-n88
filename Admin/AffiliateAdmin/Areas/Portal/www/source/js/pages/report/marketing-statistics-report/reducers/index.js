import { combineReducers } from 'redux';

import { pagingOption } from '../../../../reducers/pagingReducer';

import createReducer from '../../../../modules/createReducer';
import * as types from '../actions/types';
import { isShowLoader } from './../../../../reducers/loaderReducer';

const languageList = createReducer({}, {});
const now = new Date();
const defaultToday = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
const today = createReducer(defaultToday, {});

export const param = createReducer(null, {
    [types.SET_PARAM](prevState, action) {
        return Object.assign({}, prevState, action.data);
    }
})

export const languageCodeList = createReducer({}, {
    [types.SET_LANGUAGE_CODE_LIST](prevState, action) {
        return { ...action.data };
    }
});

export const expandAffChannel = createReducer(true, {
    [types.SET_EXPAND_AFF_CHANNEL](prevState, action) {
        return action.data;
    }
});

export const detailGridData = createReducer(null, {
    [types.SET_DETAIL_GRID_DATA](prevState, action) {
        return action.data;
    }
});

export default combineReducers({
    isShowLoader,
    languageList,
    today,
    param,
    pagingOption,
    languageCodeList,
    expandAffChannel,
    detailGridData
})
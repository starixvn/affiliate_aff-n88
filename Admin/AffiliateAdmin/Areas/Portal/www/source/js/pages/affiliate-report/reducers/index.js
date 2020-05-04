import { combineReducers } from 'redux';

import { pagingOption } from '../../../reducers/pagingReducer';
import { isShowLoader } from '../../../reducers/loaderReducer';

import createReducer from '../../../modules/createReducer';
import { SET_REPORT_TITLE, SET_PARAM, SET_VIEW_LEVEL, SET_CURRENCY_LIST } from '../actions/types';
import { viewLevel } from '../modules/constants';

const productList = createReducer([], {});
const languageList = createReducer({}, {});
const currencyList = createReducer(null, {
    [SET_CURRENCY_LIST](prevState, action) {
        return action.data;
    }
});
const baseCurrencyList = createReducer(null, {});
const isProduction = createReducer(false, {});
const isN8B = createReducer(null, {});

const now = new Date();
const defaultToday = `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`;
const today = createReducer(defaultToday, {});

export const reportTitle = createReducer('', {
    [SET_REPORT_TITLE](prevState, action) {
        return action.data;
    }
})

export const param = createReducer(null, {
    [SET_PARAM](prevState, action) {
        return Object.assign({}, prevState, action.data);
    }
})

export const currentViewLevel = createReducer(viewLevel.main, {
    [SET_VIEW_LEVEL](prevState, action) {
        return action.data;
    }
})

export default combineReducers({
    productList,
    pagingOption,
    reportTitle,
    param,
    languageList,
    currencyList,
    baseCurrencyList,
    isProduction,
    isShowLoader,
    today,
    currentViewLevel,
    isN8B
});
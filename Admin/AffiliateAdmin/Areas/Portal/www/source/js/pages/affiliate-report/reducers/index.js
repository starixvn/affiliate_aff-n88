import { combineReducers } from 'redux';

import { pagingOption } from '../../../reducers/pagingReducer';
import { isShowLoader } from '../../../reducers/loaderReducer';

import createReducer from '../../../modules/createReducer';
import * as types from '../actions/types';
import { viewLevel } from '../modules/constants';

const languageList = createReducer({}, {});
const baseCurrencyList = createReducer(null, {});
const isProduction = createReducer(false, {});
const isN8B = createReducer(null, {});

const now = new Date();
const defaultToday = `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`;
const today = createReducer(defaultToday, {});

const commGroupList = createReducer(null, {
    [types.SET_COMM_GROUP_LIST](prevState, action) {
        return action.data;
    }
});

const productList = createReducer(null, {
    [types.SET_PRODUCT_LIST](prevState, action) {
        return action.data;
    }
});

export const currencyList = createReducer(null, {
    [types.SET_CURRENCY_LIST](prevState, action) {
        return action.data;
    }
});

const paymentCurrencyList = createReducer(null, {
    [types.SET_PAYMENT_CURRENCY_LIST](prevState, action) {
        return action.data;
    }
});

export const reportTitle = createReducer('', {
    [types.SET_REPORT_TITLE](prevState, action) {
        return action.data;
    }
})

export const param = createReducer(null, {
    [types.SET_PARAM](prevState, action) {
        return Object.assign({}, prevState, action.data);
    }
})

export const currentViewLevel = createReducer(viewLevel.main, {
    [types.SET_VIEW_LEVEL](prevState, action) {
        return action.data;
    }
})

export default combineReducers({
    isN8B,
    param,
    reportTitle,
    isShowLoader,

    productList,
    commGroupList,
    pagingOption,
    languageList,
    currencyList,
    baseCurrencyList,
    paymentCurrencyList,
    isProduction,
    today,
    currentViewLevel
});
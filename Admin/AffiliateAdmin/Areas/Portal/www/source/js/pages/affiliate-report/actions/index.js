import * as types from './types';
import { setPagingOption } from '../../../actions/pagingAction';

export { setPagingOption };

export const setReportTitle = (data) => {
    return {
        type: types.SET_REPORT_TITLE,
        data
    }
}

export const setParam = (data) => {
    return {
        type: types.SET_PARAM,
        data
    }
}

export const setViewLevel = (data) => {
    return {
        type: types.SET_VIEW_LEVEL,
        data
    }
}

export const setProductList = (data) => {
    return {
        type: types.SET_PRODUCT_LIST,
        data
    }
}

export const setCurrencyList = (data) => {
    return {
        type: types.SET_CURRENCY_LIST,
        data
    }
}

export const setCommGroupList = (data) => {
    return {
        type: types.SET_COMM_GROUP_LIST,
        data
    }
}

export const setPaymentCurrencyList = (data) => {
    return {
        type: types.SET_PAYMENT_CURRENCY_LIST,
        data
    }
}
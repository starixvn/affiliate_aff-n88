import { combineReducers } from 'redux';
import { SET_PARAM, TRANSACTION_ID, SET_EXPAND_ID_LIST } from '../actions/types';
import createReducer from '../../../../modules/createReducer';

import { pagingOption } from '../../../../reducers/pagingReducer';

export const param = createReducer({}, {
    [SET_PARAM](prevState, action) {
        return { ...action.data };
    }
});

export const transactionId = createReducer(null, {
    [TRANSACTION_ID](prevState, action) {
        return action.data;
    }
});

export const expandIdList = createReducer({}, {
    [SET_EXPAND_ID_LIST](prevState, action) {
        return action.data;
    }
});

export default combineReducers({
    pagingOption,
    param,
    transactionId,
    expandIdList
});
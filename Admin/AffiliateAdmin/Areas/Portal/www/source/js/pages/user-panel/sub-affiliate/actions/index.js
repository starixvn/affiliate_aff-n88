import { post } from '../../../../modules/ajaxRequest';
import { setPagingOption } from '../../../../actions/pagingAction';
import { setSelectedUserPanel } from '../../../customer/user-panel/actions';
import { toggleLoaderUserPanel } from '../../../customer/user-panel/actions';
import { getCurrencies } from '../../../customer/user-panel/modules/service';
import { SET_PARAM } from './types';

export { toggleLoaderUserPanel, setSelectedUserPanel, setPagingOption };

export const setParam = (data) => {
    return {
        type: SET_PARAM,
        data
    }
}

export const getCurrencyList = () => getCurrencies;

export const fetchData = (param) => async () => {
    const url = 'Portal/UserPanel/StatementHistory/GetSubAffiliate';
    const response = await post(url, param);

    return response && response.status === 200 ? response.data : null;
}
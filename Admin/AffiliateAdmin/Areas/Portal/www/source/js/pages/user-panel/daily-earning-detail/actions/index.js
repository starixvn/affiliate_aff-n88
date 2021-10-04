import { post } from '../../../../modules/ajaxRequest';
import { toggleLoaderUserPanel } from '../../../customer/user-panel/actions';
import { setSelectedUserPanel, redirectToDailyEarning, redirectToStatementHistory } from '../../../customer/user-panel/actions';
import { SET_PARAM } from './types';

export { toggleLoaderUserPanel, setSelectedUserPanel, redirectToDailyEarning, redirectToStatementHistory };

export const setParam = (data) => {
    return {
        type: SET_PARAM,
        data
    }
}

export const fetchData = (param) => async () => {
    const url = 'Portal/UserPanel/StatementHistory/GetDailyEarningDetail';
    const response = await post(url, param);

    return response && response.status === 200 ? response.data : null;
}
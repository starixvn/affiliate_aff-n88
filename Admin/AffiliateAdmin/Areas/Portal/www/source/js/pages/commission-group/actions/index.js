import { post } from '../../../modules/ajaxRequest';
import { toggleLoader } from '../../../actions/loaderAction';
import { setPagingOption } from '../../../actions/pagingAction';

import * as types from './types';

export { toggleLoader, setPagingOption };

export const fetchGroupSettingData = (param) => {
    const url = 'Portal/RevenueGroup/GetCommissionGroupList';

    return post(url, param);
}

export const setGridData = (data) => {
    return {
        type: types.SET_GRIDDATA,
        data
    }
}

export const getGroupSettingList = (param) => async (dispatch) => {
    dispatch(toggleLoader(true));

    if (!param.GroupName) {
        dispatch(setSearchedGroupName(''));
    }

    const response = await fetchGroupSettingData(param);
    if (response && response.status === 200) {
        const data = response.data;

        dispatch(setGridData(data ? data.CommissionSettingList : null));

        const { PageIndex, PageSize } = param;
        const pagingOption = {
            PageIndex,
            PageSize,
            TotalItem: data ? data.TotalRows : 0
        };
        dispatch(setPagingOption(pagingOption));
    }
    dispatch(toggleLoader(false));
}

export const setSelectedGroup = (data) => {
    return {
        type: types.SET_SELECTED_GROUP,
        data
    }
}

export const setSearchedGroupName = (data) => {
    return {
        type: types.SET_SEARCHED_GROUPNAME,
        data
    }
}

export const setSearchedGroupType = (data) => {
    return {
        type: types.SET_SEARCHED_GROUP_TYPE,
        data
    }
}

export const insertCommissionGroup = (param) => {
    const url = 'Portal/RevenueGroup/CreateCommissionGroup';

    return () => post(url, param);
}

export const updateCommissionGroup = (param) => {
    const url = 'Portal/RevenueGroup/UpdateCommissionGroup';

    return () => post(url, param);
}

export const getSelectedCommGroup = (param) => async (dispatch) => {
    const url = 'Portal/RevenueGroup/GetCommissionGroup';

    const response = await post(url, param);
    let data = response && response.status === 200 ? _buildCommGroupInfo(response.data) : null;

    dispatch(setSelectedGroup(data));
}

const _buildCommGroupInfo = (data) => {
    if (!data) return null;

    const {
        TierSettingList,
        PlatformFeeList,
        ...rest
    } = data;

    const firstGroupProductId = PlatformFeeList[0]?.GroupProductId;
    const firstTier = TierSettingList.filter(t => t.GroupProductId === firstGroupProductId);

    const isCheckedField = (list, field) => list?.some(item => item?.[field] !== 0);

    return {
        ...rest,
        TierSettingList,
        PlatformFeeList,
        IsCheckedMinFTDCount: isCheckedField(firstTier, 'MinFTDCount'),
        IsCheckedMinTotalDeposit: isCheckedField(firstTier, 'MinTotalDeposit'),
    };
};

export const deleteCommGroup = (param) => {
    const url = 'Portal/RevenueGroup/DeleteCommissionGroup';

    return () => post(url, param);
}
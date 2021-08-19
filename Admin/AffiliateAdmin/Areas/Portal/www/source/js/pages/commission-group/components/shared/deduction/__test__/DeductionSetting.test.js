import React from 'react';
import { DeductionSetting } from '../DeductionSetting';
import { shallow } from 'enzyme';
import FeeSettingItem from '../FeeSettingItem';

describe('commission group - DeductionSetting', () => {
    const defaultProps = {
        selectedGroup: {
            DepositFee: { DeductedPercentage: 0.02, DeductionId: 13, ProductIds: 0 },
            WithdrawalFee: { DeductedPercentage: 0.02, DeductionId: 14, ProductIds: 0 },
            Description: "A B C",
            GroupId: 0,
            GroupName: "ABC",
            OperationalFee: { DeductedPercentage: 0.07, DeductionId: 11, ProductIds: 0 },
            PlatformFeeList: [{ DeductedPercentage: 0.17, DeductionId: 10, ProductIds: "1,3,4,5,6" }],
            TierSettingList: [{ TierId: 1, MinAmount: 0, MaxAmount: 100000000000000, MinAp: 0, MaxAp: 1000000000, Commission: 0 }]
        }
    };

    it('handleSelectOperationalFee  - should call setSelectedGroup when change Operational Fee%', () => {
        const mockSetSelectedGroup = jest.fn();
        const props = Object.assign({}, defaultProps, { setSelectedGroup: mockSetSelectedGroup });
        const wrapper = shallow(<DeductionSetting {...props} />);

        wrapper.find(FeeSettingItem).at(0).props().handleChange();
        expect(props.setSelectedGroup).toHaveBeenCalledWith({ OperationalFee: { DeductedPercentage: 0.07, DeductionId: 11, ProductIds: 0 } });
    });

    it('handleUpdateState  - should call setState when change Operational Fee%', () => {
        const wrapper = shallow(<DeductionSetting {...defaultProps} />);
        const instance = wrapper.instance();
        instance.setState = jest.fn();

        wrapper.find(FeeSettingItem).at(0).props().handleUpdateState();
        expect(instance.setState).toHaveBeenCalledWith({ isInitialOperationalFee: false });
    });

    it('handleSelectDepositFee  - should call setSelectedGroup when change Deposit Fee%', () => {
        const mockSetSelectedGroup = jest.fn();
        const props = Object.assign({}, defaultProps, { setSelectedGroup: mockSetSelectedGroup });
        const wrapper = shallow(<DeductionSetting {...props} />);

        wrapper.find(FeeSettingItem).at(1).props().handleChange();
        expect(props.setSelectedGroup).toHaveBeenCalledWith({ DepositFee: { DeductedPercentage: 0.02, DeductionId: 13, ProductIds: 0 } });
    });

    it('handleUpdateState  - should call setState when change Deposit Fee%', () => {
        const wrapper = shallow(<DeductionSetting {...defaultProps} />);
        const instance = wrapper.instance();
        instance.setState = jest.fn();

        wrapper.find(FeeSettingItem).at(1).props().handleUpdateState();
        expect(instance.setState).toHaveBeenCalledWith({ isInitialDepositFee: false });
    });

    it('handleSelectWithdrawalFee  - should call setSelectedGroup when change Withdrawal Fee%', () => {
        const mockSetSelectedGroup = jest.fn();
        const props = Object.assign({}, defaultProps, { setSelectedGroup: mockSetSelectedGroup });
        const wrapper = shallow(<DeductionSetting {...props} />);

        wrapper.find(FeeSettingItem).at(2).props().handleChange();
        expect(props.setSelectedGroup).toHaveBeenCalledWith({ WithdrawalFee: { DeductedPercentage: 0.02, DeductionId: 14, ProductIds: 0 } });
    });

    it('handleUpdateState  - should call setState when change Withdrawal Fee%', () => {
        const wrapper = shallow(<DeductionSetting {...defaultProps} />);
        const instance = wrapper.instance();
        instance.setState = jest.fn();

        wrapper.find(FeeSettingItem).at(2).props().handleUpdateState();
        expect(instance.setState).toHaveBeenCalledWith({ isInitialWithdrawalFee: false });
    });

    it('Should render correctly', () => {
        const wrapper = shallow(<DeductionSetting {...defaultProps} />);

        expect(wrapper).toMatchSnapshot();
    });
})
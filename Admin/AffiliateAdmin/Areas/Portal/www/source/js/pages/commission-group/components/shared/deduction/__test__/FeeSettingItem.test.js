import React from 'react';
import FeeSettingItem from '../FeeSettingItem';
import { shallow } from 'enzyme';
import commissionValueList from '../../../../modules/constant';
jest.mock(commissionValueList);

describe('commission group - FeeSettingItem', () => {
    const defaultProps = {
        label: "Operational Fee%",
        basedValueName: "| Gross Win Loss |",
        handleChange: jest.fn(),
        data: { DeductedPercentage: 0.07, DeductionId: 11, ProductIds: 0, IsDeductedPercent: true, DeductedAmount: "" },
        isCreating: true
    };

    it('handleChangeComm - should call handleChange when change DeductedPercentage', () => {
        const mockEvent = { target: { name: 'DeductedPercentage', value: '0.15' } };
        const wrapper = shallow(<FeeSettingItem {...defaultProps} />);

        wrapper.find('Input[type="select"][name="DeductedPercentage"]').simulate('change', mockEvent);

        expect(wrapper.instance().props.handleChange).toHaveBeenCalledWith({ DeductedPercentage: 0.15 });
    });

    it('handleChangeComm - should call handleChange when change DeductedPercentage when update', () => {
        const mockEvent = { target: { name: 'DeductedPercentage', value: '0.15' } };
        const props = Object.assign({}, defaultProps, { isCreating: false });
        const wrapper = shallow(<FeeSettingItem {...props} />);

        wrapper.find('Input[type="select"][name="DeductedPercentage"]').simulate('change', mockEvent);

        expect(wrapper.instance().props.handleChange).toHaveBeenCalledWith({ DeductedPercentage: 0.15 });
    });

    it('Should render correctly', () => {
        const wrapper = shallow(<FeeSettingItem {...defaultProps} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('Should render correctly with isCreating is false', () => {
        const props = Object.assign({}, defaultProps, { isCreating: false });
        const wrapper = shallow(<FeeSettingItem {...props} />);

        expect(wrapper).toMatchSnapshot();
    });
});
import React from 'react';
import FeeSettingItem from '../FeeSettingItem';
import { shallow } from 'enzyme';
import DeductedPercentageForm from '../DeductedPercentageGroup';

describe('commission group - FeeSettingItem', () => {
    const data = { DeductedPercentage: 0.07, DeductionId: 11, ProductIds: 0, IsDeductedPercent: true, DeductedAmount: "" }
    const defaultProps = {
        label: "Operational Fee%",
        basedValueName: "| Gross Win Loss |",
        handleChange: jest.fn(),
        data,
        isCreating: true
    };

    it('handleChangeComm - should call handleChange when change DeductedPercentage', () => {
        const mockEvent = { target: { name: 'DeductedPercentage', value: '0.15' } };
        const wrapper = shallow(<FeeSettingItem {...defaultProps} />);

        wrapper.find(DeductedPercentageForm).simulate('change', mockEvent);

        expect(wrapper.instance().props.handleChange).toHaveBeenCalledWith({ DeductedPercentage: 0.15 });
    });

    it('handleChangeComm - should call handleChange when change DeductedPercentage when update', () => {
        const mockEvent = { target: { name: 'DeductedPercentage', value: '0.15' } };
        const props = Object.assign({}, defaultProps, { isCreating: false });
        const wrapper = shallow(<FeeSettingItem {...props} />);

        wrapper.find(DeductedPercentageForm).simulate('change', mockEvent);

        expect(wrapper.instance().props.handleChange).toHaveBeenCalledWith({ DeductedPercentage: 0.15 });
    });

    it('Should render correctly', () => {
        const wrapper = shallow(<FeeSettingItem {...defaultProps} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('Should render correctly with is fixed amount', () => {
        const newData = Object.assign({}, data, { IsDeductedPercent: false });
        const props = Object.assign({}, defaultProps, { data: newData });
        const wrapper = shallow(<FeeSettingItem {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('Should render correctly with isCreating is false', () => {
        const props = Object.assign({}, defaultProps, { isCreating: false });
        const wrapper = shallow(<FeeSettingItem {...props} />);

        expect(wrapper).toMatchSnapshot();
    });
});
import React from 'react';
import { Filter } from '../Filter';
import { shallow } from 'enzyme';

describe('daily earning - components - Filter', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    const productList = [
        {
            ProductId: 1,
            ProductName: 'Sportsbook'
        },
        {
            ProductId: 3,
            ProductName: 'Playtech Casino'
        },
        {
            ProductId: 4,
            ProductName: 'Number Game'
        }
    ]

    const defaultProps = {
        param: {
            affId: 1271808,
            monthDate: "Jan-2019",
            productId: 0
        },
        setParam: jest.fn(),
        productList
    }

    it('render correctly', () => {
        const wrapper = shallow(<Filter {...defaultProps} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('render correctly with has productList', async () => {
        const wrapper = await shallow(<Filter {...defaultProps} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('handleChangeProduct - should call setState and handleSetParam when change product select', () => {
        const event = {
            target: {
                value: 1
            }
        }
        const wrapper = shallow(<Filter {...defaultProps} />);
        wrapper.setState = jest.fn((obj, func) => func && func());
        wrapper.instance().handleSetParam = jest.fn();

        wrapper.find('Input[type="select"][name="Product"][id="Product"]').simulate('change', event)

        expect(wrapper.setState).toHaveBeenCalledWith({ selectedProduct: 1 }, expect.any(Function));
        expect(wrapper.instance().handleSetParam).toHaveBeenCalled();
    });

    it('handleSetParam - should be called when From change', () => {
        const wrapper = shallow(<Filter {...defaultProps} />);
        
        wrapper.instance().handleSetParam(1);

        expect(defaultProps.setParam).toHaveBeenCalledWith({ affId: 1271808, monthDate: "Jan-2019", productId: 0, currencyId: 0 });
    });
});
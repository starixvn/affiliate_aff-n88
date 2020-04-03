import React from 'react';
import { Filter } from '../Filter';
import { shallow } from 'enzyme';

describe('daily earning detail - components - Filter', () => {
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
            monthDate: "06 January 2019",
            productId: 0
        },
        productList
    }

    it('render correctly', () => {
        const props = Object.assign({}, defaultProps, { setParam: jest.fn(), getProductList: jest.fn(() => []) });
        const wrapper = shallow(<Filter {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('render correctly with has productList', async () => {
        const props = Object.assign({}, defaultProps, { setParam: jest.fn(), getProductList: jest.fn(() => productList) });
        const wrapper = await shallow(<Filter {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('handleChangeProduct - should call setState and handleSetParam when change product select', () => {
        const event = {
            target: {
                value: 1
            }
        }
        const props = Object.assign({}, defaultProps, { setParam: jest.fn(), getProductList: jest.fn(() => productList) });
        const wrapper = shallow(<Filter {...props} />);
        wrapper.setState = jest.fn((obj, func) => func && func());
        wrapper.instance().handleSetParam = jest.fn();

        wrapper.find('Input[type="select"][name="Product"][id="Product"]').simulate('change', event)

        expect(wrapper.setState).toHaveBeenCalledWith({ selectedProduct: 1 }, expect.any(Function));
        expect(wrapper.instance().handleSetParam).toHaveBeenCalled();
    });

    it('handleSetParam - should be called when From change', () => {
        const props = Object.assign({}, defaultProps, { setParam: jest.fn() });
        const wrapper = shallow(<Filter {...props} />);
        
        wrapper.instance().handleSetParam(1);

        expect(props.setParam).toHaveBeenCalledWith({ "affId": 1271808, "currencyId": 0, "monthDate": "06 January 2019", "productId": 0 });
    });
});
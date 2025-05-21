import React from 'react';
import App from '../index';
import { shallow } from 'enzyme';

jest.mock('react-dom', () => ({ render: jest.fn() }))

describe('Customer - App', () => {
    beforeEach(() => {
        window.globalVariables = {
            claims: {}
        },

        window.initialState = {
            currencyList: [{ ExchangeId: 1, Code: 'USD' }],
            claims: {}
        }
    });

    it('Should render correctly', () => {
        const wrapper = shallow(<App />);

        expect(wrapper).toMatchSnapshot();
    });
})
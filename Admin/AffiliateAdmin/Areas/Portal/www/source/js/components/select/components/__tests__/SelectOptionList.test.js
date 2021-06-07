import React from 'react';
import renderer from 'react-test-renderer';

import SelectOptionList from '../SelectOptionList';

const defaultProps = {
    dataSource: [],
    id: 1,
    onChange: jest.fn()
}

describe('SelectOptionList ', () => {
    it('rendered content should match with snapshot', () => {
        const dataSource = [{
            key: "key1",
            value: "Value 1"
        },
        {
            key: "key2",
            value: "Value 2"
        }
        ];

        const props = Object.assign({}, defaultProps, { dataSource });
        const optionList = renderer.create(<SelectOptionList {...props} />);

        const result = optionList.toJSON();

        expect(result).toMatchSnapshot();
    })
})
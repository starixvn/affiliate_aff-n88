import React from 'react'
import AppContainer from '../../AppContainer'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { SET_SELECTED_USERPANEL } from '../../../../user-panel/actions/types'

const mockStore = configureMockStore()

describe('customer - main page - AppContainer - connect', () => {
    let wrapper, store

    beforeEach(() => {
        const initialState = {
            affCommonInfo: { affId: 123, status: 'Approved'},
            selectedUserPanel: 'ABC'
        }
        store = mockStore(initialState)
        wrapper = shallow(<AppContainer store={store} />).dive()
    })

    it('should show correct value', () => {
        const { selectedUserPanel, affId, status } = wrapper.props();
        expect(affId).toBe(123)
        expect(selectedUserPanel).toEqual('ABC')
        expect(status).toEqual('Approved')
    })

    it('should call correct action', () => {
        wrapper.props().setSelectedUserPanel('abc')

        const actions = store.getActions();
        expect(actions).toEqual([{ type: SET_SELECTED_USERPANEL, data: 'abc'}])
    })
})
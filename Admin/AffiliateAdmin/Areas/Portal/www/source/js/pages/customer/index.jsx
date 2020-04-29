import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import reducer from './mainpage/reducers';
import AppContainer from './mainpage/components/AppContainer';
import { configureStore } from '../../modules/store';

const { currencyList } = window.initialState;

const newCurrencyList = currencyList.map(item => {
    return {
        key: item.ExchangeId,
        name: item.Code,
        checked: false
    };
});

const store = configureStore(Object.assign({}, window.initialState, { currencyList: newCurrencyList }), reducer);

export default class App extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
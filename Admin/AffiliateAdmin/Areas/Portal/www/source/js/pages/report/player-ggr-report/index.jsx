import React from "react";
import { Provider } from "react-redux";

import reducer from './reducers';
import AppContainer from "./components/AppContainer";
import { configureStore } from '../../../modules/store';
import { convertListToMutilpleSelected } from '../../../modules/utils';

const { productList } = window.initialState;

const newProductList = convertListToMutilpleSelected(productList, 'ProductId', 'ProductName')

const store = configureStore({
    ...window.initialState,
    productList: newProductList,
}, reducer);

export default class App extends React.Component {
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
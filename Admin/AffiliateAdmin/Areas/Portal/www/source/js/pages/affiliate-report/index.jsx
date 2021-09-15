import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import reducer from './reducers';
import AppContainer from "./components/AppContainer";
import { configureStore } from '../../modules/store';
import { convertToMutilSelectList } from './modules/utils'

const { productList, languageList, currencyList, baseCurrencyList, paymentCurrencyList, isProduction, today, isN8B, commGroupList } = window.initialState;

const language = {};
for (let languageItem of languageList) {
    language[languageItem.LanguageCode] = languageItem.LanguageName;
}

const newProductList = convertToMutilSelectList(productList, 'ProductId', 'ProductName')
const newCurrencyList = convertToMutilSelectList(currencyList, 'ExchangeId', 'Code')
const newPaymentCurrencyList = convertToMutilSelectList(paymentCurrencyList, 'ExchangeId', 'Code')
const newCommGroupList = convertToMutilSelectList(commGroupList, 'Id', 'Name')

const store = configureStore({
    productList: newProductList,
    commGroupList: newCommGroupList,
    languageList: language,
    today,
    currencyList: newCurrencyList,
    baseCurrencyList,
    paymentCurrencyList: newPaymentCurrencyList,
    isProduction,
    isN8B
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

ReactDOM.render(<App />, document.getElementById("root"));

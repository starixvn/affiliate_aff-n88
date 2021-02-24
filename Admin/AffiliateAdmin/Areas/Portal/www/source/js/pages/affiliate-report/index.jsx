import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import reducer from './reducers';
import AppContainer from "./components/AppContainer";
import { configureStore } from '../../modules/store';

const { productList, languageList, currencyList, baseCurrencyList, isProduction, today, isN8B, commGroupList } = window.initialState;

const newProductList = productList.map(p => {
    return Object.assign({}, p, { Checked: true });
})

const language = {};
for (let i = 0; i < languageList.length; i++) {
    const languageItem = languageList[i];
    language[languageItem.LanguageCode] = languageItem.LanguageName;
}

const newCurrencyList = currencyList.map(item => {
    return {
        key: item.ExchangeId,
        name: item.Code,
        checked: true
    };
});

const commGroup = {};
for (let i = 0; i < commGroupList.length; i++) {
    const commGroupItem = commGroupList[i];
    commGroup[commGroupItem.Id] = commGroupItem.Name;
}

const store = configureStore({ productList: newProductList, commGroupList: commGroup, languageList: language, today, currencyList: newCurrencyList, baseCurrencyList, isProduction, isN8B }, reducer);

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

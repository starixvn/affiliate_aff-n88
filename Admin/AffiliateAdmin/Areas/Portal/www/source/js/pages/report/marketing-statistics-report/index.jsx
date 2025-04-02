import React from "react";
import { Provider } from "react-redux";

import reducer from './reducers';
import AppContainer from "./components/AppContainer";
import { configureStore } from '../../../modules/store';

const { languageList, today } = window.initialState;
const languageCodeList = {};
for (let languageItem of languageList) {
    languageCodeList[languageItem.LanguageCode] = languageItem.LanguageName;
}

const store = configureStore({
    today,
    languageCodeList,
}, reducer);

const App = () => {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

export default App;
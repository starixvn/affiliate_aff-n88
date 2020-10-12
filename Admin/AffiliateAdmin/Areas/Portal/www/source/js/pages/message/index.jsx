import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppContainer from './components/AppContainer';

import reducer from './reducers';
import { configureStore } from '../../modules/store';

const { languageList, today } = window.initialState;

const defaultMessageContentList = {
    MessageId: 0
};
const languages = {};

for (let i = 0; i < languageList.length; i++) {
    const languageItem = languageList[i];
    const key = 'MessageContent' + languageItem.ShortedLanguageCode;
    defaultMessageContentList[key] = '';
    languages[key] = languageItem.LanguageName;
}

const store = configureStore({ today, defaultMessageContentList, languages }, reducer);

export default class App extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </ Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
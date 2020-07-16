import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppContainer from './components/AppContainer';

import reducer from './reducers';
import { configureStore } from '../../../modules/store';
import { playerBanner, affiliateBanner } from '../common/libs/constants';

const { categoryList, subCategoryList, languageList, currencyList, bannerRootUrl, sizeList, affTypeList,
    paramFromHome, subCategoryCasinoList, subCategorySportsbookList, defaultLanguage } = window.initialState;

const playerCategoryList = categoryList.filter(c => c.UserType === playerBanner).map(item => {
    return {
        categoryName: item.CategoryName,
        key: item.CategoryName,
        name: item.CategoryName,
        checked: true
    };
});

const subAffiliateCategoryList = categoryList.filter(c => c.UserType === affiliateBanner).map(item => {
    return {
        categoryName: item.CategoryName,
        key: item.CategoryName,
        name: item.CategoryName,
        checked: true
    };
});

const newSubCategoryList = subCategoryList.map(item => {
    return {
        key: item.SubCategoryName,
        name: item.SubCategoryName,
        parentCategoryName: item.CategoryName,
        checked: true
    };
});

const newCurrencyList = currencyList.map(item => {
    return {
        key: item.Name,
        name: item.Name,
        checked: true
    };
});

const newSizeList = sizeList.map(item => {
    return {
        key: item.Name,
        name: item.Name,
        checked: true
    };
});

const newAffTypeList = affTypeList.map(item => {
    return {
        key: item.AffTypeId,
        name: item.AffTypeName,
        checked: true
    };
});

const store = configureStore({
    languageList, paramFromHome, categoryList, playerCategoryList, subAffiliateCategoryList, subCategoryList: newSubCategoryList,
    currencyList: newCurrencyList, bannerRootUrl, sizeList: newSizeList, affTypeList: newAffTypeList,
    subCategoryCasinoList, subCategorySportsbookList, defaultLanguage
}, reducer);

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
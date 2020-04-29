import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppLayout from '../../../../layouts/AppLayout';
import UserPanelBreadcrumb from '../../../common/components/UserPanelBreadcrumb';
import Filter from './Filter';
import Content from './Content';

import { monthNames, userPanelMenuKey } from '../modules/constants';
import { setSelectedUserPanel } from '../actions';

export class AppContainer extends PureComponent {
    constructor(props) {
        super(props);
        
        const { param } = this.props;
        this.monthDate = param && param.monthDate;
        
        const date = new Date(this.monthDate);
        this.breadcrumbList = [
            { handleClick: () => this.props.setSelectedUserPanel(userPanelMenuKey.statementHistory), title: 'Statement History'},
            { title: `${monthNames[date.getMonth()]} ${date.getFullYear()}`}
        ];
    }

    render() {
        var { productList, currencyList, baseCurrencyList } = this.props;
        return this.monthDate && (
            <AppLayout>
                <UserPanelBreadcrumb breadcrumbList={this.breadcrumbList} />
                <Filter productList={productList} currencyList={currencyList} baseCurrencyList={baseCurrencyList} />
                <Content />
            </AppLayout>
        );
    }
}

function mapStateToProps({ dailyEarning, productList, currencyList, baseCurrencyList }) {
    const { param } = dailyEarning;
    return Object.assign({}, { param, productList, currencyList, baseCurrencyList });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSelectedUserPanel }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
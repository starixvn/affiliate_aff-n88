import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppLayout from '../../../../layouts/AppLayout';
import UserPanelBreadcrumb from '../../../common/components/UserPanelBreadcrumb';
import Filter from './Filter';
import Content from './Content';

import { setSelectedUserPanel, redirectToDailyEarning, getProductList, getCurrencyList } from '../actions';
import { monthNames, userPanelMenuKey } from '../modules/constants';

export class AppContainer extends PureComponent {
    constructor(props) {
        super(props);

        const { param } = this.props;
        this.monthDate = param && param.monthDate;
        this.date = new Date(this.monthDate);
        this.state = {
            productList : [],
            currencyList : []
        }
    }

    componentDidMount(){
        this._fetchFilterInfo();
    }

    async _fetchFilterInfo () {
        var productList = await this.props.getProductList();
        var currencyList = await this.props.getCurrencyList();
        this.setState({productList, currencyList});
    }

    render() {
        const { param } = this.props;
        const dailyEarningParam = Object.assign({}, param, { monthDate: this.monthDate });

        const breadcrumbList = [
            { handleClick: () => this.props.setSelectedUserPanel(userPanelMenuKey.statementHistory), title: 'Statement History' },
            { handleClick: () => this.props.redirectToDailyEarning(dailyEarningParam), title: `${monthNames[this.date.getMonth()]} ${this.date.getFullYear()}` },
            { title: this.monthDate }
        ];

        return this.monthDate && (
            <AppLayout>
                <UserPanelBreadcrumb breadcrumbList={breadcrumbList} />
                <Filter productList={this.state.productList} currencyList={this.state.currencyList}/>
                <Content />
            </AppLayout>
        );
    }
}

function mapStateToProps({ dailyEarningDetail }) {
    const { param } = dailyEarningDetail;
    return Object.assign({}, { param });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSelectedUserPanel, redirectToDailyEarning, getProductList, getCurrencyList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
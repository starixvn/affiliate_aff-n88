import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppLayout from '../../../../layouts/AppLayout';
import UserPanelBreadcrumb from '../../../common/components/UserPanelBreadcrumb';
import Filter from './Filter';
import Content from './Content';

import { monthNames, userPanelMenuKey } from '../libs/constants';
import { setSelectedUserPanel, getCurrencyList } from '../actions';

export class AppContainer extends PureComponent {
    constructor(props) {
        super(props);
        
        const { param } = this.props;
        this.monthDate = param && param.monthDate;
        this.state = {
            currencyList : []
        }
        
        const date = new Date(this.monthDate);
        this.breadcrumbList = [
            { handleClick: () => this.props.setSelectedUserPanel(userPanelMenuKey.statementHistory), title: 'Statement History'},
            { title: `${monthNames[date.getMonth()]} ${date.getFullYear()}`}
        ];
    }

    componentDidMount(){
        this._fetchFilterInfo();
    }

    async _fetchFilterInfo () {
        var currencyList = await this.props.getCurrencyList();

        this.setState({ currencyList});
    }

    render() {
        var {currencyList} = this.state;
        return this.monthDate && (
            <AppLayout>
                <UserPanelBreadcrumb breadcrumbList={this.breadcrumbList} />
                <Filter currencyList={currencyList}/>
                <Content />
            </AppLayout>
        );
    }
}

function mapStateToProps({ subAffiliate }) {
    const { param } = subAffiliate;
    return Object.assign({}, { param });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSelectedUserPanel, getCurrencyList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
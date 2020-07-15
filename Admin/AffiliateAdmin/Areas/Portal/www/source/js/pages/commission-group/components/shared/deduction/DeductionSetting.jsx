import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSelectedGroup } from '../../../actions';

import PlatformFeeSetting from './PlatformFeeSetting';
import FeeSettingItem from './FeeSettingItem';

export class DeductionSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInitialOperationalFee: true,
            isInitialBankingFee: true
        }
    }

    handleChangeOperationalFee = (value) => {
        const { OperationalFee } = this.props.selectedGroup;
        this.props.setSelectedGroup({
            OperationalFee: Object.assign({}, OperationalFee, value)
        });
    }

    handleChangeBankingFee = (value) => {
        const { BankingFee } = this.props.selectedGroup;
        this.props.setSelectedGroup({
            BankingFee: Object.assign({}, BankingFee, value)
        });
    }

    render() {
        const { defaultCurrency } = this.props;
        const { isInitialOperationalFee, isInitialBankingFee } = this.state;
        const { OperationalFee, BankingFee } = this.props.selectedGroup;

        return (
            <fieldset>
                <legend><h6 className="font-weight-bold">Deductions</h6></legend>
                <PlatformFeeSetting />

                <FeeSettingItem label="Operational Fee" basedValueName="| Gross Win Loss |"
                    handleChange={this.handleChangeOperationalFee}
                    handleUpdateState={() => this.setState({ isInitialOperationalFee: false })}
                    data={OperationalFee}
                    defaultCurrency={defaultCurrency}
                    isInitial={isInitialOperationalFee} />

                <FeeSettingItem label="Banking Fee" basedValueName="(Deposit + Withdrawal)"
                    handleChange={this.handleChangeBankingFee}
                    handleUpdateState={() => this.setState({ isInitialBankingFee: false })}
                    data={BankingFee}
                    defaultCurrency={defaultCurrency}
                    isInitial={isInitialBankingFee} />
            </fieldset>
        )
    }
}

function mapStateToProp({ selectedGroup, defaultCurrency }) {
    return { selectedGroup, defaultCurrency };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSelectedGroup }, dispatch);
}

export default connect(mapStateToProp, mapDispatchToProps)(DeductionSetting);
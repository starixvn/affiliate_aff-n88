import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSelectedGroup } from '../../../actions';

import PlatformFeeSetting from './PlatformFeeSetting';
import FeeSettingItem from './FeeSettingItem';
import RateOrFixedAmount from './RateOrFixedAmount';

export class DeductionSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelectedRate: true,
            fixedOperationalAmount: 0,
            fixedBankAmount: 0
        }
    }

    handleSelectedRate = (isSelectedRate) => {
        this.props.setSelectedGroup({
            IsSelectedRate: isSelectedRate
        });
    }

    handleSelectOperationalFee = (value) => {
        const { OperationalFee } = this.props.selectedGroup;
        this.props.setSelectedGroup({
            OperationalFee: Object.assign({}, OperationalFee, value)
        });
    }

    handleInputFixedOperationalAmount = (value) => {
        this.props.setSelectedGroup({
            FixedOperationalAmount: value
        });
    }

    handleSelectBankingFee = (value) => {
        const { BankingFee } = this.props.selectedGroup;
        this.props.setSelectedGroup({
            BankingFee: Object.assign({}, BankingFee, value)
        });
    }

    render() {
        const { OperationalFee, BankingFee, IsSelectedRate, FixedOperationalAmount, FixedBankAmount } = this.props.selectedGroup

        return (
            <fieldset>
                <legend><h6 className="font-weight-bold">Deductions</h6></legend>
                <PlatformFeeSetting />

                <RateOrFixedAmount isSelectedRate={IsSelectedRate} handleChange={this.handleSelectedRate} />

                <FeeSettingItem label="Operational Fee" basedValueName="| Gross Win Loss |"
                    handleChange={this.handleSelectOperationalFee}
                    data={OperationalFee}
                    amount={FixedOperationalAmount}
                    isSelectedRate={IsSelectedRate} />

                <FeeSettingItem label="Banking Fee" basedValueName="(Deposit + Withdrawal)"
                    handleChange={this.handleSelectBankingFee}
                    data={BankingFee}
                    amount={FixedBankAmount}
                    isSelectedRate={IsSelectedRate} />
            </fieldset>
        )
    }
}

function mapStateToProp({ selectedGroup }) {
    return { selectedGroup };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSelectedGroup }, dispatch);
}

export default connect(mapStateToProp, mapDispatchToProps)(DeductionSetting);
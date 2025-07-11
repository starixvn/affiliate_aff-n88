import React from 'react';

import { Input } from 'reactstrap';

import {
    commissionValueList,
    format,
    money,
    firstMinNetWinValueList,
    NEGATIVE_INFINITY_SYMBOL,
    regexAcceptNegativeAmountFormat,
    regexValidNegativeAmount,
    INFINITY_FTD_COUNT,
    INFINITY_TOTAL_DEPOSIT
} from '../../../modules/constant';
import { isValidNumber } from '../../../../../modules/utils';

export default class TierSettingItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    handleChangeAmount = (event) => {
        const { name, value } = event.target;
        const amount = value.replace(/,/g, '');

        if (regexAcceptNegativeAmountFormat.test(amount)) {
            if (regexValidNegativeAmount.test(amount)) {
                const amountNumber = Number(amount);

                if (amountNumber < money.AllowedMinValue || amountNumber > money.AllowedMaxValue) {
                    return;
                }
            }

            const { data, onChange } = this.props;

            const newItem = { [name]: amount };

            onChange && onChange(data.TierId, newItem);
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = Number(target.value.replace(/,/g, ''));
        const name = target.name;

        const { data, onChange } = this.props;

        const newItem = { [name]: value || 0 };

        onChange && onChange(data.TierId, newItem);
    }

    handleGetMinAmount = (minAmount, isValidAmount) => {
        return isValidAmount ? format(Number(minAmount)) : minAmount;
    }

    handleChangeFirstMinNet = (event) => {
        const isNegativeInfinity = event.target.value === NEGATIVE_INFINITY_SYMBOL;
        const { data, onChange } = this.props;

        const newItem = isNegativeInfinity ? { MinAmount: money.AllowedMinValue } : { MinAmount: 0 };

        onChange && onChange(data.TierId, newItem);
    }

    handleChangeValueWithCheckbox = (e) => {
        const { name, value } = e.target;
        const { data, onChangeValueWithCheckbox } = this.props;

        const numericValue = Number(value.replace(/,/g, ''));
        const oldValue = data[name];
        const newValue = this.getValidatedValue(value, numericValue, oldValue, name === 'MinFTDCount' ? INFINITY_FTD_COUNT : INFINITY_TOTAL_DEPOSIT);

        if (newValue === oldValue) {
            return;
        }

        onChangeValueWithCheckbox && onChangeValueWithCheckbox(data.TierId, name, newValue);
    }

    getValidatedValue = (rawValue, numericValue, oldValue, maxValue = money.AllowedMaxValue, emptyFallback = 0) => {
        if (rawValue === '') {
            return emptyFallback;
        }

        if (numericValue >= 0 && numericValue <= maxValue && isValidNumber(numericValue)) {
            return numericValue;
        }

        return oldValue;
    };

    render() {
        const { index, data, handleClick, btnText, isFirst, isFirstTierSetting, isTurnover, selectedGroup } = this.props;
        const { TierId, MinAmount, MinQm, Commission, MinFTDCount, MinTotalDeposit } = data;

        const isValidAmount = regexValidNegativeAmount.test(MinAmount);
        const isNegativeInfinity = MinAmount == money.AllowedMinValue;
        const isMinFTDCountValid = selectedGroup.IsCheckedMinFTDCount && MinFTDCount > 0 && MinFTDCount <= INFINITY_FTD_COUNT;
        const isMinTotalDepositValid = selectedGroup.IsCheckedMinTotalDeposit && MinTotalDeposit > 0 && MinTotalDeposit <= INFINITY_TOTAL_DEPOSIT;

        return (
            <tr>
                <td className="text-center">{index}</td>
                <td>
                    {
                        isFirst ? (
                            isTurnover ? (
                                <Input type="text" disabled name="MinAmount" id={"MinAmount" + TierId}
                                    value={this.handleGetMinAmount(MinAmount, isValidAmount)} />
                            ) : (
                                <select className="form-control" name="MinAmount" id={"MinAmount" + TierId}
                                    onChange={this.handleChangeFirstMinNet} value={isNegativeInfinity ? NEGATIVE_INFINITY_SYMBOL : this.handleGetMinAmount(MinAmount, isValidAmount)}>
                                    {
                                        Object.keys(firstMinNetWinValueList).map(key => {
                                            return (<option key={`MinAmount-${key}`} value={key}>{firstMinNetWinValueList[key]}</option>);
                                        })
                                    }
                                </select>
                            )
                        ) : (
                            <Input className={isValidAmount ? "" : "has-error"} type="text" name="MinAmount" id={"MinAmount" + TierId}
                                value={this.handleGetMinAmount(MinAmount, isValidAmount)} onChange={this.handleChangeAmount} />
                        )
                    }
                </td>
                <td>
                    <Input type="text" name="MinQm" id={"MinQm" + TierId} value={format(MinQm)} onChange={this.handleChange} />
                </td>
                <td>
                    <Input type="text"
                        disabled={!isFirstTierSetting || !selectedGroup.IsCheckedMinFTDCount}
                        className={isMinFTDCountValid ? '' : 'has-error'}
                        name="MinFTDCount"
                        id={"MinFTDCount" + TierId}
                        value={format(MinFTDCount)}
                        onChange={this.handleChangeValueWithCheckbox} />
                </td>
                <td>
                    <Input type="text"
                        disabled={!isFirstTierSetting || !selectedGroup.IsCheckedMinTotalDeposit}
                        className={isMinTotalDepositValid ? '' : 'has-error'}
                        name="MinTotalDeposit"
                        id={"MinTotalDeposit" + TierId}
                        value={format(MinTotalDeposit)}
                        onChange={this.handleChangeValueWithCheckbox} />
                </td>
                <td>
                    <select className="form-control" name="Commission"
                        onChange={this.handleChange} value={format(Commission || 0, 3)}>
                        {
                            Object.keys(commissionValueList).map((key, i) => {
                                return (<option key={`comm-${i}`} value={key}>{commissionValueList[key]}</option>);
                            })
                        }
                    </select>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-tier" onClick={handleClick}>{btnText}</button>
                </td>
            </tr>
        )
    }
}
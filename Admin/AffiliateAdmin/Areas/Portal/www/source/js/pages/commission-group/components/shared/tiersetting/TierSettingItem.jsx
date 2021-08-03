import React from 'react';

import { Form, FormGroup, Label, Input } from 'reactstrap';
import { INFINITY_SYMBOL, INFINITY_AM, INFINITY_QM, commissionValueList, format } from '../../../modules/constant';

export default class TierSettingItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        const target = event.target;
        const value = Number(target.value.replace(/,/g, ''));
        const name = target.name;

        const { data, onChange } = this.props;

        const newItem = { [name]: value || 0 };

        onChange && onChange(data.TierId, newItem);
    }

    handleCheck = (event) => {
        const isChecked = event.target.checked;
        const isMaxAp = event.target.name === 'MaxAp';

        const { data, onChange } = this.props;

        const newState = isChecked ?
            Object.assign({}, data, isMaxAp ? { MaxAp: INFINITY_QM } : { MaxAmount: INFINITY_AM, MaxAp: INFINITY_QM }) :
            Object.assign({}, data, isMaxAp ? { MaxAp: data.MinAp } : { MaxAmount: data.MinAmount, MaxAp: data.MinAp });

        onChange && onChange(data.TierId, newState);
    }

    render() {
        const { data, onRemove, isDisabledInfinity } = this.props;
        const { TierId, MinAmount, MaxAmount, MinAp, MaxAp, Commission } = data;
        const isDisabledMaxAmount = MaxAmount === INFINITY_AM;
        const isDisabledMaxAp = MaxAp === INFINITY_QM;

        return (
            <tr>
                <td className="text-center">{TierId}</td>
                <td>
                    <Input type="text" name="MinAmount" id={"MinAmount" + TierId}
                        value={format(MinAmount)} onChange={this.handleChange} />
                </td>
                <td>
                    <Form inline>
                        <Input type="text" name="MaxAmount" id={"MaxAmount" + TierId} className="form-max" disabled={isDisabledMaxAmount}
                            value={isDisabledMaxAmount ? INFINITY_SYMBOL : format(MaxAmount)} onChange={this.handleChange} />
                        <FormGroup check className="ml-sm-1">
                            <Label check>
                                <Input type="checkbox" checked={isDisabledMaxAmount} name="MaxAmount" id={"MinAmountCheckbox" + TierId}
                                    onChange={this.handleCheck} disabled={isDisabledInfinity} />{INFINITY_SYMBOL}
                            </Label>
                        </FormGroup>
                    </Form>
                </td>
                <td>
                    <Input type="text" name="MinAp" id={"MinAp" + TierId} value={format(MinAp)} onChange={this.handleChange} />
                </td>
                <td>
                    <Form inline>
                        <Input type="text" name="MaxAp" id={"MaxAp" + TierId} className="form-max" disabled={isDisabledMaxAp}
                            value={isDisabledMaxAp ? INFINITY_SYMBOL : format(MaxAp)} onChange={this.handleChange} />
                        <FormGroup check className="ml-sm-1">
                            <Label check>
                                <Input type="checkbox" checked={isDisabledMaxAp} name="MaxAp" id={"MaxApCheckbox" + TierId}
                                    onChange={this.handleCheck} />{INFINITY_SYMBOL}
                            </Label>
                        </FormGroup>
                    </Form>
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
                    <button className="btn btn-link" onClick={onRemove}><span className="oi oi-x text-danger"></span></button>
                </td>
            </tr>
        )
    }
}
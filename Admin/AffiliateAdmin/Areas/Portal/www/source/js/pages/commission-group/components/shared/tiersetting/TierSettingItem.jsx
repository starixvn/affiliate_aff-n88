import React from 'react';

import { Form, FormGroup, Label, Input } from 'reactstrap';
import { INFINITY_SYMBOL, INFINITY_AM, INFINITY_QM, commissionValueList } from '../../../modules/constant';
import { formatDecimal, format } from '../../../../../modules/numberFormat';

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
        const isMaxQm = event.target.name === 'MaxQm';

        const { data, onChange } = this.props;

        const newState = isChecked ?
            Object.assign({}, data, isMaxQm ? { MaxQm: INFINITY_QM } : { MaxAmount: INFINITY_AM, MaxQm: INFINITY_QM }) :
            Object.assign({}, data, isMaxQm ? { MaxQm: data.MinQm } : { MaxAmount: data.MinAmount, MaxQm: data.MinQm });

        onChange && onChange(data.TierId, newState);
    }

    render() {
        const { data, onRemove, isDisabledInfinity } = this.props;
        const { TierId, MinAmount, MaxAmount, MinQm, MaxQm, Commission } = data;
        const isDisabledMaxAmount = MaxAmount === INFINITY_AM;
        const isDisabledMaxQm = MaxQm === INFINITY_QM;

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
                    <Input type="text" name="MinQm" id={"MinQm" + TierId} value={format(MinQm)} onChange={this.handleChange} />
                </td>
                <td>
                    <Form inline>
                        <Input type="text" name="MaxQm" id={"MaxQm" + TierId} className="form-max" disabled={isDisabledMaxQm}
                            value={isDisabledMaxQm ? INFINITY_SYMBOL : format(MaxQm)} onChange={this.handleChange} />
                        <FormGroup check className="ml-sm-1">
                            <Label check>
                                <Input type="checkbox" checked={isDisabledMaxQm} name="MaxQm" id={"MaxQmCheckbox" + TierId}
                                    onChange={this.handleCheck} />{INFINITY_SYMBOL}
                            </Label>
                        </FormGroup>
                    </Form>
                </td>
                <td>
                    <select className="form-control" name="Commission"
                        onChange={this.handleChange} value={formatDecimal(Commission)}>
                        {
                            commissionValueList.map((item, i) => {
                                return (<option key={`comm-${TierId}-${i}`} value={item}>{item}</option>);
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
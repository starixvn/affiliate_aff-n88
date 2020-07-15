import React, { Fragment } from 'react';

import { Col, FormGroup, Label, Input, Form } from 'reactstrap';
import { formatDecimal, format } from '../../../../../modules/numberFormat';
import { commissionValueList, regExp } from '../../../modules/constant';
import { isValidNumber } from '../../../../../modules/utils';
import { money } from '../../../../../modules/constants';

const regexCheckAmount = new RegExp(regExp.checkAmount);
const regexValidAmount = new RegExp(regExp.validAmount);
const regexShouldFormatAmount = new RegExp(regExp.shouldFormatAmount);

export default class FeeSettingItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.props.handleChange({ [name]: Number(value) });
    }

    handleChangeAmount = (event) => {
        if (this.props.isInitial) {
            this.props.handleUpdateState();
        }

        const { name, value } = event.target;

        const amount = value.replace(/,/g, '');
        if (regexCheckAmount.test(amount) && Number(amount) > money.MinValue && Number(amount) < money.MaxValue) {
            if (regexShouldFormatAmount.test(amount)) {
                this.props.handleChange({ [name]: format(Number(amount)) })
            } else {
                this.props.handleChange({ [name]: value });
            }
        }
    }

    handleCheck = (value) => {
        this.props.handleChange({ IsDeductedPercent: value });
    }

    render() {
        const { label, data, basedValueName, isInitial } = this.props;
        const isDeductedPercent = data && data.IsDeductedPercent;
        var deductionAmount = isInitial && data && regexValidAmount.test(data.DeductedAmount) && formatDecimal(Number(data.DeductedAmount));

        return (
            <FormGroup row className="align-items-center">
                <Label sm={2} className="font-weight-bold">{label}</Label>
                {
                    isDeductedPercent ? (
                        <Fragment>
                            <Col sm={4} className="select-comm">
                                <Form inline className="deducted-percent-group">
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label className="mr-sm-2">New Revenue Share </Label>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Input type="select" name="DeductedPercentage" className="form-control"
                                            defaultValue={formatDecimal((data && data.DeductedPercentage) || 0)}
                                            onChange={this.handleChange} style={{ width: 60 }}>
                                            {
                                                commissionValueList.map((item, i) => {
                                                    return (<option key={`operational-fee-comm-${i}`} value={item}>{item}</option>);
                                                })
                                            }
                                        </Input>
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col sm={3}>
                                <Input plaintext tag="p">{basedValueName}</Input>
                            </Col>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Col sm={{ size: 4, offset: 1 }}>
                                <Form inline>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label className="mr-sm-2">Amount </Label>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Input type="text" name="DeductedAmount" className="form-control"
                                                value={deductionAmount || (data && data.DeductedAmount) || ''}
                                                onChange={this.handleChangeAmount} style={{ width: 120 }} />
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col sm={2}>
                                <p class="text-danger required deducted-amount">*</p>
                            </Col>
                        </Fragment>
                    )
                }
                <Col sm={3}>
                    <Form inline>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" checked={!isDeductedPercent} name="IsDeductionPercent"
                                    onChange={() => this.handleCheck(!isDeductedPercent)} /> Fixed Amount
                            </Label>
                        </FormGroup>
                    </Form>
                </Col>
            </FormGroup>
        )
    }
}
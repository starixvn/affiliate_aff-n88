import React, { Fragment } from 'react';

import { Col, FormGroup, Label, Input, Form } from 'reactstrap';
import { formatDecimal, format } from '../../../../../modules/numberFormat';
import { commissionValueList } from '../../../modules/constant';
import { isValidNumber } from '../../../../../modules/utils';
import { money } from '../../../../../modules/constants';

export default class FeeSettingItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.props.handleChange({ [name]: Number(value) });
    }

    handleChangeAmount = (event) => {
        const { name, value } = event.target;

        const textValue = value.replace(/,/g, '');
        const numberValue = Number(textValue);
        const isValid = isValidNumber(numberValue);

        if (isValid && numberValue <= money.MaxValue) {
            this.props.handleChange({ [name]: numberValue });
        }
    }



    render() {
        const { label, data, basedValueName, isSelectedRate, fixedAmount } = this.props;

        return (
            <FormGroup row>
                <Label sm={4} className="font-weight-bold">{label}</Label>
                {
                    isSelectedRate ? (
                        <Fragment>
                            <Col sm={5} className="select-comm">
                                <Form inline>
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
                        <Col sm={8}>
                            <Form inline>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label className="mr-sm-2">Amount </Label>
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Input type="text" name="DeductedPercentage" className="form-control"
                                            defaultValue={format(fixedAmount || 0)}
                                            onChange={this.handleChangeAmount} style={{ width: 120 }} />
                                </FormGroup>
                            </Form>
                        </Col>
                    )
                }
            </FormGroup>
        )
    }
}